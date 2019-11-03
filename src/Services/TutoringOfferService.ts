import axios, { AxiosResponse } from "axios";
import { uri } from "./environment";
import { TutoringOfferInfo } from "@/dtos/output/TutoringOfferInfo";
import { TutoringOfferRequest } from '@/Interfaces/TutoringOfferRequest';
import { Course } from '@/Interfaces/Course';
import { Topic } from '@/Interfaces/Topic';
import { TutorService } from "../Services/TutorService";
import { UniversityResponse } from '@/Interfaces/UniversityResponse';

export class TutoringOfferService {
	constructor() {}

	public async findByUniversityIdAndCourseId(
		universityId: number,
		courseId: number
	): Promise<Array<TutoringOfferInfo>> {
		try {
			const response: AxiosResponse<
				Array<TutoringOfferInfo>
			> = await axios.get<Array<TutoringOfferInfo>>(
				`${uri}/universities/${universityId}/courses/${courseId}/tutoringOffers`
			);

			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async createTutoringOffer( tutoringOffer : TutoringOfferRequest): Promise<TutoringOfferRequest>  {

		let tutorServ: TutorService = new TutorService();
		let university: UniversityResponse = await tutorServ.findUniversity(tutoringOffer.TutorId);
		tutoringOffer.UniversityId = university.universityId;

		try {
		
			let config ={ headers: {"Content-Type": "application/json"},};
			const response: AxiosResponse<TutoringOfferRequest> = 
				await axios.post<TutoringOfferRequest>(`${uri}/TutoringOffers`,tutoringOffer,config);
			return Promise.resolve(response.data);	
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async findAllCourses(): Promise<Array<Course>> {
		try {
			const response: AxiosResponse<Array<Course>> = await axios.get<Array<Course>>(
				`${uri}/courses`
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async findTopicsByCourse(courseId : number): Promise<Array<Topic>> {
		try {
			const response: AxiosResponse<Array<Topic>> = await axios.get<Array<Topic>>(
				`${uri}/courses/${courseId}/topics`
			);
			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}

	}





}
