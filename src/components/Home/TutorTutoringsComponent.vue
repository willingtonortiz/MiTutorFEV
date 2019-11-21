<template>
	<div class="tutor-tutorings-component">
		<div class="no-tutorings" v-if="tutorTutorings.length === 0">
			<div class="information">
				<h1>No tienes tutorías</h1>
				<p>Publica tu primera tutoría</p>
			</div>

			<div class="new-tutoring">
				<button v-on:click="navigateToPublishNewTutoringOffer()">
					Nueva tutoría
				</button>
			</div>
		</div>

		<div class="tutoring-offers" v-if="tutorTutorings.length > 0">
			<div class="title">
				<img
					src="../../assets/images/Tutoringicon.png"
					width="48"
					height="48"
					alt=""
				/>
				<h1>Mis tutorias</h1>
			</div>
			<div class="new-tutoring">
				<button v-on:click="navigateToPublishNewTutoringOffer()">
					Nueva tutoría
				</button>
			</div>
			<div class="list">
				<div
					class="tutoring-offer"
					v-for="(item, index) in tutorTutorings"
					v-bind:key="index"
				>
					<div
						class="box"
						v-bind:style="{ backgroundColor: colors[index] }"
					>
						<p>{{ item.courseName | firstLetter }}</p>
					</div>
					<p class="name">
						{{ item.courseName | titlecase }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TutoringOfferInfo } from "@/dtos/output/TutoringOfferInfo";
import { UserCredentials } from "@/dtos/UserCredentials";
import AuthenticationService from "@/Services/AuthenticationService";
import { TutoringOfferService } from "@/Services/TutoringOfferService";
import ColorService from "@/Services/ColorService";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
	filters: {
		firstLetter: function(value: string): string {
			if (!value) return "";

			return value.charAt(0).toUpperCase();
		},
		titlecase: function(value: string): string {
			if (!value) return "";

			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
	data() {
		return {
			colors: []
		};
	},
	computed: {
		...mapGetters("HomeModule", ["tutorTutorings"])
	},
	async created() {
		// TODO: Validar que el usuario se haya autenticado
		// Sino lo ha hecho, redireccionar
		// TODO: Colocar un id que tenga tutorias

		this.fetchTutorTutorings();
	},
	methods: {
		...mapActions("HomeModule", ["fetchTutorTutorings"]),
		navigateToPublishNewTutoringOffer: async function() {
			let idUser = AuthenticationService.userValue.id;
			this.$router.push(`/tutor/publishtutoringoffer`);
		},
		updateColors: function() {
			const size: number = this.tutorTutorings.length;
			this.colors = new Array<string>();

			for (let i = 0; i < size; ++i) {
				this.colors.push(ColorService.generateRandomColorString());
			}
		}
	},
	watch: {
		tutorTutorings: function() {
			this.updateColors();
		}
	}
});
</script>

<style lang="scss" scoped>
.tutor-tutorings-component {
	height: 100%;
	padding: 16px;

	.tutoring-offers {
		height: 525px;
		display: flex;
		flex-flow: column nowrap;

		.new-tutoring {
			display: flex;
			justify-content: flex-start;
			margin-bottom: 0.5em;
		}
		button {
			padding: 12px 20px;
			background-color: #4e83ed;
			color: white;
			border-radius: 5px;
			border: none;
			font-size: 18px;
			font-weight: normal;
			cursor: pointer;
			margin-top: 2em;
		}

		h1 {
			text-align: center;
			font-size: 24px;
			color: #4e8efc;
		}
		.title {
			display: flex;
			align-items: center;
			& img {
				margin-right: 1em;
			}
		}

		.list {
			flex: 1;
			margin: 8px 0;
			overflow-y: auto;

			display: flex;
			flex-flow: column nowrap;

			.tutoring-offer {
				margin: 4px 0;
				align-items: center;
				cursor: pointer;

				display: flex;
				flex-flow: row nowrap;

				.box {
					width: 60px;
					height: 60px;
					margin-right: 16px;
					font-size: 28px;
					border-radius: 5px;

					display: flex;
					justify-content: center;
					align-items: center;
				}

				.name {
					font-size: 18px;
				}
			}
		}
	}

	.no-tutorings {
		height: 100%;

		display: flex;
		flex-flow: column nowrap;

		.information {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;

			flex: 1;

			h1 {
				color: #4e8efc;
				font-size: 24px;
				font-weight: bold;
			}

			p {
				font-size: 18px;
			}
		}

		.new-tutoring {
			flex: 1;

			display: flex;
			justify-content: center;
			align-items: center;

			button {
				background-color: #4e8efc;
				color: white;
				font-size: 24px;
				padding: 8px 20px;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				transition: all ease-in 0.25s;

				&:hover {
					transform: scale(1.05);
				}
			}
		}
	}
}
</style>
