import {Course} from "@/Models/Course";
import {CourseService} from "@/Services/CourseService";
import {TutoringOfferInfo} from "@/dtos/output/TutoringOfferInfo";
import {TutoringOfferService} from "@/Services/TutoringOfferService";
import {TutorInfo} from "@/dtos/input/TutorInfo";
import {TutorsService} from "@/Services/TutorsService";

// TODO: Implementar el concepto de sesión
export default class SearchTutoringOffersAndTutorsService {

    public constructor() {

    }

    public static async findTutoringOffersByCourseName(
        courseName: string
    ): Promise<Array<TutoringOfferInfo>> {
        try {

            const course: Course = await CourseService.findByUniversityIdAndCourseName(
                3,
                courseName.toLowerCase()
            );

            const tutoringOffers: Array<TutoringOfferInfo> = await TutoringOfferService.findByUniversityIdAndCourseId(3, course.id)

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
            const course: Course = await CourseService.findByUniversityIdAndCourseName(
                3,
                courseName.toLowerCase()
            );

            const tutors: Array<TutorInfo> = await TutorsService.findAllByUniversityIdAndCourseId(3, course.id)

            return Promise.resolve(tutors);

        } catch (error) {
            return Promise.reject(error);
        }
    }
}