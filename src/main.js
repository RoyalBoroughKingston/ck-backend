// GOV.UK Frontend Toolkit
import "@/scss/app.scss";
import { initAll } from "govuk-frontend";
initAll();

// Moment (date/time library).
import moment from "moment";

// Vue
import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

// Custom Vue Components
Vue.component("CkLoader", () => import("@/components/CkLoader"));
Vue.component("CkOrganisationDetails", () =>
  import("@/components/CkOrganisationDetails")
);
Vue.component("CkOrganisationsTable", () =>
  import("@/components/CkOrganisationsTable")
);
Vue.component("CkReferralDetails", () =>
  import("@/components/CkReferralDetails")
);
Vue.component("CkReferralsTable", () =>
  import("@/components/CkReferralsTable")
);

// Gov.UK Vue Components
Vue.component("GovBackLink", () => import("@/components/Gov/GovBackLink"));
Vue.component("GovBody", () => import("@/components/Gov/GovBody"));
Vue.component("GovButton", () => import("@/components/Gov/GovButton"));
Vue.component("GovErrorMessage", () =>
  import("@/components/Gov/GovErrorMessage")
);
Vue.component("GovFileUpload", () => import("@/components/Gov/GovFileUpload"));
Vue.component("GovFooter", () => import("@/components/Gov/GovFooter"));
Vue.component("GovFormGroup", () => import("@/components/Gov/GovFormGroup"));
Vue.component("GovGridColumn", () => import("@/components/Gov/GovGridColumn"));
Vue.component("GovGridRow", () => import("@/components/Gov/GovGridRow"));
Vue.component("GovHeader", () => import("@/components/Gov/GovHeader"));
Vue.component("GovHeading", () => import("@/components/Gov/GovHeading"));
Vue.component("GovHint", () => import("@/components/Gov/GovHint"));
Vue.component("GovInput", () => import("@/components/Gov/GovInput"));
Vue.component("GovLabel", () => import("@/components/Gov/GovLabel"));
Vue.component("GovLink", () => import("@/components/Gov/GovLink"));
Vue.component("GovMainWrapper", () =>
  import("@/components/Gov/GovMainWrapper")
);
Vue.component("GovSectionBreak", () =>
  import("@/components/Gov/GovSectionBreak")
);
Vue.component("GovSelect", () => import("@/components/Gov/GovSelect"));
Vue.component("GovSkipLink", () => import("@/components/Gov/GovSkipLink"));
Vue.component("GovTable", () => import("@/components/Gov/GovTable"));
Vue.component("GovTag", () => import("@/components/Gov/GovTag"));
Vue.component("GovTextarea", () => import("@/components/Gov/GovTextarea"));
Vue.component("GovWidthContainer", () =>
  import("@/components/Gov/GovWidthContainer")
);

// Vue Helpers
Vue.mixin({
  methods: {
    apiUrl(path) {
      return process.env.VUE_APP_API_URI + path;
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    formatDate(date) {
      return moment(date, moment.ISO_8601).format("D/M/YY");
    },
    formatDateTime(dateTime) {
      return moment(dateTime, moment.ISO_8601).format("D/M/YY HH:mm");
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
