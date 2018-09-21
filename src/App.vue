<template>
  <div id="app">
    <vue-headful title="Connected Kingston" :head="headAttributes" :html="htmlAttributes" />

    <gov-skip-link href="#main-content">Skip to main content</gov-skip-link>

    <gov-header service-name="Connected Kingston" :navigation="headerNav" />

    <div class="govuk-width-container">
      <main class="govuk-main-wrapper" :class="mainClasses" id="main-content" role="main">
        <router-view />
      </main>
    </div>

    <gov-footer :navigation="footerNav" :meta="footerMeta" />
  </div>
</template>

<script>
import Auth from "@/classes/Auth";

export default {
  name: "App",
  data() {
    return {
      themeColor: "#0b0c0c",
      bodyClasses: ["js-enabled"],
      mainClasses: [],
      headerNav: [],
      footerNav: [],
      footerMeta: {
        items: []
      },
      loggedInItems: [
        { text: "Services", to: { name: "services-index" } },
        { text: "Locations", to: { name: "locations-index" } },
        { text: "Referrals", to: { name: "referrals-index" } },
        { text: "Organisations", to: { name: "organisations-index" } },
        { text: "Users", to: { name: "users-index" } },
        { text: "Reports", to: { name: "reports-index" } },
        { text: "Admin", to: { name: "admin-index" } },
        { text: "Update requests", to: { name: "update-requests-index" } },
        { text: "Logout", to: { name: "logout" } }
      ],
      loggedOutItems: [{ text: "Login", href: Auth.authorizeUrl }]
    };
  },
  computed: {
    headAttributes() {
      return {
        "meta[name=theme-color]": { content: this.themeColor }
      };
    },
    htmlAttributes() {
      return {
        body: {
          class: [document.body.className, ...this.bodyClasses].join(" ")
        }
      };
    }
  },
  methods: {
    setHeaderItems() {
      console.log(Auth.isLoggedIn);
      this.headerNav = Auth.isLoggedIn
        ? this.loggedInItems
        : this.loggedOutItems;
    }
  },
  created() {
    this.setHeaderItems();
    this.$root.$on("login", this.setHeaderItems);
    this.$root.$on("logout", this.setHeaderItems);
  }
};
</script>
