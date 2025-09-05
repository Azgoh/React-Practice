export interface Availability{
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface AvailabilityRequest {
  title: string;
  date: string;      
  startTime: string;  
  endTime: string;   
}

export interface ExistingAvailabilityRequest{
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityEvent{
    id?: number;
    title: string;
    start: Date;
    end: Date;
}