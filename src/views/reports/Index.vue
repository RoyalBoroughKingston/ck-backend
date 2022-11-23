<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Reports" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Reports</gov-heading>

          <gov-body
            >Access information by recieving updates on data such as site
            usage.</gov-body
          >

          <gov-tabs :tabs="tabs">
            <router-view />
          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
export default {
  name: "ReportsPage",
  data() {
    return {
      tabs: [
        {
          heading: "View all",
          to: { name: "reports-index" },
        },
        {
          heading: "Manage",
          to: { name: "reports-edit" },
        },
      ],
    };
  },
};
</script>
