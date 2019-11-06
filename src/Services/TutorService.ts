import axios, { AxiosResponse } from "axios";
import { uri } from "./environment";
import { UniversityResponse } from '@/Interfaces/UniversityResponse';

export class TutorService {
    constructor() {}

    public async findUniversity(tutorId : number): Promise<UniversityResponse> {

		try {
			const response: AxiosResponse<UniversityResponse> = await axios.get<UniversityResponse>(
				`${uri}/tutors/${tutorId}/university`
            );

			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}

	}

    
}