import { Course } from "@/Models/Course";
import { CourseService } from "@/Services/CourseService";
import { TutoringOfferInfo } from "@/dtos/output/TutoringOfferInfo";
import { TutoringOfferService } from "@/Services/TutoringOfferService";
import { TutorInfo } from "@/dtos/input/TutorInfo";
import { TutorsService } from "@/Services/TutorsService";
import { University } from "@/Models/University";
import { UniversityService } from "../UniversityService";
import { UserCredentials } from "@/dtos/UserCredentials";
import AuthenticationService from "../AuthenticationService";

export default class SearchTutoringOffersAndTutorsService {
	public constructor() {}

	public static async findTutoringOffersByCourseName(
		courseName: string
	): Promise<Array<TutoringOfferInfo>> {
		try {
			const currentUserId: number = AuthenticationService.userValue.id;

			const university: University = await UniversityService.findUniversityByUserId(
				currentUserId
			);

			const course: Course = await CourseService.findByUniversityIdAndCourseName(
				university.id,
				courseName.toLowerCase()
			);

			const tutoringOffers: Array<
				TutoringOfferInfo
			> = await TutoringOfferService.findByUniversityIdAndCourseId(
				university.id,
				course.id
			);

			tutoringOffers.forEach(x => {
				x.startTime = new Date(x.startTime);
				x.endTime = new Date(x.endTime);
			});

			return Promise.resolve(tutoringOffers);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static async findTutorsByCourseName(
		courseName: string
	): Promise<Array<TutorInfo>> {
		try {
			const currentUserId: number = AuthenticationService.userValue.id;

			const university: University = await UniversityService.findUniversityByUserId(
				currentUserId
			);

			const course: Course = await CourseService.findByUniversityIdAndCourseName(
				university.id,
				courseName.toLowerCase()
			);

			const tutors: Array<
				TutorInfo
			> = await TutorsService.findAllByUniversityIdAndCourseId(
				university.id,
				course.id
			);

			return Promise.resolve(tutors);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
