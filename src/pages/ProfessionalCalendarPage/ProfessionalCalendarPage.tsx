import { useParams } from "react-router-dom";
import { ProfessionalCalendar } from "../../components/ProfessionalCalendar/ProfessionalCalendar";
import Header from "../../components/Header/Header";

export default function ProfessionalCalendarPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <ProfessionalCalendar professionalId={Number(id)}/>;
    </>
  );
}
