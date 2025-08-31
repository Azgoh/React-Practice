import type { Review } from "./Review";

export interface ProfessionalProfile{
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
