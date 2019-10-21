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
					// headers: { "Content-Type": "application/json" },
					params: {
						courseName
					}
				}
			);

			return Promise.resolve(response.data);
			// return new Promise<Course>((resolve, reject) => {
			// 	resolve(response.data);
			// });
		} catch (error) {
			// return new Promise<Course>((resolve, reject) => {
			// 	reject(error);
			// });

			return Promise.reject(error);
		}
	}
}
