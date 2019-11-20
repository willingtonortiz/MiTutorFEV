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
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

export default Vue.extend({
	props: {
		course: Object
	},
	methods: {
		...mapActions("ProfileCourseList", {
			edit: "editCourse",
			delete: "deleteCourse"
		}),
		editCourse: function() {},
		deleteCourse: function() {
			this.delete(this.course);
		}
	}
});
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
