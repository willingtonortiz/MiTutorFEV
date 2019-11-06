<template>
	<div class="student-side-bar-container">
		<!-- TODO Realizar el link hacia la vista de suscripciones -->

		<router-link class="button" to="/suscription">Quiero ser tutor</router-link>

	</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class StudentSideBarComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
	.student-side-bar-container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.button {
			padding: 12px 20px;
			background-color: #4e83ed;
			color: white;
			border-radius: 5px;
			border: none;
			font-size: 18px;
			font-weight: normal;
			cursor: pointer;
		}
	}

</style>