<template>
	<div class="profile-modal-container-container">
		<div class="close-button" v-on:click="closeModal">
			X
		</div>

		<AddCourseModalComponent v-if="modalCode === 1"></AddCourseModalComponent>
	</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import AddCourseModalComponent from "@/components/Profile/AddCourseModalComponent.vue";

    @Component({
        components: {AddCourseModalComponent}
    })
    export default class ProfileModalContainer extends Vue {


        get modalCode() {
            return this.$store.getters.modalCode;
        }

        public closeModal() {
            this.$store.dispatch("setShouldDisplay", false);
        }
    }
</script>

<style lang="scss" scoped>
	.profile-modal-container-container {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba($color: #000000, $alpha: 0.5);

		display: flex;
		justify-content: center;
		align-items: center;

		.close-button {
			position: absolute;
			top: 50px;
			left: 50px;
			padding: 16px 20px;
			border-radius: 7px;

			background-color: #323232;
			font-size: 36px;
			color: #fff;
			cursor: pointer;
		}
	}

</style>
