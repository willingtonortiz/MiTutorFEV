<template>
	<div class="register-view-container">
		<img src="../../assets/images/RegisterArt1.svg"/>

		<h2>Estudiante Nuevo</h2>
		<p>
			Puedes registrarte de manera gratuita y disfrutar de muchos beneficios
		</p>

		<router-link to="/register">
			<button>Registrarme</button>
		</router-link>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class RegisterForm extends Vue {

    }
</script>

<style lang="scss" scoped>
	.register-view-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 3em;

		h2 {
			margin: 1em 0 0 0;
			font-size: 24px;
			color: $primary-text;
		}

		p {
			color: $primary-text;
			opacity: 0.87;
			font-size: 18px;
			width: 540px;
			text-align: center;
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
			background: $green;
			padding: 0.74em 0;
			cursor: pointer;
		}

	}
</style>