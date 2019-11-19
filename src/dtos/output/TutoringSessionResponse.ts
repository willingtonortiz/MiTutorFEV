export interface TutoringSessionResponse{
    TutoringSessionId: number;
    Place: string;
    StartTime: Date;
    EndTime: Date;
    StudentCount: number;
    Description: string;
    Price: number;
    Topics: Array<string>;
    TutorId : number;
}