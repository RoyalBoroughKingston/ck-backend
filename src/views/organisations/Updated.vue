<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful
        :title="`Connected Kingston - Organisation Updated: ${organisation.name}`"
      />

      <gov-back-link
        :to="{
          name: 'organisations-show',
          params: { organisation: organisation.id },
        }"
        >Back to organisation</gov-back-link
      >
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Update request submitted</gov-heading>
            <gov-body>
              Your update request for this organisation has been received. It
              will need to be approved by an admin before the changes will be
              applied.
            </gov-body>

            <gov-button
              :to="{
                name: 'organisations-show',
                params: { organisation: this.$route.params.organisation },
              }"
              >Back to organisation</gov-button
            >
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "OrganisationUpdated",
  data() {
    return {
      loading: false,
      organisation: null,
    };
  },
  methods: {
    async fetchOrganisation() {
      this.loading = true;
      const response = await http.get(
        `/organisations/${this.$route.params.organisation}`
      );
      this.organisation = response.data.data;
      this.loading = false;
    },
  },
  created() {
    this.fetchOrganisation();
  },
};
</script>
