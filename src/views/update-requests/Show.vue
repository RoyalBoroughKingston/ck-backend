<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'update-requests-index' }">Back to update requests</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View update request</gov-heading>

          <update-request-details :update-request="updateRequest" />

        </gov-grid-column>
      </gov-grid-row>

      <gov-grid-row class="govuk-!-padding-bottom-4">
        <gov-grid-column width="two-thirds">

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

export default {
  name: "ShowUpdateRequest",
  components: { UpdateRequestDetails },
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

      const { data } = await http.get(`/update-requests/${this.$route.params.updateRequest}`);
      this.updateRequest = data;

      this.loading = false;
    },
    async onSubmit() {
      try {
        this.submitting = true;

        if (this.approve) {
          await http.put(`/update-requests/${this.updateRequest.id}/approve`);

          switch (this.updateRequest.updateable_type) {
            case "services":
              this.$router.push({ name: "services-show", params: { service: this.updateRequest.updateable_id } });
              break;
            case "organisations":
              this.$router.push({ name: "organisations-show", params: { organisation: this.updateRequest.updateable_id } });
              break;
            case "locations":
              this.$router.push({ name: "locations-show", params: { location: this.updateRequest.updateable_id } });
              break;
            case "service_locations":
              const reponse = await http.get(`/service-locations/${this.updateRequest.id}`);
              const serviceId = response.data.data.id;
              this.$router.push({ name: "services-show", params: { service: serviceId } });
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
