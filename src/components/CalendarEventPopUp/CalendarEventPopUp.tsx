import React, { useEffect, useState } from "react";
import type { AvailabilityEvent } from "../../interfaces/Availability";
import type { SlotInfo } from "react-big-calendar";
import { Button } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface CalendarEventPopUpProps {
  onClose: () => void;
  onSave: (eventData: AvailabilityEvent) => void;
  onDelete: (id: number) => void;
  slot: SlotInfo | null;
  event: AvailabilityEvent | null;
}

export const CalendarEventPopUp: React.FC<CalendarEventPopUpProps> = ({
  onClose,
  onSave,
  onDelete,
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
      setTitle("Available Slot");
      setStart(formatLocalForInput(slot.start));
      setEnd(formatLocalForInput(slot.end));
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem"
          }}
        >
          <h2 style={{ margin: 0 }}>{event ? "Edit Event" : "Add Event"}</h2>{" "}
          <button
            onClick={onClose}
            style={{
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#5f6368",
              fontSize: "18px",
              padding: "4px",
              borderRadius: "50%",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#f1f3f4")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "transparent")
            }
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "90%",
              gap: "0.3rem",
              marginTop: "0.5rem"
            }}
          >
            {event?.id !== undefined && (
              <Button
                type="button"
                onClick={() => onDelete(event.id!)}
                sx={{
                  textTransform: "none",
                  color: "#5f6368",
                  "&:hover": {
                    backgroundColor: "#f1f3f4",
                  },
                }}
              >
                Delete
              </Button>
            )}
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1a73e8",
                color: "#fff",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "4px",
                padding: "6px 16px",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "#1669c1",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                },
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
