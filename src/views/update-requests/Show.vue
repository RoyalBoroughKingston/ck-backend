<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - View Update Request" />

    <gov-back-link :to="{ name: 'update-requests-index' }">Back to update requests</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="full">

          <gov-error-summary title="Check this page">
            The update request needs to be confirmed. Check the
            page for inconsistencies, errors that would be
            problematic to a user.
          </gov-error-summary>

          <gov-heading size="m">View update request</gov-heading>

          <organisation-details
            v-if="updateRequest.updateable_type === 'organisations'"
            :organisation="updateRequest.data"
          />
          <service-details
            v-else-if="updateRequest.updateable_type === 'services'"
            :service="updateRequest.data"
          />
          <location-details
            v-else-if="updateRequest.updateable_type === 'locations'"
            :location="updateRequest.data"
          />
          <service-location-details
            v-else-if="updateRequest.updateable_type === 'service_locations'"
            :service-location="updateRequest.data"
          />
          <update-request-details
            v-else
            :update-request="updateRequest"
          />

          <gov-section-break size="xl" />

          <gov-heading size="m">Do you approve these changes?</gov-heading>

          <gov-radios inline>
            <gov-radio
              v-model="approve"
              id="approve"
              name="approve"
              label="Approve"
              :value="true"
            />
            <gov-radio
              v-model="approve"
              id="reject"
              name="approve"
              label="Reject"
              :value="false"
            />
          </gov-radios>

          <gov-section-break size="l" />

          <gov-button v-if="submitting" disabled type="submit">Submitting...</gov-button>
          <gov-button v-else @click="onSubmit" :disabled="approve === null" type="submit">Submit</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import UpdateRequestDetails from "@/views/update-requests/show/UpdateRequestDetails";
import OrganisationDetails from "@/views/update-requests/show/OrganisationDetails";
import ServiceDetails from "@/views/update-requests/show/ServiceDetails";
import LocationDetails from "@/views/update-requests/show/LocationDetails";
import ServiceLocationDetails from "@/views/update-requests/show/ServiceLocationDetails";

export default {
  name: "ShowUpdateRequest",
  components: {
    UpdateRequestDetails,
    OrganisationDetails,
    ServiceDetails,
    LocationDetails,
    ServiceLocationDetails
  },
  data() {
    return {
      loading: false,
      updateRequest: null,
      approve: null,
      submitting: false
    };
  },
  methods: {
    async fetchUpdateRequests() {
      this.loading = true;

      const { data } = await http.get(
        `/update-requests/${this.$route.params.updateRequest}`
      );
      this.updateRequest = data;
      this.updateRequest.data.id = data.updateable_id;

      this.loading = false;
    },
    async onSubmit() {
      try {
        this.submitting = true;

        if (this.approve) {
          await http.put(`/update-requests/${this.updateRequest.id}/approve`);

          switch (this.updateRequest.updateable_type) {
            case "services":
              this.$router.push({
                name: "services-show",
                params: { service: this.updateRequest.updateable_id }
              });
              break;
            case "organisations":
              this.$router.push({
                name: "organisations-show",
                params: { organisation: this.updateRequest.updateable_id }
              });
              break;
            case "locations":
              this.$router.push({
                name: "locations-show",
                params: { location: this.updateRequest.updateable_id }
              });
              break;
            case "service_locations":
              this.$router.push({
                name: "service-locations-show",
                params: { serviceLocation: this.updateRequest.updateable_id }
              });
              break;
            default:
              this.$router.push({ name: "update-requests-index" });
              break;
          }
        } else {
          await http.delete(`/update-requests/${this.updateRequest.id}`);
          this.$router.push({ name: "update-requests-index" });
        }
      } catch (error) {
        this.submitting = false;
      }
    }
  },
  created() {
    this.fetchUpdateRequests();
  }
};
</script>
