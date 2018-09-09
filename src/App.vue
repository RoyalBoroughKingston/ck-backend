<template>
  <div id="app">
    <vue-headful title="Connected Kingston" :head="headAttributes" :html="htmlAttributes" />

    <slot name="bodyStart" />

    <slot name="skipLink">
      <gov-skip-link href="#main-content">Skip to main content</gov-skip-link>
    </slot>

    <slot name="header">
      <gov-header service-name="Connected Kingston" :navigation="headerNav" />
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
export default {
  name: "App",
  data() {
    return {
      themeColor: "#0b0c0c",
      bodyClasses: ["js-enabled"],
      mainClasses: [],
      headerNav: [
        { text: "Services", href: { name: "services-index" } },
        { text: "Locations", href: { name: "locations-index" } },
        { text: "Referrals", href: { name: "referrals-index" } },
        { text: "Organisations", href: { name: "organisations-index" } },
        { text: "Users", href: { name: "users-index" } },
        { text: "Reports", href: { name: "reports-index" } },
        { text: "Admin", href: "#" },
        { text: "Update requests", href: { name: "update-requests-index" } },
        { text: "Logout", href: { name: "logout" } }
      ],
      footerNav: [],
      footerMeta: {
        items: []
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
    }
  }
};
</script>
