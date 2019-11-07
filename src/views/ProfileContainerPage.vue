<template>
	<div class="profile-container-page-container">
		<div class="container">
			<div class="nav-bar">
				a
			</div>

			<div class="my-profile">
				b
			</div>

			<div class="my-tutorings">
				c
			</div>

			<div class="my-courses">
				<CoursesContainer></CoursesContainer>
			</div>

			<div class="my-comments">
				e
			</div>
		</div>

		<ProfileModalContainer
				class="profile-modal-container"
				v-if="shouldDisplay"></ProfileModalContainer>
	</div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ProfileModalContainer from "@/components/Profile/ProfileModalContainer.vue";
    import CoursesContainer from "@/components/Profile/CoursesContainer.vue";

    @Component({
        components: {CoursesContainer, ProfileModalContainer},
		created(){
            this.$store.dispatch("fetchCourses");
		}
    })
    export default class ProfileContainerPage extends Vue {

        public constructor() {
            super();
        }

        public get shouldDisplay() {
            return this.$store.getters.shouldDisplay;
        }
    }
</script>

<style lang="scss" scoped>
	.profile-container-page-container {
		.container {
			height: 100vh;
			// padding: 32px;
			display: grid;
			// z-index: 1;

			grid-template-rows: 100px 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 16px;

			.nav-bar,
			.my-profile,
			.my-tutorings,
			.my-courses,
			.my-comments {
				border-radius: 5px;
				box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.1);
				// border: 1px solid red;
			}

			.nav-bar {
				grid-row: 1 / span 1;
				grid-column: 1 / span 3;
				// background-color: tomato;
			}

			.my-profile {
				grid-row: 2 / span 2;
				grid-column: 1 / span 1;
				// background-color: deepskyblue;
			}

			.my-tutorings {
				grid-row: 2 / span 1;
				grid-column: 2 / span 1;
				// background-color: mediumseagreen;
			}

			.my-courses {
				grid-row: 3 / span 1;
				grid-column: 2 / span 1;
				// background-color: dodgerblue;
			}

			.my-comments {
				grid-row: 2 / span 3;
				grid-column: 3 / span 1;
				// background-color: slateblue;
			}
		}

		.profile-modal-container {
			z-index: 100;
		}

	}
</style>