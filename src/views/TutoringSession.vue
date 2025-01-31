<template>
	<div style="padding:16px 32px">
		<Header />
		<div class="tutoring-session-container">
			<div class="view-tutoring-session">
				<div class="description-info">
					<h2>Descripción</h2>
					<p>{{ TutoringSession.description }}</p>
				</div>
				<div class="date-info-session">
					<h2>Fecha</h2>
					<p>{{ TutoringSession.endTime | simpleDate }}</p>
				</div>

				<div class="date-info-session">
					<h2>Inicio</h2>
					<p>{{ TutoringSession.startTime | simpleTime }}</p>
				</div>

				<div class="date-info-session">
					<h2>Fin</h2>
					<p>{{ TutoringSession.endTime | simpleTime }}</p>
				</div>

				<div class="topics-info-session">
					<h2>Temas</h2>
					<div
						class="topics"
						v-for="(topics, index) in TutoringSession.topics"
						v-bind:key="index"
					>
						{{ topics }}
					</div>
				</div>
				<button v-on:click="tutoringReservation()">
					Reservar tutoria
				</button>
			</div>

			<div class="container-qualificationsTutor">
				<h2>Comentarios del tutor</h2>
				<QualificationCard
					v-for="(qualification, index) in Tutor.Qualifications"
					v-bind:key="index"
					v-bind:qualification="qualification"
				></QualificationCard>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { TutoringSessionResponse } from "../dtos/output/TutoringSessionResponse";

import { RouterOptions, Route } from "vue-router";
import { findCommentsByTutorId } from "../Services/QualificationService";
import { reserve } from "../Services/TutoringSessionStudent";
import QualificationCard from "../components/Qualifications/QualificationsCard.vue";
import router from "../router";
import Header from "../components/Header.vue";
import AuthenticationService from "../Services/AuthenticationService";
import { TutoringOfferService } from "../Services/TutoringOfferService";

const convertToLocalTime = value => {
	let date: Date = new Date(value);
	value = new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
		)
	);
	return value;
};

export default Vue.extend({
	name: "TutoringSession",
	components: { QualificationCard, Header },
	data() {
		return {
			TutoringSession: {
				Place: "",
				StartTime: null,
				EndTime: null,
				StudentCount: null,
				Description: "",
				Price: null,
				Topics: [],
				TutorId: null
			} as TutoringSessionResponse,
			Tutor: {
				Qualifications: []
			}
		};
	},

	async created() {
		let tutoringService: TutoringOfferService = new TutoringOfferService();
		this.TutoringSession = await tutoringService.getSession(
			this.$route.params.id
		);
		this.Tutor.Qualifications = await findCommentsByTutorId(
			this.TutoringSession.tutorId
		);
	},
	methods: {
		async tutoringReservation(): Promise<any> {
			await reserve(
				AuthenticationService.userValue.id,
				this.TutoringSession.tutoringSessionId
			).then(() => {
				this.$router.push("/home");
			});
		}
	},

	filters: {
		simpleDate: function(value: Date): string {
			value = convertToLocalTime(value);
			return new Date(value).toLocaleDateString();
		},
		simpleTime: function(value: Date): string {
			value = convertToLocalTime(value);
			return new Date(value).toLocaleTimeString();
		}
	}
});
</script>

<style lang="scss">
.tutoring-session-container {
	display: flex;
	padding: 3em;
}
.container-qualificationsTutor {
	width: 20%;
}
.container-qualificationsTutor h2 {
	color: $yellow;
}
.view-tutoring-session {
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.view-tutoring-session > div {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	margin: 1em 0;
}
.view-tutoring-session button {
	color: $white;
	background: $primary-color;
	text-align: center;
	padding: 12px 0;
	width: 200px;
	border-radius: 4px;
	font-weight: 600;
	border: none;
	cursor: pointer;
	font-size: 1.25em;
}
</style>
