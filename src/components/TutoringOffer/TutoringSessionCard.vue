<template>
	<div
		v-on:click="
			navigateSessionDetails(
				session.tutoringSessionId,
				session,
				TutoringOffer.tutorId
			)
		"
		class="card-session"
	>
		<div class="card-session-topics">
			<h2>Temas</h2>
			<div v-for="topics in session.topics" v-bind:key="topics">
				<p>{{ topics }}</p>
			</div>
		</div>
		<div>
			<div>
				<div class="date-info-card">
					<h4>Fecha</h4>
					<p>{{ session.startTime | simpleDate }}</p>
				</div>

				<div class="date-info-card">
					<h4>Inicio</h4>
					<p>{{ session.startTime | simpleTime }}</p>
				</div>

				<div class="date-info-card">
					<h4>Fin</h4>
					<p>{{ session.endTime | simpleTime }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";
import router from "../../router";
export default Vue.extend({
	name: "TutoringSessionCard",
	props: ["session", "TutoringOffer"],
	methods: {
		navigateSessionDetails: (id, session, idTutor) => {
			router.push({
				name: "tutoringSession",
				params: {
					id: id,
					TutoringSessionAux: session,
					tutorId: idTutor
				}
			});
		}
	},
	filters: {
		simpleDate: function(value: Date): string {
			return new Date(value).toLocaleDateString();
		},
		simpleTime: function(value: Date): string {
			return new Date(value).toLocaleTimeString();
		}
	}
});
</script>

<style lang="scss">
.card-session {
	width: 300px;
	padding: 16px;
	border-radius: 6px;

	border: 1px solid #eeeeee;

	cursor: pointer;
	transition: all 0.2s ease-in-out;
	margin: 1.25em 1.25em 0 0;
}
.card-session-topics {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 1em;
}
.card-session-topics h2 {
	font-size: 1.25em;
	margin: 0 0.5em;
}
.card-session-topics p {
	font-size: 0.75em;
	margin: 0 0.5em;
	padding: 0.5em;
	background: $primary-color;
	color: $white;
	border-radius: 3px;
}
.date-info-card {
	display: flex;
	font-size: 14px;
	margin: 0 0.5em;
	justify-content: flex-start;
}
.date-info-card h4 {
	margin: 0 0.5em;
	width: 50px;
}
.date-info-card p {
	opacity: 0.78;
}

.card-session:hover {
	box-shadow: 0 0px 12px rgba(0, 0, 0, 0.09);
}
.card-session:active {
	transform: scale(0.95);
}
</style>
