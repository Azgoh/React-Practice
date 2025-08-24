import type { Review } from "./Review";

export interface Professional{
  id: number;
  fullName: string;
  profession: string;
  location: string;
  description: string;
  hourlyRate: string;
  phone: string;
  ratingsReceived: Review[];
}
