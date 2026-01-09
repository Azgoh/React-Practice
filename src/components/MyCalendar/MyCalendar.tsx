import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/Config";
import {
  type Availability,
  type AvailabilityEvent,
  type AvailabilityRequest,
  type ExistingAvailabilityRequest,
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
import toast from "react-hot-toast";

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
    } else {
      setEvents([]);
    }
  }, [professionalAvailability]);

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
      if (eventData.id) {
        const existingAvailabilityRequest: ExistingAvailabilityRequest = {
          id: eventData.id,
          title: eventData.title,
          date: moment(eventData.start).format("D MMMM YYYY"),
          startTime: moment(eventData.start).format("HH:mm:ss"),
          endTime: moment(eventData.end).format("HH:mm:ss"),
        };
        await axios.put(
          `${API_BASE_URL}/availability/professional/edit`,
          existingAvailabilityRequest,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setEvents((prevEvents) => {
          return prevEvents.map((ev) =>
            ev.id === eventData.id ? eventData : ev
          );
        });
      } else {
        const availabilityRequest: AvailabilityRequest = {
          title: eventData.title,
          date: moment(eventData.start).format("D MMMM YYYY"),
          startTime: moment(eventData.start).format("HH:mm:ss"),
          endTime: moment(eventData.end).format("HH:mm:ss"),
        };
        const response = await axios.post(
          `${API_BASE_URL}/availability/professional/me/save`,
          availabilityRequest,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const savedEvent: AvailabilityEvent = {
          id: response.data.id,
          title: response.data.title,
          start: moment(
            `${response.data.date} ${response.data.startTime}`,
            "D MMMM YYYY HH:mm:ss"
          ).toDate(),
          end: moment(
            `${response.data.date} ${response.data.endTime}`,
            "D MMMM YYYY HH:mm:ss"
          ).toDate(),
        };
        setEvents((prevEvents) => [...prevEvents, savedEvent]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsOpenEvent(false);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const jwt = sessionStorage.getItem("jwt");
      await axios.delete(
        `${API_BASE_URL}/availability/professional/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      toast.success("Successful deletion", { position: "bottom-center" });
      setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== id));
      setIsOpenEvent(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete availability", {
        position: "bottom-center",
      });
    }
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
        />
      </div>
      {isOpenEvent && (
        <CalendarEventPopUp
          onClose={() => setIsOpenEvent(false)}
          slot={selectedSlot}
          onSave={handleSave}
          event={selectedEvent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
