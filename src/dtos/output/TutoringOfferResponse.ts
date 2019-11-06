import {TutoringSessionResponse} from "./TutoringSessionResponse"

export interface TutoringOfferResponse{
     TutoringOfferId?: number;
     Course?: string;
     Tutor?: string;
     Description?: string;
     University?: string;
     StartTime?: Date;
     EndTime?: Date;
     Capacity?: number;
     Topics?: Array<string>;
     Sessions?: Array<TutoringSessionResponse>;
}