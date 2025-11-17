import type { Review } from "./Review";

export interface Professional{
    id: number;
    firstName: string;
    lastName: string;
    profession: string;
    location: string;
    description: string;
    phone: string;
    hourlyRate: string;
    reviewsReceived: Review[];
}