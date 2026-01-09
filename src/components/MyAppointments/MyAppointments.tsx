import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import "./MyAppointments.css";
import type { Appointment } from "../../interfaces/Appointment";

export default function MyAppointments() {
  // Holds the list of appointments for the logged-in user
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Tracks loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Retrieve JWT token from session storage for authenticated requests
  const token = sessionStorage.getItem("jwt");

  /**
   * Fetch the user's appointments from the backend on component mount
   */
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/appointments/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Store fetched appointments in state
        setAppointments(res.data);
      } catch (err) {
        // Log error if request fails
        console.error("Failed to load appointments", err);
      } finally {
        // Stop loading indicator regardless of success or failure
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return (
    <>
      <div className="appointments-page">
        <h1 className="appointments-title">My Appointments</h1>

        {/* Show loading state while data is being fetched */}
        {loading ? (
          <p className="loading">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          /* Show message if no appointments exist */
          <p className="empty">You have no appointments yet.</p>
        ) : (
          /* Render list of appointment cards */
          <div className="appointments-list">
            {appointments.map((appt) => (
              <div key={appt.appointmentId} className="appointment-card">
                {/* Appointment date */}
                <div className="appointment-header">
                  <p>{appt.date}</p>
                </div>

                {/* Appointment details */}
                <div className="appointment-body">
                  <p>
                    <strong>Time:</strong> {appt.startTime} - {appt.endTime}
                  </p>
                  <p>
                    <strong>Professional:</strong> {appt.professionalName}
                  </p>
                  <p>
                    <strong>User:</strong> {appt.userName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
