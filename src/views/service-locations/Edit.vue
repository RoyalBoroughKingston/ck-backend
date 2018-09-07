<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <gov-back-link :to="{ name: 'service-locations-show', params: { serviceLocation: serviceLocation.id } }">Back to service location</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Service locations</gov-heading>
            <gov-heading size="m">Edit service location</gov-heading>

            <service-location-form
              :errors="form.$errors"
              :name.sync="form.name"
              :regular_opening_hours.sync="form.regular_opening_hours"
              :holiday_opening_hours.sync="form.holiday_opening_hours"
              @clear="form.$errors.clear($event)"
            />

            <gov-section-break size="l" />

            <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import ServiceLocationForm from "@/views/service-locations/forms/ServiceLocationForm";
import http from "@/http";

export default {
  name: "EditServiceLocation",
  components: { ServiceLocationForm },
  data() {
    return {
      form: null,
      serviceLocation: null,
      loading: false
    };
  },
  methods: {
    async fetchServiceLocation() {
      this.loading = true;
      const response = await http.get(
        `/service-locations/${this.$route.params.serviceLocation}`
      );
      this.serviceLocation = response.data.data;
      this.form = new Form({
        name: this.serviceLocation.name || "",
        regular_opening_hours: this.serviceLocation.regular_opening_hours,
        holiday_opening_hours: this.serviceLocation.holiday_opening_hours
      });
      this.loading = false;
    },
    async onSubmit() {
      await this.form.put(`/service-locations/${this.serviceLocation.id}`);
      this.$router.push({
        name: "service-locations-show",
        params: { serviceLocation: this.serviceLocation.id }
      });
    }
  },
  created() {
    this.fetchServiceLocation();
  }
};
</script>
