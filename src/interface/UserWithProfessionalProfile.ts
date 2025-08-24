import type { ProfessionalProfile } from "./ProfessionalProfile";
import type { UserProfile } from "./UserProfile";

export interface UserWithProfessionalProfile{
    userProfile: UserProfile;
    professionalProfile?: ProfessionalProfile;
}