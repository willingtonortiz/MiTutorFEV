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
</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import LoginForm from "../components/Login/LoginForm.vue";
    import RegisterForm from "../components/Login/RegisterForm.vue";

    @Component({
        components: {RegisterForm, LoginForm}
    })
    export default class Login extends Vue {
    }
</script>
