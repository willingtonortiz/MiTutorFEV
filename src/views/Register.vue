<template>
	<div class="register-container">
		<header>
			<div class="logo">
				<router-link to="/login">
					<img src="../assets/images/logo.png" />
				</router-link>
			</div>
		</header>

		<div class="register-body">
			<form @submitForm="checkForm" class="register-cont">
				<div class="title-register">
					<h2>Registro</h2>
				</div>

				<div class="field-group">
					<div class="field">
						<label>Nombres</label>
						<input
							required
							v-model="name"
							name="Name"
							placeholder="Ingrese sus nombres"
						/>
					</div>

					<div class="field">
						<label>Apellidos</label>
						<input
							required
							v-model="lastname"
							name="Lastname"
							placeholder="Ingrese sus apellidos"
						/>
					</div>
				</div>
				<div class="field-group">
					<div class="field">
						<label>Carrera</label>
						<input
							required
							v-model="career"
							name="Career"
							placeholder="Ingrese su carrera"
						/>
					</div>
					<div class="field">
						<label>Correo electrónico</label>
						<input
							required
							v-model="email"
							v-bind:class="{ 'not-valid': isEmailExist }"
							v-on:focusout="validateEmail"
							type="email"
							name="Email"
							placeholder="Ingrese sus email"
						/>
						<p
							v-if="isEmailExist"
							style="color:#ff4766; margin-top:0.5em; font-size:16px;"
						>
							Este correo ya existe, por favor ingrese uno
							diferente
						</p>
					</div>
				</div>
				<div class="field-group">
					<div class="field">
						<label>Usuario</label>
						<input
							required
							v-model="username"
							name="Username"
							placeholder="Ingrese su nombre de usuario"
							v-on:focusout="validateUsername"
							v-bind:class="{ 'not-valid': isUsernameExist }"
						/>
						<p
							v-if="isUsernameExist"
							style="color:#ff4766; margin-top:0.5em; font-size:16px;"
						>
							Este usuario ya existe, por favor ingrese uno
							diferente
						</p>
					</div>

					<div class="field">
						<label>Contraseña</label>
						<input
							required
							v-model="password"
							type="password"
							name="Password"
							placeholder="Ingrese su contraseña"
						/>
					</div>
				</div>
				<div class="field-group">
					<div class="field">
						<label>Universidad</label>
						<select required v-model="university" name="University">
							<option
								v-for="u in universities"
								:value="u.id"
								v-bind:key="u.id"
								>{{ u.name }}</option
							>
						</select>
					</div>

					<div class="field">
						<label>Semestre</label>
						<select required v-model="semester" name="Semester">
							<option value="1">Primer ciclo</option>
							<option value="2">Segundo ciclo</option>
							<option value="3">Tercer ciclo</option>
							<option value="4">Cuarto ciclo</option>
							<option value="5">Quinto ciclo</option>
							<option value="6">Sexto ciclo</option>
							<option value="7">Septimo ciclo</option>
							<option value="8">Octavo ciclo</option>
							<option value="9">Noveno ciclo</option>
							<option value="10">Décimo ciclo</option>
						</select>
					</div>
				</div>

				<div class="field">
					<button v-on:click="checkForm" type="button">
						Registrarme
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { UserRegister } from "../Models/UserRegister";
import { RegisterUser, isUsername, isEmail } from "../Services/UserService";

import { Person } from "../Models/Person";

import { UniversityService } from "../Services/UniversityService";
import { User } from "../Models/User";

