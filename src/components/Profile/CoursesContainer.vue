<template>
	<div class="courses-container-container">
		<div class="title">
			<p>Cursos</p>
		</div>

		<div class="courses">
			<CourseListComponent></CourseListComponent>
		</div>

		<div class="add-course">
			<button v-on:click="addCourse">Agregar curso</button>
		</div>
	</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import CourseListComponent from "@/components/Profile/CourseListComponent.vue";

    @Component({
        components: {CourseListComponent}
    })
    export default class CoursesContainer extends Vue {

        addCourse() {
            this.$store.dispatch("setShouldDisplay", true);
        }
    }
</script>

<style lang="scss" scoped>
	.courses-container-container {
		// border: 1px solid red;
		padding: 16px 32px;
		height: 100%;

		display: flex;
		flex-flow: column wrap;
		justify-content: space-around;

		.title {
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 8px;
		}

		.courses {
			align-self: stretch;
		}

		.add-course {
			align-self: center;

			button {
				font-size: 20px;
				padding: 16px;
				border: none;
				color: white;
				background-color: #58e4b9;
				border-radius: 7px;
				cursor: pointer;
			}
		}
	}

</style>
