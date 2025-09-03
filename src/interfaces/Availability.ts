export interface Availability{
    id: number;
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

export interface AvailabilityRequest {
  date: string;      
  startTime: string;  
  endTime: string;   
}

export interface AvailabilityBatchRequest {
  availabilities: AvailabilityRequest[];
}