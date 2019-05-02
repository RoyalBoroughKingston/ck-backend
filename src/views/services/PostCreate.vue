<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Service" />

    <gov-back-link :to="{ name: 'services-show', params: { service: $route.params.service } }">
      Back to service
    </gov-back-link>

    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Add a location to your {{ service.type }}</gov-heading>

          <gov-body>
            Now that you've created your {{ service.type }}, you can add
            locations where you {{ service.type }} operates at.
          </gov-body>

          <gov-button :to="{ name: 'services-show', params: { service: service.id } }">
            Continue to {{ service.type }}
          </gov-button><!--
          -->&nbsp;<!--
          --><gov-button
            :to="{ name: 'service-locations-create', params: { service: service.id } }"
            success
          >
            Add location
          </gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  data() {
    return {
      service: null,
      loading: false
    }
  },

  methods: {
    async fetchService() {
      this.loading = true;

      const { data: { data: service } } = await http.get(
        `/services/${this.$route.params.service}`
      );
      this.service = service;

      this.loading = false;
    }
  },

  created() {
    this.fetchService();
  }
}
</script>
