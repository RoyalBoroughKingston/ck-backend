// GOV.UK Frontend Toolkit
import "@/scss/app.scss";
import { initAll } from "govuk-frontend";
initAll();

// Vue
import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

// Vue Components
Vue.component("CkLoader", () => import("@/components/CkLoader"));
Vue.component("GovBackLink", () => import("@/components/GovBackLink"));
Vue.component("GovBody", () => import("@/components/GovBody"));
Vue.component("GovButton", () => import("@/components/GovButton"));
Vue.component("GovFooter", () => import("@/components/GovFooter"));
Vue.component("GovFormGroup", () => import("@/components/GovFormGroup"));
Vue.component("GovGridColumn", () => import("@/components/GovGridColumn"));
Vue.component("GovGridRow", () => import("@/components/GovGridRow"));
Vue.component("GovHeader", () => import("@/components/GovHeader"));
Vue.component("GovHeading", () => import("@/components/GovHeading"));
Vue.component("GovInput", () => import("@/components/GovInput"));
Vue.component("GovLabel", () => import("@/components/GovLabel"));
Vue.component("GovLink", () => import("@/components/GovLink"));
Vue.component("GovMainWrapper", () => import("@/components/GovMainWrapper"));
Vue.component("GovSkipLink", () => import("@/components/GovSkipLink"));
Vue.component("GovWidthContainer", () =>
  import("@/components/GovWidthContainer")
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
