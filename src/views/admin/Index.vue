<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Admin" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">

          <gov-heading size="xl">Admin</gov-heading>

          <gov-tabs :tabs="tabs" bar :panel="false">
            <gov-section-break size="m" />
            <router-view />
          </gov-tabs>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      tabs: [
        { heading: "Audit Logs", to: { name: "admin-index" } },
        { heading: "Notifications", to: { name: "admin-index-notifications" } },
        { heading: "Feedback", to: { name: "admin-index-feedback" } },
        { heading: "Taxonomies", to: { name: "admin-index-taxonomies" } },
        { heading: "Collections", to: { name: "admin-index-collections" } },
        { heading: "Search engine", to: { name: "admin-index-search-engine" } }
      ]
    };
  }
};
</script>
