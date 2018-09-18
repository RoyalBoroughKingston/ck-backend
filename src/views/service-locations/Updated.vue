<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Service Location Updated: ${serviceLocation.name}`" />

      <gov-back-link :to="{ name: 'service-locations-show', params: { serviceLocation: serviceLocation.id } }">Back to service location</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Update request submitted</gov-heading>
            <gov-body>
              Your update request for this service location has been received.
              It will need to be approved by an admin before the changes will be applied.
            </gov-body>

            <gov-button :to="{ name: 'service-locations-show', params: { serviceLocation: this.$route.params.serviceLocation } }">Back to service location</gov-button>
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
      serviceLocation: null
    };
  },
  methods: {
    async fetchServiceLocation() {
      this.loading = true;
      const response = await http.get(`/service-locations/${this.$route.params.serviceLocation}`);
      this.serviceLocation = response.data.data;
      this.loading = false;
    }
  },
  created() {
    this.fetchServiceLocation();
  }
};
</script>