export default Vue.extend({
	name: "Register",
	data(): UserRegister {
		return {
			name: "",
			lastname: "",
			career: "",
			email: "",
			university: 1,
			universities: [],
			semester: 1,
			username: "",
			password: "",
			isUsernameExist: false,
			isEmailExist: false
		};
	},
	async created() {
		this.universities = await UniversityService.getUniversities();
		console.log(this.universities);
	},

	methods: {
		async checkForm(): Promise<any> {
			// console.log({
			// 	name: this.name,
			// 	lastname: this.lastname,
			// 	career: this.career,
			// 	email: this.email,
			// 	university: this.university,
			// 	semester: this.semester,
			// 	username: this.username,
			// 	password: this.password,
			// 	usernameExist: !this.isUsernameExist,
			// 	emailExist: !this.isEmailExist
			// });
			if (
				this.name &&
				this.lastname &&
				this.career &&
				this.email &&
				this.university &&
				this.semester &&
				this.username &&
				this.password &&
				!this.isUsernameExist &&
				!this.isEmailExist
			) {
				type UserCreated = User & Person;

				let newUser: UserCreated = {
					username: this.username,
					password: this.password,
					email: this.email,
					name: this.name,
					lastName: this.lastname,
					semester: this.semester,
					universityId: this.university,
					career: this.career
				};

				console.log(newUser);
				await RegisterUser(newUser).then(() => {
					this.$router.push("/login");
				});
			}
		},
		async validateUsername(): Promise<any> {
			setTimeout(async () => {
				await isUsername(this.username).then((data: any) => {
					if (data) {
						this.isUsernameExist = true;
					} else {
						this.isUsernameExist = false;
					}
				});
			}, 200);
		},
		async validateEmail(): Promise<any> {
			setTimeout(async () => {
				await isEmail(this.email).then((data: any) => {
					if (data) {
						this.isEmailExist = true;
					} else {
						this.isEmailExist = false;
					}
				});
			}, 200);
		}
	}
});
</script>

<style lang="scss">
.not-valid {
	border: 1px solid #ff4766 !important;
}

.register-container {
	height: 100vh;
	overflow: auto;

	padding: 2.5em;
	background: url("../assets/images/RegisterBackground.png");
	background-size: cover;
	background-position: center center;
}

.register-container header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.register-container .field-login button {
	color: $white;
	background: $primary-color;
	text-align: center;
	padding: 12px 0;
	width: 200px;
	border-radius: 4px;
	font-weight: 600;
	border: none;
	cursor: pointer;
	font-size: 1.25em;
}
::-webkit-scrollbar {
	width: 10px;
	height: 20px;
}

/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px white;
	border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #cfcfcf;
	border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: $primary-color;
}
.register-body {
	width: 1000px;
	height: 600px;
	position: absolute;
	left: 40%;
	top: 5%;

	padding: 24px 24px 24px 24px;
}

.register-body .field-group {
	display: flex;
}
.register-container .register-body .field {
	display: flex;
	flex-direction: column;
	margin: 1.25em;
	text-align: left;
}

.register-container .register-body h2 {
	display: flex;
	justify-content: flex-start;
	margin-left: 0.75em;
}

.register-container .register-body .register-cont .field label {
	color: $primary-text;
	opacity: 0.67;
	font-weight: 600;
	text-align: left;
	margin-bottom: 0.5em;
}

.register-container .register-body .field input:focus {
	border: 1px solid $primary-color;
}

.register-container .register-body .field input {
	width: 250px;
	padding: 12px;
	border: 1px solid #bfbfbf;
	color: $primary-text;
	font-size: 18px;
	border-radius: 6px;
}

.register-container .register-body .field select {
	width: 360px;
	padding: 12px;
	border: 1px solid #bfbfbf;
	color: $primary-text;
	font-size: 18px;
	border-radius: 6px;
}

.register-container .register-body .field button {
	color: $white;
	background: $primary-color;
	text-align: center;
	padding: 12px 0;
	width: 200px;
	border-radius: 4px;
	font-weight: 600;
	border: none;
	cursor: pointer;
	font-size: 1.25em;
}

@media (max-width: 720px) {
	.register-container .register-body .field select {
		width: 300px;
	}
	.field-login {
		display: none;
	}

	.register-container header {
		padding: 0.5em 0 !important;
	}
}
</style>
