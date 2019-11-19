import axios from "axios";
import { ReserveTutoringResponse } from "@/dtos/output/ReserveTutoringResponse";
import { uri } from "./environment";
import AuthenticationService from './AuthenticationService';

export const reserve = async (  idStudent,  idTutoringSession): Promise<any> => {
  let response = {
    studentId: idStudent,
    TutoringSessionId: idTutoringSession
  };
  return await axios({
    headers: { "Content-Type": "application/json" },
    method: "POST",
    url: `${uri}/TutoringSessionStudents`,
    data: response
  });
};


export const getAllTutoringSessionByUser = async():Promise<any> =>{
  
  let response =  await axios.get(`https://localhost:5001/api/TutoringSessionStudents/user/${AuthenticationService.userValue.id}`);

  return response.data;



}
