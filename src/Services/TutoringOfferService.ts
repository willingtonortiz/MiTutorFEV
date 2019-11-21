import axios, {AxiosResponse} from "axios";
import {uri} from "./environment";
import {TutoringOfferInfo} from "@/dtos/output/TutoringOfferInfo";
import {TutoringOfferRequest} from '@/Models/TutoringOfferRequest';
import {Course} from '@/Models/Course';
import {Topic} from '@/Models/Topic';
import {TutorService} from "../Services/TutorService";
import {UniversityResponse} from '@/Models/UniversityResponse';
import {TutoringOfferResponse} from '@/dtos/output/TutoringOfferResponse';
import { TutoringSessionResponse } from '@/dtos/output/TutoringSessionResponse';

export class TutoringOfferService {
    constructor() {
    }

    public static async findByUniversityIdAndCourseId(
        universityId: number,
        courseId: number
    ): Promise<Array<TutoringOfferInfo>> {
        try {
            const response: AxiosResponse<Array<TutoringOfferInfo>> = await axios.get<Array<TutoringOfferInfo>>(
                `${uri}/universities/${universityId}/courses/${courseId}/tutoringOffers`
            );

            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async findAllByTutorId(
        tutorId: number
    ): Promise<Array<TutoringOfferInfo>> {
        try {
            const response: AxiosResponse<Array<TutoringOfferInfo>> = await axios.get<Array<TutoringOfferInfo>>(
                `${uri}/tutors/${tutorId}/tutoringoffers`
            );

            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createTutoringOffer(tutoringOffer: TutoringOfferRequest): Promise<TutoringOfferRequest> {

        let tutorServ: TutorService = new TutorService();
        let university: UniversityResponse = await tutorServ.findUniversity(tutoringOffer.TutorId);
        tutoringOffer.UniversityId = university.id;

        try {

            let config = {headers: {"Content-Type": "application/json"},};
            const response: AxiosResponse<TutoringOfferRequest> =
                await axios.post<TutoringOfferRequest>(`${uri}/TutoringOffers`, tutoringOffer, config);
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAllCoursesByUniversity(universityId: number): Promise<Array<Course>> {
        try {
            const response: AxiosResponse<Array<Course>> = await axios.get<Array<Course>>(
                `${uri}/universities/${universityId}/courses`
            );
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findTopicsByCourse(courseId: number): Promise<Array<Topic>> {
        try {
            const response: AxiosResponse<Array<Topic>> = await axios.get<Array<Topic>>(
                `${uri}/courses/${courseId}/topics`
            );
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }

    }

    public async findById(tutoringId: TutoringOfferResponse): Promise<TutoringOfferResponse> {
        try {
            const response: AxiosResponse<TutoringOfferResponse> = await axios.get<TutoringOfferResponse>(
                `${uri}/tutoringOffers/${tutoringId}`
            );
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }

    }


    public async getSession(sessionId: number): Promise<TutoringSessionResponse>  {
        try {
            const response: AxiosResponse<TutoringSessionResponse> = await axios.get<TutoringSessionResponse>(
                `${uri}/tutoringSessions/${sessionId}`
            );
            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
        

    }
}
