<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'locations-index' }">Back to locations</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="two-thirds">
          <gov-heading size="m">View location</gov-heading>

            <location-details :location="location" />

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import LocationDetails from "@/views/locations/show/LocationDetails";
import http from "@/http";

export default {
  name: "ShowLocation",
  components: { LocationDetails },
  data() {
    return {
      loading: false,
      location: null
    };
  },
  methods: {
    async fetchLocation() {
      this.loading = true;

      const response = await http.get(`/locations/${this.$route.params.location}`);
      this.location = response.data.data;

      this.loading = false;
    }
  },
  created() {
    this.fetchLocation();
  }
};
</script>
