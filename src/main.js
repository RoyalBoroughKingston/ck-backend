// Import styling.
import "@/scss/app.scss";

// Moment (date/time library).
import moment from "moment";

// Markdown conversion.
import TurndownService from "turndown";
import Showdown from "showdown";
const turndownService = new TurndownService();
const classMap = {
  p: "govuk-body",
  b: "govuk-!-font-weight-bold",
  a: "govuk-link",
  strong: "govuk-!-font-weight-bold",
  h2: "govuk-heading-l",
  h3: "govuk-heading-m"
};
const bindings = Object.keys(classMap).map(key => ({
  type: "output",
  regex: new RegExp(`<${key}>`, "g"),
  replace: `<${key} class="${classMap[key]}">`
}));
const markdownToHtmlConverter = new Showdown.Converter({
  extensions: [...bindings],
  noHeaderId: true
});

// Vue
import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

// Custom Vue Components
Vue.component("CkLoader", () => import("@/components/CkLoader"));
Vue.component("CkLocationsTable", () =>
  import("@/components/CkLocationsTable")
);
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
Vue.component("CkServiceDetails", () =>
  import("@/components/CkServiceDetails")
);
Vue.component("CkServicesTable", () => import("@/components/CkServicesTable"));
Vue.component("CkUserDetails", () => import("@/components/CkUserDetails"));
Vue.component("CkUsersTable", () => import("@/components/CkUsersTable"));
Vue.component("CkWysiwyg", () => import("@/components/CkWysiwyg"));

// Gov.UK Vue Components
Vue.component("GovBackLink", () => import("@/components/Gov/GovBackLink"));
Vue.component("GovBody", () => import("@/components/Gov/GovBody"));
Vue.component("GovButton", () => import("@/components/Gov/GovButton"));
Vue.component("GovCheckbox", () => import("@/components/Gov/GovCheckbox"));
Vue.component("GovCheckboxes", () => import("@/components/Gov/GovCheckboxes"));
Vue.component("GovDetails", () => import("@/components/Gov/GovDetails"));
Vue.component("GovErrorMessage", () =>
  import("@/components/Gov/GovErrorMessage")
);
Vue.component("GovFieldsetLegend", () =>
  import("@/components/Gov/GovFieldsetLegend")
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
Vue.component("GovInsetText", () => import("@/components/Gov/GovInsetText"));
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
Vue.component("GovTableCell", () => import("@/components/Gov/GovTableCell"));
Vue.component("GovTableHeader", () =>
  import("@/components/Gov/GovTableHeader")
);
Vue.component("GovTableRow", () => import("@/components/Gov/GovTableRow"));
Vue.component("GovTabs", () => import("@/components/Gov/GovTabs"));
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
    },
    toMarkdown(html) {
      return turndownService.turndown(html);
    },
    toHtml(markdown) {
      return markdownToHtmlConverter.makeHtml(markdown);
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
