/**
 * Standard API error response structure
 * Used to communicate errors back to the client with context about what went wrong
 */
export interface ErrorResponseDto{
    /** Human-readable error message describing the issue */
    message: string;
    /** HTTP status code (e.g., 400, 401, 404, 500) */
    status: number;
    /** Timestamp when the error occurred on the server */
    timestamp: Date;
}