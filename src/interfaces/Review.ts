/**
 * Represents a review left by a user for a professional
 * Contains rating, text feedback, and relevant party information
 */
export interface Review{
  /** Unique identifier for this review */
  id: number;
  /** ID of the user who left the review */
  reviewerId: number;
  /** ID of the professional being reviewed */
  professionalId: number;
  /** First name of the reviewed professional (denormalized for display) */
  professionalFirstName: string;
  /** Last name of the reviewed professional (denormalized for display) */
  professionalLastName: string;
  /** Username of the reviewer (for attribution) */
  reviewerUsername: string;
  /** Rating score (typically 1-5 stars) */
  score: number;
  /** Text content of the review */
  review: string;
  /** ISO timestamp when the review was submitted */
  timestamp: string; 
}