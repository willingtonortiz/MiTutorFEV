import axios from "axios";
import { uri } from "./environment";
import { Person } from "@/Interfaces/Person";
import { User } from "@/Interfaces/User";
import {  SubscriptionDTO } from "../Interfaces/SubscriptionDTO";


export const RegisterUser = async (
	newuser : User & Person
): Promise<any> => {

	console.log(newuser);

	return await axios({
		headers: { "Content-Type": "application/json" },
		method: "POST",
		url: `${uri}/Authentication/register`,
		data: newuser
	})
		.then(async (data: any) => {console.log(data)})
		.catch((e: any) => { console.log(e); });
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

export const subscription =  async (subscriptionDTO: SubscriptionDTO): Promise<any> =>{
	return await axios({
		headers: {"Content-Type": "application/json"},
		method:"POST",
		url: `${uri}/Users/Subscription`,
		data:subscriptionDTO
	})
	.then ( (data)=>{console.log(data)})
	.catch( (e)=>{console.log(e)})
}

