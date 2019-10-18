import axios from "axios";
import { uri } from "./environment";
import { Person } from "@/Interfaces/Person";
import { User } from "@/Interfaces/User";

export const RegisterUser = async (
	user: User,
	person: Person
): Promise<any> => {
	return await axios({
		headers: { "Content-Type": "application/json" },
		method: "POST",
		url: `${uri}/authentication/register`,
		data: {
			user,
			person
		}
	})
		.then(async (data: any) => {
			console.log("El registro se ha realizado correctamente");
			console.log(data);
		})
		.catch((e: any) => {
			console.log("Error en registrar al usuario");
			console.log(e);
		});
};

export const isUsername = async (username: any): Promise<any> => {
	const res = await axios({
		method: "GET",
		url: `${uri}/users/isUsernameExist?username=${username}`
	});

	return res.data;
};

export const isEmail = async (email: any): Promise<any> => {
	const res = await axios({
		method: "GET",
		url: `${uri}/users/isEmailExist?email=${email}`
	});

	return res.data;
};
