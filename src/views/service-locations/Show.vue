<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <gov-back-link :to="{ name: 'services-show', params: { service: serviceLocation.service_id } }">Back to service</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="two-thirds">

            <gov-heading size="m">View service location</gov-heading>

            <service-location-details :service-location="serviceLocation" />

            <gov-body>Please be certain of the action before deleting a service location</gov-body>

            <gov-section-break size="l" />

            <ck-delete-button
              resource="service location"
              :endpoint="`/service-locations/${this.serviceLocation.id}`"
              @deleted="onDelete"
            />

          </gov-grid-column>
          <gov-grid-column width="one-third" class="text-right">

            <gov-button :to="{ name: 'service-locations-edit', params: { serviceLocation: serviceLocation.id } }">
              Edit service location
            </gov-button>

          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import ServiceLocationDetails from "@/views/service-locations/show/ServiceLocationDetails";

export default {
  name: "ShowOrganisation",
  components: { ServiceLocationDetails },
  data() {
    return {
      loading: false,
      serviceLocation: null
    };
  },
  methods: {
    async fetchServiceLocation() {
      this.loading = true;
      const response = await http.get(`/service-locations/${this.$route.params.serviceLocation}`, { params: { include: "location" } });
      this.serviceLocation = response.data.data;
      this.loading = false;
    },
    onDelete() {
      this.$router.push({ name: "services-show", params: { service: this.serviceLocation.service_id } });
    }
  },
  created() {
    this.fetchServiceLocation();
  }
};
</script>
