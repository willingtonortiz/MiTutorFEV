import { TutoringOfferInfo } from "@/dtos/output/TutoringOfferInfo";
import { TutorInfo } from "@/dtos/input/TutorInfo";
import SearchTutoringOffersAndTutorsService from "@/Services/Home/SearchTutoringOffersAndTutorsService";
import AuthenticationService from "@/Services/AuthenticationService";
import { TutoringOfferService } from "@/Services/TutoringOfferService";

export default {
	namespaced: true,
	state: {
		tutoringOffers: [],
		tutors: [],
		tutorTutorings: []
	},
	getters: {
		tutoringOffers(state, getters) {
			return state.tutoringOffers;
		},
		tutors(state, getters) {
			return state.tutors;
		},
		tutorTutorings(state, getters) {
			return state.tutorTutorings;
		}
	},
	mutations: {
		setTutoringOffers(state, tutoringOffers: Array<TutoringOfferInfo>) {
			state.tutoringOffers = tutoringOffers;
		},
		setTutors(state, tutors: Array<TutorInfo>) {
			state.tutors = tutors;
		},
		setTutorTutorings(state, tutorTutorings) {
			state.tutorTutorings = tutorTutorings;
		}
	},
	actions: {
		async fetchTutoringOffers(context, courseName: string) {
			try {
				const tutoringOffers: Array<
					TutoringOfferInfo
				> = await SearchTutoringOffersAndTutorsService.findTutoringOffersByCourseName(
					courseName
				);

				context.commit("setTutoringOffers", tutoringOffers);
			} catch (error) {
				context.commit("setTutoringOffers", []);
			}
		},
		async fetchTutors(context, courseName: string) {
			try {
				const tutors: Array<
					TutorInfo
				> = await SearchTutoringOffersAndTutorsService.findTutorsByCourseName(
					courseName
				);

				context.commit("setTutors", tutors);
			} catch (error) {
				context.commit("setTutors", []);
			}
		},
		async fetchTutorTutorings(context, courseName: string) {
			try {
				const userId = AuthenticationService.userValue.id;

				const tutorTutorings = await TutoringOfferService.findAllByTutorId(
					userId
				);
				context.commit("setTutorTutorings", tutorTutorings);
			} catch (error) {
				console.log("ERROR => HOME_MODULE => FETCH_TUTOR_TUTORINGS");
				context.commit("setTutorTutorings", []);
			}
		}
	}
};
