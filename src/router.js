import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/pages/Test")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/pages/auth/Login")
    },
    {
      path: "/login/code",
      name: "login-code",
      component: () => import("@/views/pages/auth/Code")
    },
    {
      path: "/forgotten-password",
      name: "forgotten-password",
      component: () => import("@/views/pages/auth/ForgottenPassword")
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("@/views/pages/auth/NewPassword")
    }
  ]
});
