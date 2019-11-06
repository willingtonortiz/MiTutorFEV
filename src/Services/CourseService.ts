import axios, {AxiosResponse} from "axios";
import {uri} from "./environment";
import {Course} from "@/Models/Course";

export class CourseService {
    constructor() {
    }

    public static async findByUniversityIdAndCourseName(
        universityId: number,
        courseName: string
    ): Promise<Course> {
        try {
            const response: AxiosResponse<Course> = await axios.get<Course>(
                `${uri}/universities/${universityId}/courses`,
                {
                    params: {
                        name: courseName
                    }
                }
            );

            return Promise.resolve(response.data[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
