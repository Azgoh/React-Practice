// Interface representing an appointment between a user and a professional
export interface Appointment {
  appointmentId: number;        // Unique ID of the appointment
  date: string;                 // Appointment date (e.g., "2026-01-09")
  startTime: string;            // Start time of the appointment (e.g., "14:00")
  endTime: string;              // End time of the appointment (e.g., "14:30")
  message: string;              // Optional message or note associated with the appointment
  appointmentStatus: string;    // Status of the appointment (e.g., "PENDING", "CONFIRMED", "CANCELLED")
  professionalId: number;       // ID of the professional providing the service
  professionalName: string;     // Name of the professional
  userId: number;               // ID of the user who booked the appointment
  userName: string;             // Name of the user who booked the appointment
}
