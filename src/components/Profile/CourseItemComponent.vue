<template>
	<div class="course-item-component-container">
		<div class="group">
			<p>{{ course.name }}</p>
		</div>
		<div class="group">
			<button v-on:click="editCourse">E</button>
			<button v-on:click="deleteCourse">D</button>
		</div>
	</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        props: {
            course: Object
        }
    })
    export default class CourseItemComponent extends Vue {

        public editCourse() {
            console.log("Editar este curso")
        }

        public deleteCourse() {
            console.log("Eliminar este curso")
        }
    }
</script>

<style lang="scss" scoped>
	.course-item-component-container {
		padding: 8px 16px;

		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;

		.group {
			// border: 1px solid red;

			&:nth-child(2) {
				button {
					margin: 0 8px;
					padding: 2px;
				}
			}
		}
	}

</style>
