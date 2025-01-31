import {TutoringOfferRequest} from "@/Models/TutoringOfferRequest";


const getDefaultState = () => {
    return {
        TutoringOffer: {
            Capacity: null,
            Description: '',
            CourseId: null,
            UniversityId: null,
            TutorId: null,
            TutoringSessionRequests: [],
        } as TutoringOfferRequest
    }
};

const state = getDefaultState();

const getters = {
    GetTutoringOffer: (state) => state.TutoringOffer,
    TutoringSessions: (state) => state.TutoringOffer.TutoringSessionsRequests,
    TutoringOfferCourse: (state) => state.TutoringOffer.CourseId,
};

const mutations = {
    addSessionCommit: (state, session) => {
        state.TutoringOffer.TutoringSessionRequests.push(session);
    },
    addOfferCommit: (state, offer) => {
        state.TutoringOffer = offer;
    },
    deleteSessionCommit: (state, sessionIndex) => {
        state.TutoringOffer.TutoringSessionRequests.splice(sessionIndex, 1);
    },
    resetCommit: (state) => {
        Object.assign(state, getDefaultState())
    }
};

const actions = {
    addSession({commit}, session) {
        commit('addSessionCommit', session)
    },
    addOffer({commit}, offer) {
        commit('addOfferCommit', offer)
    },
    deleteSession({commit}, sessionIndex) {
        commit('deleteSessionCommit', sessionIndex)
    },
    reset({commit}) {
        commit('resetCommit')
    }

};

export default{
    state,
    getters,
    mutations,
    actions 
};
