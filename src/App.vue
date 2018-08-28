<template>
    <div id="app">
        <vue-headful :head="headAttributes" :html="htmlAttributes" />

        <slot name="bodyStart" />

        <slot name="skipLink">
            <gov-skip-link href="#main-content" />
        </slot>

        <slot name="header">
            <gov-header service-name="Connected Kingston" :navigation="headerNav" />
        </slot>

        <slot name="main">
            <div class="govuk-width-container">
                <slot name="beforeContent" />
                <main class="govuk-main-wrapper" :class="mainClassesString" id="main-content" role="main">
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
import GovFooter from "@/components/GovFooter";
import GovHeader from "@/components/GovHeader";
import GovSkipLink from "@/components/GovSkipLink";

export default {
  name: "App",
  components: { VueHeadful, GovFooter, GovHeader, GovSkipLink },
  data() {
    return {
      themeColor: "#0b0c0c",
      bodyClasses: ["js-enabled"],
      mainClasses: [],
      headerNav: [
        { text: "Services", href: "#" },
        { text: "Locations", href: "#" },
        { text: "Referrals", href: "#" },
        { text: "Organisations", href: "#" },
        { text: "Users", href: "#" },
        { text: "Reports", href: "#" },
        { text: "Admin", href: "#" },
        { text: "Update requests", href: "#" },
        { text: "Logout", href: "#" }
      ],
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
      }
    },
    htmlAttributes() {
      return {
        body: {
          class: [document.body.className, ...this.bodyClasses].join(" ")
        }
      };
    },
    mainClassesString() {
      return this.mainClasses.join(" ")
    }
  }
};
</script>
