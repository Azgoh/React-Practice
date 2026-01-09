import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/Config";
import type { Availability } from "../../interfaces/Availability";

interface ProfessionalCalendarProps {
  professionalId: number; // ID of the professional whose calendar we are viewing
}

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  slotInfo: SlotInfo; // Original slot info for booking purposes
}

interface Professional {
  firstName: string;
  lastName: string;
  profession: string;
}

export const ProfessionalCalendar: React.FC<ProfessionalCalendarProps> = ({
  professionalId,
}) => {
  // Configure calendar to use moment.js for dates
  const localizer = momentLocalizer(moment);

  // Calendar events mapped from professional availability
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Professional info (name, profession) displayed above calendar
  const [professional, setProfessional] = useState<Professional | null>(null);

  /**
   * Fetch professional's info from backend
   */
  const fetchProfessional = async () => {
    try {
      const res = await axios.get<Professional>(
        `${API_BASE_URL}/professionals/${professionalId}`
      );
      setProfessional(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load professional info");
    }
  };

  /**
   * Fetch professional's available time slots and map them to calendar events
   */
  const fetchAvailability = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/availability/professional/${professionalId}`
      );

      const mappedEvents = res.data.map((slot: Availability) => ({
        id: slot.id,
        title: slot.title,
        start: moment(
          `${slot.date} ${slot.startTime}`,
          "D MMMM YYYY HH:mm:ss"
        ).toDate(),
        end: moment(
          `${slot.date} ${slot.endTime}`,
          "D MMMM YYYY HH:mm:ss"
        ).toDate(),
        slotInfo: {
          start: moment(`${slot.date} ${slot.startTime}`).toDate(),
          end: moment(`${slot.date} ${slot.endTime}`).toDate(),
        },
      }));

      setEvents(mappedEvents);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch professional info and availability whenever professionalId changes
  useEffect(() => {
    fetchProfessional();
    fetchAvailability();
  }, [professionalId]);

  /**
   * Handle selecting a calendar slot to book an appointment
   */
  const handleSelectSlot = async (slotInfo: SlotInfo) => {
    // Prevent booking in the past
    if (slotInfo.start < new Date()) {
      toast.error("Cannot select past slots");
      return;
    }

    // Confirm with user before booking
    const confirm = window.confirm(
      `Book an appointment on ${moment(slotInfo.start).format("LLLL")}?`
    );

    if (!confirm) return;

    try {
      // Send booking request to backend
      await axios.post(
        `${API_BASE_URL}/appointments/book`,
        {
          professionalId,
          date: moment(slotInfo.start).format("D MMMM YYYY"),
          startTime: moment(slotInfo.start).format("HH:mm"),
          endTime: moment(slotInfo.end).format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      );

      toast.success("Appointment booked successfully!");

      // Refresh availability to reflect the booked slot
      fetchAvailability();
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px" }}>
      {/* Display professional info above the calendar */}
      {professional && (
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "Arial",
            fontWeight: "600",
            color: "#333",
          }}
        >
          {professional.firstName} {professional.lastName}'s Availability -{" "}
          {professional.profession}
        </h1>
      )}

      {/* Calendar component */}
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["day", "week", "month"]}
        step={30}
        onSelectSlot={handleSelectSlot} // Handles slot selection for booking
        components={{
          // Custom event renderer to attach data-test for Cypress and click behavior
          event: ({ event }) => (
            <div
              data-test="calendar-slot"
              onClick={() => handleSelectSlot(event.slotInfo)}
            >
              {event.title}
            </div>
          ),
        }}
        style={{ height: "75vh" }}
      />
    </div>
  );
};
