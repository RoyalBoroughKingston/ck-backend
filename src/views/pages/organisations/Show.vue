<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="two-thirds">
          <gov-heading size="m">View organisation</gov-heading>
          <ck-organisation-details :organisation="organisation" />
          <gov-body>Please be certain of the action before deleting an organisation</gov-body>
          <gov-section-break size="l" />
          <gov-button @click="onDelete" class="bg-error">Delete organisation</gov-button>
        </gov-grid-column>
        <gov-grid-column width="one-third" class="text-right">
          <gov-button @click="onEdit">Edit organisation</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import CkOrganisationDetails from "@/components/CkOrganisationDetails";

export default {
  name: "ShowOrganisation",
  components: { CkOrganisationDetails },
  data() {
    return {
      loading: false,
      organisation: null
    };
  },
  methods: {
    fetchOrganisation() {
      this.loading = true;
      http
        .get(`/organisations/${this.$route.params.organisation}`)
        .then(({ data }) => {
          this.organisation = data.data;
          this.loading = false;
        });
    },
    onEdit() {
      alert("Edit");
    },
    onDelete() {
      alert("Delete");
    }
  },
  created() {
    this.fetchOrganisation();
  }
};
</script>
