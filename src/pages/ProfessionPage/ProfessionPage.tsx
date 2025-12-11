import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import { ProfessionalCard } from "../../components/ProfessionalCard/ProfessionalCard";
import type { Professional } from "../../interfaces/Professional";
import Header from "../../components/Header/Header";
import "./ProfessionPage.css";

export default function ProfessionPage() {
  const { professionName } = useParams<{ professionName: string }>();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const res = await axios.get<Professional[]>(
          `${API_BASE_URL}/professionals`
        );
        const filtered = res.data.filter(
          (p) => p.profession.toLowerCase() === professionName?.toLowerCase()
        );
        setProfessionals(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfessionals();
  }, [professionName]);

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        {professionName && (
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "Arial",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {professionName.charAt(0).toUpperCase() + professionName.slice(1)}s
          </h1>
        )}
        <div className="professionals-column">
          {professionals.map((pro, index) => (
            <ProfessionalCard
              key={pro.id}
              {...pro}
              onClick={() => navigate(`/professional/${pro.id}/calendar`)}
              data-test={`professional-card-${index}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
