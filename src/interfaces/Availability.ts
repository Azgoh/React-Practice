// Represents a professional's available time slot as returned by the backend
export interface Availability {
    id: number;         // Unique ID of the availability slot
    title: string;      // Title/description of the slot (e.g., "Available Slot")
    date: string;       // Date of the slot (e.g., "2026-01-09")
    startTime: string;  // Start time of the slot (e.g., "09:00:00")
    endTime: string;    // End time of the slot (e.g., "09:30:00")
}

// Used when creating a new availability slot via API request
export interface AvailabilityRequest {
    title: string;      // Title/description of the new slot
    date: string;       // Date of the new slot
    startTime: string;  // Start time of the new slot
    endTime: string;    // End time of the new slot
}

// Used when updating an existing availability slot via API request
export interface ExistingAvailabilityRequest {
    id: number;         // ID of the slot to update
    title: string;      // Updated title
    date: string;       // Updated date
    startTime: string;  // Updated start time
    endTime: string;    // Updated end time
}

// Represents an availability slot in the frontend calendar component
export interface AvailabilityEvent {
    id?: number;        // Optional ID, present if this corresponds to a saved slot
    title: string;      // Title/description for the calendar display
    start: Date;        // Start datetime (converted from date + startTime)
    end: Date;          // End datetime (converted from date + endTime)
}
