import axios, { AxiosResponse } from "axios";
import { uri } from "./environment";
import { Course } from "@/Interfaces/Course";

export class CourseService {
	constructor() {}

	public async findByUniversityIdAndCourseName(
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
