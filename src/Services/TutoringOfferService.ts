import axios, {AxiosResponse} from "axios";
import {uri} from "./environment";
import {TutoringOfferInfo} from "@/dtos/output/TutoringOfferInfo";

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
    ): Promise<Array<TutoringOfferService>> {
        try {
            const response: AxiosResponse<Array<TutoringOfferService>> = await axios.get<Array<TutoringOfferService>>(
                `${uri}/tutors/${tutorId}/tutoringoffers`
            );

            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
