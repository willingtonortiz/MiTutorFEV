import {TutoringOfferInfo} from "@/dtos/output/TutoringOfferInfo";
import {TutorInfo} from "@/dtos/input/TutorInfo";
import SearchTutoringOffersAndTutorsService from "@/Services/Home/SearchTutoringOffersAndTutorsService";

export default {
    state: {
        tutoringOffers: [],
        tutors: []
    },
    getters: {
        tutoringOffers(state, getters) {
            return state.tutoringOffers;
        },
        tutors(state, getters) {
            return state.tutors;
        }
    },
    mutations: {
        setTutoringOffers(state, tutoringOffers: Array<TutoringOfferInfo>) {
            state.tutoringOffers = tutoringOffers;
        },
        setTutors(state, tutors: Array<TutorInfo>) {
            state.tutors = tutors;
        }
    },
    actions: {
        async fetchTutoringOffers(context, courseName: string) {
            const tutoringOffers: Array<TutoringOfferInfo> = await SearchTutoringOffersAndTutorsService
                .findTutoringOffersByCourseName(courseName);

            context.commit('setTutoringOffers', tutoringOffers);
        },
        async fetchTutors(context, courseName: string) {
            const tutors: Array<TutorInfo> = await SearchTutoringOffersAndTutorsService
                .findTutorsByCourseName(courseName);

            context.commit('setTutors', tutors);
        }
    }
}