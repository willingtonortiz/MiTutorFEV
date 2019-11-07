<template>
	<div class="course-list-component-container">

		<CourseItemComponent
				class="course-item-component"
				v-for="(item, index) in courses"
				v-bind:course="item"
				v-bind:key="index"></CourseItemComponent>
	</div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import CourseItemComponent from "@/components/Profile/CourseItemComponent.vue";

    @Component({
        components: {CourseItemComponent}
    })
    export default class CourseListComponent extends Vue {

        public get courses() {
            return this.$store.getters.courses;
        }
    }
</script>

<style lang="scss" scoped>
	.course-list-component-container {
		display: flex;
		flex-flow: column nowrap;
		height: 230px;
		overflow-y: scroll;

		.course-item-component {
			border: 1px solid lightgray;
			margin: 8px 0px;
			border-radius: 5px;
		}
	}

</style>
