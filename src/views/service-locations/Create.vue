<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <gov-back-link :to="{ name: 'services-show-locations', params: { service: service.id } }">Back to service</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Service locations</gov-heading>
            <gov-heading size="m">Add service location</gov-heading>

            <service-location-form
              :errors="form.$errors"
              :location-errors="locationForm.$errors"
              :location_type.sync="location_type"
              :location_id.sync="form.location_id"
              :name.sync="form.name"
              :address_line_1.sync="locationForm.address_line_1"
              :address_line_2.sync="locationForm.address_line_2"
              :address_line_3.sync="locationForm.address_line_3"
              :city.sync="locationForm.city"
              :county.sync="locationForm.county"
              :postcode.sync="locationForm.postcode"
              :country.sync="locationForm.country"
              :has_induction_loop.sync="locationForm.has_induction_loop"
              :has_wheelchair_access.sync="locationForm.has_wheelchair_access"
              :regular_opening_hours.sync="form.regular_opening_hours"
              :holiday_opening_hours.sync="form.holiday_opening_hours"
              @clear="form.$errors.clear($event)"
              @clear-location="locationForm.$errors.clear($event)"
            />

            <gov-section-break size="l" />

            <gov-button v-if="submitting" disabled type="submit">Creating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
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
  name: "CreateServiceLocation",
  components: { ServiceLocationForm },
  data() {
    return {
      location_type: null,
      form: new Form({
        service_id: null,
        location_id: null,
        name: "",
        regular_opening_hours: [],
        holiday_opening_hours: []
      }),
      locationForm: new Form({
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        city: "",
        county: "",
        postcode: "",
        country: "United Kingdom",
        accessibility_info: "",
        has_wheelchair_access: false,
        has_induction_loop: false
      }),
      service: null,
      loading: false,
      submitting: false
    };
  },
  methods: {
    async fetchService() {
      this.loading = true;
      const response = await http.get(
        `/services/${this.$route.params.service}`
      );
      this.service = response.data.data;
      this.form.service_id = this.service.id;
      this.loading = false;
    },
    async onSubmit() {
      try {
        this.submitting = true;

        // Post the location if new.
        if (this.location_type === "new") {
          const { data: location } = await this.locationForm.post("/locations");
          this.location_type = "existing";
          this.form.location_id = location.id;
        }

        // Post the service location.
        const { data: service } = await this.form.post("/service-locations");
        this.$router.push({
          name: "service-locations-show",
          params: { serviceLocation: service.id }
        });
      } catch (error) {
        this.submitting = false;
      }
    }
  },
  created() {
    this.fetchService();
  }
};
</script>
