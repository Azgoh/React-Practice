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
  // Set locale for date formatting
  moment.locale("en-gb");
  const localizer = momentLocalizer(moment);

  // Custom formats for the calendar
  const formats: Formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format("D MMM")} – ${moment(end).format("D MMM")}`,
  };

  // State to store professional's availability fetched from backend
  const [professionalAvailability, setProfessionalAvailability] = useState<
    Availability[] | null
  >([]);
  // State to store currently selected calendar slot (for new events)
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  // Boolean to control whether the popup is open
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  // State to store currently selected event (for editing existing events)
  const [selectedEvent, setSelectedEvent] = useState<AvailabilityEvent | null>(
    null
  );
  // Calendar events mapped from professionalAvailability
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);

  /**
   * Fetch professional's availability from backend
   */
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

  // Fetch availability once on component mount
  useEffect(() => {
    fetchAvailability();
  }, []);

  /**
   * Map fetched availability to calendar events
   * Runs whenever professionalAvailability changes
   */
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

  /**
   * Handle click on existing event to edit it
   */
  const handleSelectEvent = (event: AvailabilityEvent) => {
    setSelectedSlot(null);
    setSelectedEvent(event); // Edit existing event
    setIsOpenEvent(true);
  };

  /**
   * Handle selecting an empty slot to create a new event
   */
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (slotInfo.start < new Date()) {
      alert("You cannot select a past time slot");
      return;
    }

    setSelectedSlot(slotInfo);
    setSelectedEvent(null); // New event
    setIsOpenEvent(true);
  };

  /**
   * Save or update an availability event
   */
  const handleSave = async (eventData: AvailabilityEvent) => {
    try {
      const jwt = sessionStorage.getItem("jwt");

      if (eventData.id) {
        // Editing existing event
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
        // Update local calendar events
        setEvents((prevEvents) =>
          prevEvents.map((ev) => (ev.id === eventData.id ? eventData : ev))
        );
      } else {
        // Creating a new event
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
        // Add the newly created event to local state
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

    // Close popup after save
    setIsOpenEvent(false);
  };

  /**
   * Delete an availability event
   */
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
      // Remove event from local state
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
      {/* Calendar display */}
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
          onSelectSlot={handleSelectSlot}   // Create new event
          onSelectEvent={handleSelectEvent} // Edit existing event
        />
      </div>

      {/* Event popup for creating/editing availability */}
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
