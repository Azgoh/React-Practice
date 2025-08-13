import type { Review } from "./Review";

export interface Professional{
  id: number;
  fullName: string;
  profession: string;
  location: string;
  description: string;
  phone: string;
  ratingsReceived: Review[];
}
