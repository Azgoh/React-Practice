import type { ProfessionalProfile } from "./ProfessionalProfile";
import type { UserProfile } from "./UserProfile";

/**
 * Represents a user who may also be a professional service provider
 * Combines user account info with optional professional details for dual-role users
 */
export interface UserWithProfessionalProfile{
    /** The user's account profile information (always present) */
    userProfile: UserProfile;
    /** The professional profile details, if the user is registered as a professional (optional) */
    professionalProfile?: ProfessionalProfile;
}