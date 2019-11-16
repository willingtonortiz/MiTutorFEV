<template>
	<form class="add-course-modal-component-container" v-on:submit.prevent="addCourse">
		<div class="image"
			 v-bind:style="{backgroundColor: backgroundColor}">
			<p>{{ courseName | sliceFirstLetterAndUppercase }}</p>
		</div>

		<div class="title">
			<p>Nuevo curso</p>
		</div>

		<div class="message">
			<p>Demuestre a los estudiantes el curso que dominas</p>
		</div>

		<div class="add-course-data">
			<p>Nombre del curso</p>
			<input
					type="text"
					placeholder="Calculo 2, Programacion 1, Fisica 1, ..."
					v-model="courseName"
			/>

			<p class="error-message" v-if="errorType === 1">Error de aplicación</p>
			<p class="error-message" v-if="errorType === 2">Curso no encontrado</p>
			<p class="error-message" v-if="errorType === 3">Tutor no encontrado</p>
			<p class="error-message" v-if="errorType === 4">
				Ya tienes agregado el curso
			</p>
		</div>

		<div class="add-course-button">
			<button type="submit">Agregar curso</button>
		</div>
	</form>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import ColorService from "@/Services/ColorService";
    import {Course} from "@/Models/Course";
    import {CourseService} from "@/Services/CourseService";

    @Component({
        filters: {
            sliceFirstLetterAndUppercase: function (value: string) {
                if (!value) return "";

                let firstLetter = value.slice(0, 1);
                return firstLetter.toUpperCase();
            }
        }
    })
    export default class AddCourseModalComponent extends Vue {
        public courseName: string;
        public backgroundColor: string;
        public errorType: number;

        public constructor() {
            super();

            this.courseName = "";
            this.errorType = 0;
        }

        created() {
            this.backgroundColor = ColorService.generateRandomColorString();
        }

        public async addCourse() {

            if (this.courseName !== "") {
                try {
                    this.errorType = 0;
                    const foundCourse: Course = await CourseService.findByUniversityIdAndCourseName(
                        1,
                        this.courseName
                    );

                    const result = await CourseService.addCourseToTutorByTutorIdAndCourseId(
                        8,
                        foundCourse.id
                    );

                    await this.$store.dispatch("addCourse", foundCourse);
                    await this.$store.dispatch("setShouldDisplay", false);
                } catch (error) {
                    console.log(error);
                    if (error.data) {
                        if (error.data === "COURSE_NOT_FOUND") {
                            this.errorType = 2;
                        } else if (error.data === "TUTOR_NOT_FOUND") {
                            this.errorType = 3;
                        } else if (error.data === "COURSE_ALREADY_ADDED") {
                            this.errorType = 4;
                        }
                    } else {
                        this.errorType = 1;
                    }
                }
            }
        }

        // TODO: tal vez deba agregarse el courseName
    }
</script>

<style lang="scss" scoped>
	.add-course-modal-component-container {
		z-index: 101;
		width: 700px;
		height: 700px;
		// padding: 32px 0;
		// border: 1px solid red;
		border-radius: 10px;
		background-color: #fff;

		display: flex;
		flex-flow: column wrap;
		align-items: center;

		.image,
		.title,
		.message,
		.add-course-data,
		.add-course-button {
			margin: 20px 0;
		}

		.image {
			width: 100px;
			height: 100px;
			border: 7px;
			border-radius: 10px;

			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 40px;
		}

		.title {
			font-size: 30px;
			color: #58e4b9;
		}

		.message {
			font-size: 20px;
		}

		.add-course-data {
			display: flex;
			flex-flow: column wrap;

			p,
			input {
				font-size: 20px;
				margin: 8px 0;
			}

			p {
				font-weight: bold;
			}

			input {
				padding: 8px;
				width: 380px;
				border: none;
				border-bottom: 1px solid lightgray;
			}

			.error-message {
				color: red;
			}
		}

		.add-course-button {
			button {
				padding: 16px 20px;
				background-color: #58e4b9;
				color: #fff;
				font-size: 24px;
				border: none;
				border-radius: 7px;
			}
		}
	}

</style>