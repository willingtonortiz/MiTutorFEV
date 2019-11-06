import axios from "axios";
import { uri } from "./environment";
import {  University} from "../Models/University";
export class UniversityService {
	
	constructor() {
	
	}

	async getUniversities(){
		let res =  await axios.get("https://localhost:5001/api/universities");
		return res.data;
	}
}

