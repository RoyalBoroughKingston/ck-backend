import Vue from "vue";
import Router from "vue-router";
import Auth from "@/classes/Auth";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/Login")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/auth/Logout")
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/Dashboard"),
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
      path: "/organisations/:organisation/edit",
      name: "organisations-edit",
      component: () => import("@/views/organisations/Edit"),
      meta: { auth: true }
    },
    {
      path: "/organisations/:organisation/updated",
      name: "organisations-updated",
      component: () => import("@/views/organisations/Updated"),
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
      path: "/locations/:location/edit",
      name: "locations-edit",
      component: () => import("@/views/locations/Edit"),
      meta: { auth: true }
    },
    {
      path: "/locations/:location/updated",
      name: "locations-updated",
      component: () => import("@/views/locations/Updated"),
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
      path: "/users/:user/edit",
      name: "users-edit",
      component: () => import("@/views/users/Edit"),
      meta: { auth: true }
    },
    {
      path: "/services",
      name: "services-index",
      component: () => import("@/views/services/Index"),
      meta: { auth: true }
    },
    {
      path: "/services/create",
      name: "services-create",
      component: () => import("@/views/services/Create"),
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
    },
    {
      path: "/services/:service/edit",
      name: "services-edit",
      component: () => import("@/views/services/Edit"),
      meta: { auth: true }
    },
    {
      path: "/services/:service/updated",
      name: "services-updated",
      component: () => import("@/views/services/Updated"),
      meta: { auth: true }
    },
    {
      path: "/services/:service/service-locations/create",
      name: "service-locations-create",
      component: () => import("@/views/service-locations/Create"),
      meta: { auth: true }
    },
    {
      path: "/service-locations/:serviceLocation",
      name: "service-locations-show",
      component: () => import("@/views/service-locations/Show"),
      meta: { auth: true }
    },
    {
      path: "/service-locations/:serviceLocation/edit",
      name: "service-locations-edit",
      component: () => import("@/views/service-locations/Edit"),
      meta: { auth: true }
    },
    {
      path: "/service-locations/:serviceLocation/updated",
      name: "service-locations-updated",
      component: () => import("@/views/service-locations/Updated"),
      meta: { auth: true }
    },
    {
      path: "/update-requests",
      name: "update-requests-index",
      component: () => import("@/views/update-requests/Index"),
      meta: { auth: true }
    },
    {
      path: "/update-requests/:updateRequest",
      name: "update-requests-show",
      component: () => import("@/views/update-requests/Show"),
      meta: { auth: true }
    },
    {
      path: "/reports",
      name: "reports-index",
      component: () => import("@/views/reports/Index"),
      meta: { auth: true }
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/Index"),
      meta: { auth: true },
      children: [
        {
          path: "/",
          name: "admin-index",
          component: () => import("@/views/admin/index/AuditLogs")
        }
      ]
    },
    {
      path: "/audits/:audit",
      name: "audits-show",
      component: () => import("@/views/audits/Show"),
      meta: { auth: true }
    }
  ]
});

// Middleware.
router.beforeEach((to, from, next) => {
  // If user needs to be authed, then redirect them to the auth URL.
  if (to.matched.some(route => route.meta.auth)) {
    if (!Auth.isLoggedIn) {
      return Auth.redirect();
    }
  }

  next();
});

export default router;
