import axios, { AxiosResponse } from "axios";
import { uri } from "./environment";
import { Course } from "@/Models/Course";
import { TutorCourse } from "@/dtos/TutorCourse";

export class CourseService {
	constructor() {}

	public static async findByUniversityIdAndCourseName(
		universityId: number,
		courseName: string
	): Promise<Course> {
		try {
			const response: AxiosResponse<Course> = await axios.get<Course>(
				`${uri}/universities/${universityId}/courses`,
				{
					params: {
						courseName
					}
				}
			);

			return Promise.resolve(response.data[0]);
		} catch (error) {
			return Promise.reject(error.response);
		}
	}

	public static async findAllByTutorId(
		tutorId: number
	): Promise<Array<Course>> {
		try {
			const response: AxiosResponse<Array<Course>> = await axios.get<
				Array<Course>
			>(`${uri}/tutors/${tutorId}/courses`);

			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static async addCourseToTutorByTutorIdAndCourseId(
		tutorId: number,
		courseId: number
	): Promise<TutorCourse> {
		try {
			const response: AxiosResponse<TutorCourse> = await axios.post<
				TutorCourse
			>(`${uri}/tutors/${tutorId}/courses`, {
				courseId
			});

			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error.response);
		}
	}

	public static async deleteCourseFromTutorByTutorIdAndCourseId(
		tutorId: number,
		courseId: number
	): Promise<any> {
		try {
			const response: AxiosResponse<any> = await axios.delete<any>(
				`${uri}/tutors/${tutorId}/courses/${courseId}`
			);

			return Promise.resolve();
		} catch (error) {
            console.log(error.response);
			return Promise.reject(error.response);
		}
	}
}
