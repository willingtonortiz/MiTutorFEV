import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Counter from "./components/Counter.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import About from "./views/About.vue";
import Subscription from "./views/Subscription.vue";
import PublishTutoringOfferView from "./views/PublishTutoringOffer.vue"
import PublishTutoringSessionView from "./views/PublishTutoringSession.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      component: PublishTutoringOfferView 
    },
    {
      path: "/tutor/:id/publishtutoringSession",
      name: "publishTutoringSession",
      component: PublishTutoringSessionView
    }
  ]
});
