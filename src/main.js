// GOV.UK Frontend Toolkit
import "@/scss/app.scss";
import { initAll } from "govuk-frontend";
initAll();

// Vue
import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
