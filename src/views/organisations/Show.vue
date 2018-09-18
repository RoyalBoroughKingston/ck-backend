<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'organisations-index' }">Back to organisations</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful :title="`Connected Kingston - Organisation: ${organisation.name}`" />

        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View organisation</gov-heading>

          <ck-organisation-details :organisation="organisation" />

          <gov-body>Please be certain of the action before deleting an organisation</gov-body>

          <gov-section-break size="l" />

          <ck-delete-button
            resource="organisation"
            :endpoint="`/organisations/${this.organisation.id}`"
            @deleted="onDelete"
          />

        </gov-grid-column>
        <gov-grid-column width="one-third" class="text-right">

          <gov-button :to="{ name: 'organisations-edit', params: { organisation: organisation.id } }">
            Edit organisation
          </gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ShowOrganisation",
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
    onDelete() {
      this.$router.push({ name: "organisations-index" });
    }
  },
  created() {
    this.fetchOrganisation();
  }
};
</script>
