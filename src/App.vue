<template>
  <div id="app">
    <vue-headful title="Connected Kingston" :head="headAttributes" :html="htmlAttributes" />

    <slot name="bodyStart" />

    <slot name="skipLink">
      <gov-skip-link href="#main-content">Skip to main content</gov-skip-link>
    </slot>

    <slot name="header">
      <gov-header service-name="Connected Kingston" :navigation="computedHeaverNav" />
    </slot>

    <slot name="main">
      <div class="govuk-width-container">
        <slot name="beforeContent" />
        <main class="govuk-main-wrapper" :class="mainClasses" id="main-content" role="main">
          <router-view />
        </main>
      </div>
    </slot>

    <slot name="footer">
      <gov-footer :navigation="footerNav" :meta="footerMeta" />
    </slot>

    <slot name="bodyEnd" />
  </div>
</template>

<script>
import VueHeadful from "vue-headful";
import auth from "@/classes/Auth";

export default {
  name: "App",
  components: { VueHeadful },
  data() {
    return {
      themeColor: "#0b0c0c",
      bodyClasses: ["js-enabled"],
      mainClasses: [],
      headerNav: [
        { text: "Services", href: "#" },
        { text: "Locations", href: { name: "locations-index" } },
        { text: "Referrals", href: { name: "referrals-index" } },
        { text: "Organisations", href: { name: "organisations-index" } },
        { text: "Users", href: { name: "users-index" }},
        { text: "Reports", href: "#" },
        { text: "Admin", href: "#" },
        { text: "Update requests", href: "#" }
      ],
      authNavItem: auth.isLoggedIn
        ? { text: "Logout", href: { name: "logout" } }
        : { text: "Login", href: { name: "login" } },
      footerNav: [
        {
          title: "Something Here",
          items: [
            { text: "Google", href: "https://google.com" },
            { text: "Google", href: "https://google.com" },
            { text: "Google", href: "https://google.com" }
          ]
        }
      ],
      footerMeta: {
        items: [
          { text: "Clear data", href: "#clear-data" },
          { text: "Cookies", href: "#cookies" },
          { text: "Privacy policy", href: "#privacy-policy" }
        ]
      }
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
    },
    computedHeaverNav() {
      return [...this.headerNav, this.authNavItem];
    }
  },
  created() {
    this.$root.$on(["login", "logout"], () => {
      this.authNavItem = auth.isLoggedIn
        ? { text: "Logout", href: { name: "logout" } }
        : { text: "Login", href: { name: "login" } };
    });
  }
};
</script>
