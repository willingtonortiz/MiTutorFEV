import axios from "axios";
import { uri } from "./environment";
import { University } from "../Models/University";
export class UniversityService {
	constructor() {}

	public static async getUniversities() {
		let res = await axios.get(`${uri}/universities`);
		return res.data;
	}

	public static async findUniversityByUserId(
		userId: number
	): Promise<University> {
		try {
			const response = await axios.get<University>(
				`${uri}/users/${userId}/universities`
			);
			const university: University = response.data[0];

			return university;
		} catch (error) {
			console.log(
				"ERROR EN UNIVERSITY SERVICE => FIND UNIVERSITY BY USER ID"
			);
		}
	}
}
