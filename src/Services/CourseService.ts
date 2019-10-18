import axios from "axios";
import { uri } from "./environment";

export class CourseService {
	constructor() {}

	public findByName(universityId: number, courseName: string): Promise<any> {
		return axios({
			headers: { "Content-Type": "application/json" },
			method: "GET",
			url: `${uri}/universities/${universityId}/courses/${courseName}`
		});
	}
}
