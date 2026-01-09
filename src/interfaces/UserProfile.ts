import type { Review } from "./Review";

/**
 * Represents a regular user's profile information
 * Contains authentication, account status, and review history
 */
export interface UserProfile{
    /** Unique identifier for the user */
    id: number;
    /** Display username chosen by the user */
    username: string;
    /** Email address associated with the account */
    email: string;
    /** User's role in the system (e.g., "USER", "PROFESSIONAL", "ADMIN") */
    role: string;
    /** Whether the account is active and enabled */
    enabled: boolean;
    /** Authentication provider used (e.g., "LOCAL", "GOOGLE", "GITHUB") */
    authProvider: string;
    /** Array of reviews this user has written about professionals */
    reviewsGiven: Review[];
}