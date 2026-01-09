import { useParams } from "react-router-dom";
import { ProfessionalCalendar } from "../../components/ProfessionalCalendar/ProfessionalCalendar";
import Header from "../../components/Header/Header";

/**
 * ProfessionalCalendarPage Component
 * Page displaying a professional's availability calendar.
 * Allows clients to view available time slots and book appointments.
 * Professional ID is extracted from URL route parameters.
 */
export default function ProfessionalCalendarPage() {
  // Extract professional ID from URL params (e.g., /calendar/:id)
  const { id } = useParams();
  
  return (
    <>
      {/* Display navigation header */}
      <Header />
      
      {/* Display professional's calendar and availability slots */}
      <ProfessionalCalendar professionalId={Number(id)}/>;
    </>
  );
}
