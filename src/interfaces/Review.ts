export interface Review{
  id: number;
  reviewerId: number;
  professionalId: number;
  professionalFirstName: string;
  professionalLastName: string;
  reviewerUsername: string;
  score: number;
  review: string;
  timestamp: string; 
}