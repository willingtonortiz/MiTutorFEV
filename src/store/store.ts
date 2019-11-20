import Vue from "vue";
import Vuex from "vuex";

import HomeModule from "./modules/HomeModule";
import ProfileModalModule from "@/store/modules/ProfileModalModule";
import ProfileCourseList from "@/store/modules/ProfileCourseList";
import PublishTutoring from "@/store/modules/PublishTutoring";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		HomeModule,
		ProfileModalModule,
		ProfileCourseList,
		PublishTutoring
	}
});
