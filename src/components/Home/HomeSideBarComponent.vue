<template>
	<div class="home-side-bar-component">
		<StudentSideBarComponent v-if="role === 'student'"></StudentSideBarComponent>

		<TutorSideBarComponent v-if="role === 'tutor'"></TutorSideBarComponent>
	</div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import TutorSideBarComponent from "./TutorSideBarComponent.vue";
    import StudentSideBarComponent from "./StudentSideBarComponent.vue";
    import AuthenticationService from "@/Services/AuthenticationService";
    import {UserCredentials} from "@/dtos/UserCredentials";

    @Component({
        components: {TutorSideBarComponent, StudentSideBarComponent}
    })
    export default class HomeSideBarComponent extends Vue {
        public role: string;

        public constructor() {
            super();
            // TODO: Validar que si el usuario no está logueado, se regrese a la vista login

            const user: UserCredentials = AuthenticationService.userValue;
            this.role = user.role;
            // this.role = "STUDENT";
        }
    }

</script>

<style lang="scss" scoped>
	.home-side-bar-component {
		width: 100%;
		height: 100%;

		border-radius: 5px;
	}

</style>