import type { Review } from "./Review";

export interface UserProfile{
    id: number;
    username: string;
    email: string;
    role: string;
    enabled: boolean;
    authProvider: string;
    reviewsGiven: Review[];
}