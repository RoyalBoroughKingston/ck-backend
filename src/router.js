import Vue from "vue";
import Router from "vue-router";
import auth from "@/classes/Auth";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/Dashboard"),
      meta: { auth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login"),
      meta: { guest: true }
    },
    {
      path: "/login/code",
      name: "login-code",
      component: () => import("@/views/auth/Code"),
      meta: { guest: true }
    },
    {
      path: "/forgotten-password",
      name: "forgotten-password",
      component: () => import("@/views/auth/ForgottenPassword"),
      meta: { guest: true }
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("@/views/auth/NewPassword"),
      meta: { guest: true }
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/auth/Logout"),
      meta: { auth: true }
    },
    {
      path: "/organisations",
      name: "organisations-index",
      component: () => import("@/views/organisations/Index"),
      meta: { auth: true }
    },
    {
      path: "/organisations/create",
      name: "organisations-create",
      component: () => import("@/views/organisations/Create"),
      meta: { auth: true }
    },
    {
      path: "/organisations/:organisation",
      name: "organisations-show",
      component: () => import("@/views/organisations/Show"),
      meta: { auth: true }
    },
    {
      path: "/referrals",
      name: "referrals-index",
      component: () => import("@/views/referrals/Index"),
      meta: { auth: true }
    },
    {
      path: "/referrals/:referral/confirmation",
      name: "referrals-confirmation",
      component: () => import("@/views/referrals/Confirmation"),
      meta: { auth: true }
    },
    {
      path: "/referrals/:referral",
      name: "referrals-show",
      component: () => import("@/views/referrals/Show"),
      meta: { auth: true }
    },
    {
      path: "/locations",
      name: "locations-index",
      component: () => import("@/views/locations/Index"),
      meta: { auth: true }
    },
    {
      path: "/locations/create",
      name: "locations-create",
      component: () => import("@/views/locations/Create"),
      meta: { auth: true }
    },
    {
      path: "/locations/:location",
      name: "locations-show",
      component: () => import("@/views/locations/Show"),
      meta: { auth: true }
    },
    {
      path: "/users",
      name: "users-index",
      component: () => import("@/views/users/Index"),
      meta: { auth: true }
    },
    {
      path: "/users/create",
      name: "users-create",
      component: () => import("@/views/users/Create"),
      meta: { auth: true }
    },
    {
      path: "/users/:user",
      name: "users-show",
      component: () => import("@/views/users/Show"),
      meta: { auth: true }
    },
    {
      path: "/services",
      name: "services-index",
      component: () => import("@/views/services/Index"),
      meta: { auth: true }
    },
    {
      path: "/services/:service",
      component: () => import("@/views/services/Show"),
      meta: { auth: true },
      children: [
        {
          path: "",
          name: "services-show",
          component: () => import("@/views/services/show/DetailsTab")
        },
        {
          path: "additional-info",
          name: "services-show-additional-info",
          component: () => import("@/views/services/show/AdditionalInfoTab")
        },
        {
          path: "useful-info",
          name: "services-show-useful-info",
          component: () => import("@/views/services/show/UsefulInfoTab")
        },
        {
          path: "contact-info",
          name: "services-show-contact-info",
          component: () => import("@/views/services/show/ContactInfoTab")
        },
        {
          path: "who-for",
          name: "services-show-who-for",
          component: () => import("@/views/services/show/WhoForTab")
        },
        {
          path: "locations",
          name: "services-show-locations",
          component: () => import("@/views/services/show/LocationsTab")
        },
        {
          path: "referral",
          name: "services-show-referral",
          component: () => import("@/views/services/show/ReferralTab")
        }
      ]
    }
  ]
});

// Middleware.
router.beforeEach((to, from, next) => {
  // If user needs to be authed.
  if (to.matched.some(route => route.meta.auth)) {
    if (!auth.isLoggedIn) {
      auth
        .refreshAccessToken()
        .then(() => next())
        .catch(() => next({ name: "login" }));
      return;
    }
  }

  // If user needs to be a guest.
  if (to.matched.some(route => route.meta.guest)) {
    if (auth.isLoggedIn) {
      next({ name: "dashboard" });
      return;
    }
  }

  next();
});

export default router;
