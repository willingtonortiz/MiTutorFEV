interface University {
	id: number;
	name: string;
}

export interface UserRegister {
	name: string;
	lastname: string;
	career: string;
	email: string;
	university: number;
	universities: University[];
	semester: number;
	username: string;
	password: string;
	isEmailExist: boolean;
	isUsernameExist: boolean;
}
