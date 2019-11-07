import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import About from "./views/About.vue";
import Subscription from "./views/Subscription.vue";
import PublishTutoringOffer from "./views/PublishTutoringOffer.vue"
import PublishTutoringSession from "./views/PublishTutoringSession.vue"
import TutoringOffer from "./views/TutoringOffer.vue"
import TutoringSession from "./views/TutoringSession.vue"
import ProfileContainerPage from "@/views/ProfileContainerPage.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "home"
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/home/subscription",
            name: "subscription",
            component: Subscription
        },
        {
            path: "/tutor/:id/publishtutoringoffer",
            name: "publishTutoringOffer",
            component: PublishTutoringOffer
        },
        {
            path: "/tutor/:id/publishtutoringsession",
            name: "publishTutoringSession",
            component: PublishTutoringSession
        },
        {
            path: "/tutoringoffer/:id",
            name: "tutoringOffer",
            component: TutoringOffer
        },
        {
            path: "/tutoringsession/:id",
            name: "tutoringSession",
            component: TutoringSession,
            props: true
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileContainerPage
        }
    ]
});
