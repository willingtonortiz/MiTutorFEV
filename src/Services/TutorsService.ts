import axios, {AxiosResponse} from "axios";
import {uri} from "./environment";
import {TutorInfo} from "@/dtos/input/TutorInfo";

export class TutorsService {
    public constructor() {
    }

    public static async findAllByUniversityIdAndCourseId(
        universityId: number,
        courseId: number
    ): Promise<Array<TutorInfo>> {
        try {
            const response: AxiosResponse = await axios.get<Array<TutorInfo>>(
                `${uri}/universities/${universityId}/courses/${courseId}/tutors`
            );

            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}