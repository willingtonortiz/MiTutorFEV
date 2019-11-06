<template>
	<div class="tutor-side-bar-component">
		<TutorTutoringsComponent></TutorTutoringsComponent>
		<TutorAvailabilityComponent></TutorAvailabilityComponent>
	</div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import TutorTutoringsComponent from "@/components/Home/TutorTutoringsComponent.vue";
    import TutorAvailabilityComponent from "@/components/Home/TutorAvailabilityComponent.vue";

    @Component({
        components: {TutorAvailabilityComponent, TutorTutoringsComponent}
    })
    export default class TutorSideBarComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
	.tutor-side-bar-component {
		width: 100%;
		height: 100%;
		// border: 1px solid red;

		display: grid;
		grid-template-rows: 2fr 1fr;

		app-tutor-tutorings {
			grid-row: 1 / span 1;
		}

		app-tutor-availability {
			grid-row: 2 / span 1;
		}
	}

</style>