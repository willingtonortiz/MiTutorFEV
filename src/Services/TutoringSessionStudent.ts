import axios from "axios";
import { ReserveTutoringResponse } from "@/dtos/output/ReserveTutoringResponse";
import { uri } from "./environment";

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
