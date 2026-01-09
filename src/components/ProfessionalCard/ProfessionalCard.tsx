import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Phone, MapPin, Star } from "lucide-react";
import type { Professional } from "../../interfaces/Professional";
import "./ProfessionalCard.css";

/** Props for the ProfessionalCard component - extends Professional interface with event handlers */
interface ProfessionalCardProps extends Professional {
  /** Optional click handler for card interactions */
  onClick?: () => void;
  /** Optional test identifier for E2E testing */
  "data-test"?: string;
}

/**
 * ProfessionalCard Component
 * Displays a professional's profile information in a Material-UI card format.
 * Shows name, profession, description, contact info, ratings, and hourly rate.
 */
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
  // Calculate average rating from all reviews received, or 0 if no reviews
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
