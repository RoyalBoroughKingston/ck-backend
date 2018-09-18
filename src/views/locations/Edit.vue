<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Edit Location: ${location.address_line_1}`" />

      <gov-back-link :to="{ name: 'locations-show', params: { location: location.id } }">Back to location</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Locations</gov-heading>
            <gov-heading size="m">Edit location</gov-heading>
            <gov-body>The locations will appear on the service pages which will inform people of where to find your service/organisation</gov-body>

            <location-form
              :errors="form.$errors"
              :address_line_1.sync="form.address_line_1"
              :address_line_2.sync="form.address_line_2"
              :address_line_3.sync="form.address_line_3"
              :city.sync="form.city"
              :county.sync="form.county"
              :postcode.sync="form.postcode"
              :country.sync="form.country"
              :has_induction_loop.sync="form.has_induction_loop"
              :has_wheelchair_access.sync="form.has_wheelchair_access"
              @clear="form.$errors.clear($event)"
            />

            <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";
import LocationForm from "@/views/locations/forms/LocationForm";

export default {
  name: "EditLocation",
  components: { LocationForm },
  data() {
    return {
      loading: false,
      location: null,
      form: null
    };
  },
  methods: {
    async fetchLocation() {
      this.loading = true;

      const response = await http.get(
        `/locations/${this.$route.params.location}`
      );
      this.location = response.data.data;
      this.form = new Form({
        address_line_1: this.location.address_line_1,
        address_line_2: this.location.address_line_2 || "",
        address_line_3: this.location.address_line_3 || "",
        city: this.location.city,
        county: this.location.county,
        postcode: this.location.postcode,
        country: this.location.country,
        accessibility_info: this.location.accessibility_info || "",
        has_wheelchair_access: this.location.has_wheelchair_access,
        has_induction_loop: this.location.has_induction_loop
      });

      this.loading = false;
    },
    onSubmit() {
      this.form.put(`/locations/${this.location.id}`).then(() =>
        this.$router.push({
          name: "locations-updated",
          params: { location: this.location.id }
        })
      );
    }
  },
  created() {
    this.fetchLocation();
  }
};
</script>
