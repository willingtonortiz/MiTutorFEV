<template>
	<div class="container-login-form">
		<header>
			<img src="../../assets/images/logo.png"/>
		</header>

		<div class="form-login">
			<div class="header-login">
				<h2>Login</h2>
				<div class="line"></div>
			</div>

			<form v-on:submit.prevent="login">
				<div class="field">
					<label>Usuario o correo</label>
					<input placeholder="Ingrese su usuario o correo" v-model="username"/>
				</div>

				<div class="field">
					<label>Contraseña</label>
					<input type="password" placeholder="Ingrese su contraseña" v-model="password"/>
				</div>

				<div class="field">
					<button type="submit">Ingresar</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AuthenticationService from "@/Services/AuthenticationService";
    import {UserCredentials} from "@/dtos/UserCredentials";

    @Component({})
    export default class LoginForm extends Vue {
        public username: string;
        public password: string;

        public constructor() {
            super();
            this.username = "";
            this.password = "";
        }

        public async login() {
            try {
                const user: UserCredentials = await AuthenticationService.login(this.username, this.password);

				console.log(user);
				this.$router.push("/");
            } catch (error) {
                console.log("ERROR EN LOGINFORM");
            }
        }
    }
</script>

<style lang="scss" scoped>
	.container-login-form {
		header {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
		}

		.form-login {
			margin-top: 120px;
			margin-left: 180px;

			h2 {
				color: $primary-color;
				font-size: 39px;
				margin-bottom: 0.15em;
				text-align: left;
			}

			.line {
				width: 100px;
				border-radius: 100px;
				height: 6px;
				background: $primary-color;
				opacity: 0.3;
			}

			form {
				margin-top: 3em;

				.field {
					display: flex;
					flex-direction: column;
					margin: 1.25em 0;

					label {
						font-size: 18px;
						font-weight: 600;
						color: $primary-text;
						opacity: 0.67;
						margin-bottom: 0.5em;
						text-align: left;
					}

					input {
						padding: 12px 24px;
						width: 360px;
						font-size: 18px;
						color: $primary-text;
						border-radius: 6px;
						border: 1px solid #bfbfbf;
					}

					input:focus {
						border: 1px solid $primary-color;
					}

					button {
						margin-top: 4em;
						width: 360px;
						border-radius: 5px;
						border: none;
						text-align: center;
						font-weight: 600;
						font-size: 20px;
						color: $white;
						background: linear-gradient(45deg, $gradient-left, $gradient-right);
						padding: 0.74em 0;
						cursor: pointer;
					}
				}
			}
		}
	}
	
@media (max-width:720px) {

	.form-login input{
		width: 300px !important;
	}
	
	.form-login{
		margin: 0 !important;
	}

	button{
		width: 300px !important;
	}
    

}

</style>