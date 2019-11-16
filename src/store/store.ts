import Vue from "vue";
import Vuex from "vuex";

import HomeModule from "./modules/HomeModule";
import ProfileModalModule from "@/store/modules/ProfileModalModule";
import ProfileCourseList from "@/store/modules/ProfileCourseList";
import PublishTutoring from "@/store/modules/PublishTutoring"

Vue.use(Vuex);

const getDefaultState = () => {};

const state = {

};

const getters = {
    
};

const mutations = {

};

const actions = {

};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        HomeModule,
        ProfileModalModule,
        ProfileCourseList,
        PublishTutoring
    }
});
