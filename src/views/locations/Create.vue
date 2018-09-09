<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Location" />

    <gov-back-link :to="{ name: 'locations-index' }">Back to locations</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Locations</gov-heading>
          <gov-heading size="m">Add location</gov-heading>
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

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import LocationForm from "@/views/locations/forms/LocationForm";

export default {
  name: "CreateLocation",
  components: { LocationForm },
  data() {
    return {
      form: new Form({
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
      })
    };
  },
  methods: {
    onSubmit() {
      this.form.post("/locations").then(({ data }) =>
        this.$router.push({
          name: "locations-show",
          params: { location: data.id }
        })
      );
    }
  }
};
</script>
