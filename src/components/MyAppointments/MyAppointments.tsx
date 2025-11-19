import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import "./MyAppointments.css";
import type { Appointment } from "../../interfaces/Appointment";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/appointments/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return (
    <>
      <div className="appointments-page">
        <h1 className="appointments-title">My Appointments</h1>

        {loading ? (
          <p className="loading">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="empty">You have no appointments yet.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((appt) => ( 
              <div key={appt.appointmentId} className="appointment-card">
                <div className="appointment-header">
                  <p>{appt.date}</p>
                </div>

                <div className="appointment-body">
                  <p><strong>Time:</strong> {appt.startTime} - {appt.endTime}</p>
                  <p><strong>Professional:</strong> {appt.professionalName}</p>
                  <p><strong>User:</strong> {appt.userName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
