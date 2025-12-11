import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Phone, MapPin, Star } from "lucide-react";
import type { Professional } from "../../interfaces/Professional";
import "./ProfessionalCard.css";

interface ProfessionalCardProps extends Professional {
  onClick?: () => void;
  "data-test"?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  firstName,
  lastName,
  profession,
  location,
  description,
  phone,
  hourlyRate,
  reviewsReceived,
  onClick,
  "data-test": dataTest
}) => {
  const averageRating =
    reviewsReceived.length > 0
      ? reviewsReceived.reduce((sum, r) => sum + r.score, 0) /
        reviewsReceived.length
      : 0;

  return (
    <Card className="professional-card" onClick={onClick} data-test={dataTest}>
      <CardContent className="card-content">
        <div className="avatar">{firstName.charAt(0) + lastName.charAt(0)}</div>
        <div className="header">
          <h2 className="name">{`${firstName} ${lastName}`}</h2>
          <p className="profession">{profession}</p>
        </div>
        <p className="description">{description}</p>
        <div className="info">
          <span>
            <Phone size={16} /> {phone}
          </span>
          <span>
            <MapPin size={16} /> {location}
          </span>
        </div>
        <div className="rating">
          <Star size={16} className="star" /> {averageRating.toFixed(1)} (
          {reviewsReceived.length} reviews)
        </div>
        <p className="rate">Hourly Rate: {hourlyRate + "€"}</p>
      </CardContent>
    </Card>
  );
};
