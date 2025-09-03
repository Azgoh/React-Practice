import React, { useEffect, useState } from "react";
import type { AvailabilityEvent } from "../../interfaces/Availability";
import type { SlotInfo } from "react-big-calendar";

interface CalendarEventPopUpProps {
  onClose: () => void;
  onSave: (eventData: AvailabilityEvent) => void;
  slot: SlotInfo | null;
  event: AvailabilityEvent | null;
}

export const CalendarEventPopUp: React.FC<CalendarEventPopUpProps> = ({
  onClose,
  onSave,
  slot,
  event,
}) => {
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const formatLocalForInput = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(formatLocalForInput(new Date(event.start)));
      setEnd(formatLocalForInput(new Date(event.end)));
    } else if (slot) {
      setStart(formatLocalForInput(slot.start));
      setEnd(formatLocalForInput(slot.end));
      setTitle("Available Slot");
    }
  }, [event, slot]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData: AvailabilityEvent = {
      title: title,
      start: new Date(start),
      end: new Date(end),
    };

    if (event?.id) {
      eventData.id = event.id;
    }

    onSave(eventData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2>{event ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              disabled
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>Start:</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label>End:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
            />
          </div>
          <button
            type="submit"
            style={{ marginRight: "10px", marginTop: "15px" }}
          >
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
