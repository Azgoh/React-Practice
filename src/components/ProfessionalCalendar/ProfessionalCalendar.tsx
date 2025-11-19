import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/Config";

interface ProfessionalCalendarProps {
  professionalId: number;
}

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

interface Professional {
  firstName: string;
  lastName: string;
  profession: string;
}

export const ProfessionalCalendar: React.FC<ProfessionalCalendarProps> = ({
  professionalId,
}) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [professional, setProfessional] = useState<Professional | null>(null);

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

  const fetchAvailability = async () => {
    try {
      console.log(professionalId);
      const res = await axios.get(
        `${API_BASE_URL}/availability/professional/${professionalId}`
      );

      const mappedEvents = res.data.map((slot: any) => ({
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
      }));

      setEvents(mappedEvents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfessional();
    fetchAvailability();
  }, [professionalId]);

  const handleSelectSlot = async (slotInfo: SlotInfo) => {
    if (slotInfo.start < new Date()) {
      toast.error("Cannot select past slots");
      return;
    }

    const confirm = window.confirm(
      `Book an appointment on ${moment(slotInfo.start).format("LLLL")}?`
    );

    if (!confirm) return;

    try {
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
      fetchAvailability();
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px" }}>
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
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["day", "week", "month"]}
        step={30}
        onSelectSlot={handleSelectSlot}
        style={{ height: "75vh" }}
      />
    </div>
  );
};
