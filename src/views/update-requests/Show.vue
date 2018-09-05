<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'update-requests-index' }">Back to update requests</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View update request</gov-heading>

          <update-request-details :update-request="updateRequest" />

          <gov-body>TODO</gov-body>
          <gov-section-break size="l" />
          <gov-button @click="onSubmit">Submit</gov-button>

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
      updateRequest: null
    };
  },
  methods: {
    async fetchUpdateRequests() {
      this.loading = true;

      const { data } = await http.get(`/update-requests/${this.$route.params.updateRequest}`);
      this.updateRequest = data;

      this.loading = false;
    },
    onSubmit() {
      alert("Submit");
    }
  },
  created() {
    this.fetchUpdateRequests();
  }
};
</script>
