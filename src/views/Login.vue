<template>
  <div class="login-container">
    <LoginForm class="p-50"></LoginForm>
    <RegisterForm class="p-50"></RegisterForm>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: row nowrap;
  background: #ffffff;

  .p-50 {
    width: 50%;
    padding: 3em;
  }
}

@media (max-width: 720px) {
	.login-container{
		display: flex;
		flex-direction: column;
	}
	.container-login-form{
		padding: 0 !important;
		width: 80% !important;
		margin: 0 auto;
	}

	.container-login-form .form-login form .field input[data-v-1797a707]{
		width: 300px !important;
	}
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "../components/Login/LoginForm.vue";
import RegisterForm from "../components/Login/RegisterForm.vue";

@Component({
  components: { RegisterForm, LoginForm }
})
export default class Login extends Vue {}
</script>
