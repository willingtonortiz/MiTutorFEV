import axios, {AxiosResponse} from "axios";
import {UserCredentials} from "@/dtos/UserCredentials";
import {uri} from "./environment"

export default class AuthenticationService {

    constructor() {
    }

    public static get userValue(): UserCredentials {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        return user;
    }

    public static async login(username: string, password: string): Promise<UserCredentials> {
        try {
            const response: AxiosResponse<UserCredentials> = await axios.post<UserCredentials>(`${uri}/authentication/login`, {
                username, password
            });

            const user: UserCredentials = response.data;

            if (user && user.token) {
                localStorage.setItem("currentUser", JSON.stringify(user));
            }

            return Promise.resolve(response.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static logout() {
        localStorage.removeItem("currentUser");
    }
}