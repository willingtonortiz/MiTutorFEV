export interface TutoringSessionRequest {
    Place: string,
    StartTime: Date,
    EndTime: Date,
    Description: string,
    Price: number,
    Topics: []
}