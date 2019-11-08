import axios from "axios";
import { uri } from "./environment";
import { QualificationResponse } from '@/dtos/output/QualificationResponse';

export const findCommentsByTutorId = async (idTutor):Promise<Array<QualificationResponse>> => {
  const res = await axios.get(`${uri}/Qualifications/tutors/${idTutor}`);
  return res.data;
};
