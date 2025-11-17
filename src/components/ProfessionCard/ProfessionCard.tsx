import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import "./ProfessionCard.css";
import { Link } from "react-router-dom";

export interface ProfessionCardProps {
  profession: string;
}

export const ProfessionCard: React.FC<ProfessionCardProps> = ({
  profession,
}) => {
  return (
    <Link to={`/profession/${encodeURIComponent(profession)}`} style={{ textDecoration: "none", color: "inherit" }}>
      <motion.div
        className="profession-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-wrapper">
          <Briefcase size={40} />
        </div>
        <h2 className="profession-name">{profession}</h2>
      </motion.div>
    </Link>
  );
};
