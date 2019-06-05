<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: CMS" />

    <gov-heading size="l">Frontend</gov-heading>

    <gov-tabs :tabs="tabs">
      <router-view />
    </gov-tabs>
  </div>
</template>

<script>
export default {
  name: "Cms",

  data() {
    return {
      tabs: [
        {
          heading: "Global",
          to: { name: "admin-index-cms" }
        },
        {
          heading: "Home",
          to: { name: "admin-index-cms-frontend-home" }
        },
        {
          heading: "Terms and Conditions",
          to: { name: "admin-index-cms-frontend-terms-and-conditions" }
        },
        {
          heading: "Privacy Policy",
          to: { name: "admin-index-cms-frontend-privacy-policy" }
        },
        {
          heading: "About",
          to: { name: "admin-index-cms-frontend-about" }
        },
        {
          heading: "Contact",
          to: { name: "admin-index-cms-frontend-contact" }
        },
        {
          heading: "Get Involved",
          to: { name: "admin-index-cms-frontend-get-involved" }
        },
        {
          heading: "Favourites",
          to: { name: "admin-index-cms-frontend-favourites" }
        }
      ]
    };
  }
};
</script>
