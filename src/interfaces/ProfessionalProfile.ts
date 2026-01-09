import type { Review } from "./Review";

/**
 * Represents a professional's detailed profile information
 * Used when displaying or managing a professional's account and public profile
 */
export interface ProfessionalProfile{
  /** Unique identifier for the professional */
  id: number;
  /** Professional's first name */
  firstName: string;
  /** Professional's last name */
  lastName: string;
  /** Type of profession (e.g., "Electrician", "Plumber") */
  profession: string;
  /** Geographic location where the professional operates */
  location: string;
  /** Bio or professional description */
  description: string;
  /** Contact phone number */
  phone: string;
  /** Hourly rate for services */
  hourlyRate: string;
  /** Array of reviews received from clients */
  reviewsReceived: Review[];
}
