import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/Config";
import {
  type Availability,
  type AvailabilityBatchRequest,
  type AvailabilityEvent,
  type AvailabilityRequest,
} from "../../interfaces/Availability";
import moment from "moment";
import {
  Calendar,
  momentLocalizer,
  type Formats,
  type SlotInfo,
} from "react-big-calendar";
import "./MyCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEventPopUp } from "../CalendarEventPopUp/CalendarEventPopUp";

export default function MyCalendar() {
  moment.locale("en-gb");
  const localizer = momentLocalizer(moment);

  const formats: Formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format("D MMM")} – ${moment(end).format("D MMM")}`,
  };

  const [professionalAvailability, setProfessionalAvailability] = useState<
    Availability[] | null
  >([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<AvailabilityEvent | null>(
    null
  );
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);

  const fetchAvailability = async (): Promise<void> => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      const response = await axios.get(
        `${API_BASE_URL}/availability/professional/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setProfessionalAvailability(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  useEffect(() => {
    if (professionalAvailability) {
      const mappedEvents = professionalAvailability.map((slot) => ({
        id: slot.id,
        title: "Available Slot",
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
    } else {
      setEvents([]);
    }
  }, [professionalAvailability]);

  function convertEventToBatch(
    event: AvailabilityEvent
  ): AvailabilityBatchRequest {
    const availability: AvailabilityRequest = {
      date: moment(event.start).format("D MMMM YYYY"),
      startTime: moment(event.start).format("HH:mm:ss"),
      endTime: moment(event.end).format("HH:mm:ss"),
    };

    return { availabilities: [availability] };
  }

  const handleSelectEvent = (event: AvailabilityEvent) => {
    setSelectedSlot(null);
    setSelectedEvent(event); // edit existing event
    setIsOpenEvent(true);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (slotInfo.start < new Date()) {
      alert("You cannot select a past time slot");
      return;
    }

    setSelectedSlot(slotInfo);
    setSelectedEvent(null); // new event
    setIsOpenEvent(true);
  };

  const handleSave = async (eventData: AvailabilityEvent) => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      const batchRequest = convertEventToBatch(eventData);
      if (eventData.id) {
        // TODO: Handle editted availability slot
      } else {
        await axios.post(
          `${API_BASE_URL}/availability/professional/me/save`,
          batchRequest,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }

    setEvents((prev) => {
      const existingIndex = prev.findIndex((ev) => ev.id === eventData.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = eventData;
        return updated;
      } else {
        return [...prev, eventData];
      }
    });

    setIsOpenEvent(false);
  };

  return (
    <>
      <div className="calendar-wrapper">
        <Calendar
          culture="en-GB"
          selectable
          views={["day", "week", "month"]}
          step={30}
          localizer={localizer}
          formats={formats}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          style={{ height: "75vh" }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          slotPropGetter={(date: Date) => {
            const now = new Date();
            if (date.getTime() < now.getTime()) {
              return {
                className: "",
              };
            }
            return {};
          }}
        />
      </div>
      {isOpenEvent && (
        <CalendarEventPopUp
          onClose={() => setIsOpenEvent(false)}
          slot={selectedSlot}
          onSave={handleSave}
          event={selectedEvent}
        />
      )}
    </>
  );
}
