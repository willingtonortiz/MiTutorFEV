interface University {
	id: number;
	name: string;
}

export interface UserRegister {
	Name: string;
	Lastname: string;
	Career: string;
	Email: string;
	University: number;
	Universities: University[];
	Semester: number;
	Username: string;
	Password: string;
	isEmailExist: boolean;
	isUsernameExist: boolean;
}
