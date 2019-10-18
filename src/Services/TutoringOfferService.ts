import axios from "axios";
import { uri } from "./environment";

export class TutoringOfferService {
	constructor() {}

	public findByUniversityAndCourse(
		universityId: number,
		courseId: number
	): Promise<any> {
		return axios({
			headers: { "Content-Type": "application/json" },
			method: "GET",
			url: `${uri}/universities/${universityId}/courses/${courseId}/tutoringOffers`
		});
	}
}
