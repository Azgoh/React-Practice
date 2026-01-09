import type { Review } from "./Review";

/**
 * Represents a service professional/provider in the system
 * Contains all relevant information about a professional's profile, availability, and ratings
 */
export interface Professional{
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