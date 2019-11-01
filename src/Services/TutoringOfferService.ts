import axios, { AxiosResponse } from "axios";
import { uri } from "./environment";
import { TutoringOfferInfo } from "@/dtos/output/TutoringOfferInfo";

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
}
