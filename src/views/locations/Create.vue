<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'locations-index' }">Back to locations</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Locations</gov-heading>
          <gov-heading size="m">Add location</gov-heading>
          <gov-body>The locations will appear on the service pages which will inform people of where to find your service/organisation</gov-body>
          <gov-form-group :invalid="form.$errors.has('address_line_1')">
            <gov-label for="address_line_1" class="govuk-!-font-weight-bold">Address Line 1</gov-label>
            <gov-input
              v-model="form.address_line_1"
              @input="form.$errors.clear('address_line_1')"
              id="address_line_1"
              name="address_line_1"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('address_line_1')"
              v-text="form.$errors.get('address_line_1')"
              for="address_line_1"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('address_line_2')">
            <gov-label for="address_line_1" class="govuk-!-font-weight-bold">Address Line 2</gov-label>
            <gov-input
              v-model="form.address_line_2"
              @input="form.$errors.clear('address_line_2')"
              id="address_line_2"
              name="address_line_2"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('address_line_2')"
              v-text="form.$errors.get('address_line_2')"
              for="address_line_2"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('address_line_3')">
            <gov-label for="address_line_3" class="govuk-!-font-weight-bold">Address Line 3</gov-label>
            <gov-input
              v-model="form.address_line_3"
              @input="form.$errors.clear('address_line_3')"
              id="address_line_3"
              name="address_line_3"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('address_line_3')"
              v-text="form.$errors.get('address_line_3')"
              for="address_line_3"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('city')">
            <gov-label for="city" class="govuk-!-font-weight-bold">City</gov-label>
            <gov-input
              v-model="form.city"
              @input="form.$errors.clear('city')"
              id="city"
              name="city"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('city')"
              v-text="form.$errors.get('city')"
              for="city"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('county')">
            <gov-label for="county" class="govuk-!-font-weight-bold">County</gov-label>
            <gov-input
              v-model="form.county"
              @input="form.$errors.clear('county')"
              id="county"
              name="county"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('county')"
              v-text="form.$errors.get('county')"
              for="county"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('postcode')">
            <gov-label for="postcode" class="govuk-!-font-weight-bold">Postcode</gov-label>
            <gov-input
              v-model="form.postcode"
              @input="form.$errors.clear('postcode')"
              id="postcode"
              name="postcode"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('postcode')"
              v-text="form.$errors.get('postcode')"
              for="postcode"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('country')">
            <gov-label for="country" class="govuk-!-font-weight-bold">Country</gov-label>
            <gov-select
              v-model="form.country"
              @input="form.$errors.clear('country')"
              id="country"
              name="country"
              :options="countries"
            />
            <gov-error-message
              v-if="form.$errors.has('country')"
              v-text="form.$errors.get('country')"
              for="country"
            />
          </gov-form-group>
          <gov-section-break size="l" />
          <gov-form-group :invalid="form.$errors.has('has_induction_loop') || form.$errors.has('has_wheelchair_access')">
            <gov-fieldset-legend size="xl">
              <gov-heading size="m">Accessibility information</gov-heading>
            </gov-fieldset-legend>
            <gov-body>Select which accessibility requirements the building meets</gov-body>
            <gov-checkboxes>
              <gov-checkbox
                v-model="form.has_induction_loop"
                @input="form.$errors.clear('has_induction_loop')"
                id="has_induction_loop"
                name="has_induction_loop"
                label="Induction loop"
              />
              <gov-error-message
                v-if="form.$errors.has('has_induction_loop')"
                v-text="form.$errors.get('has_induction_loop')"
                for="has_induction_loop"
              />
              <gov-checkbox
                v-model="form.has_wheelchair_access"
                @input="form.$errors.clear('has_wheelchair_access')"
                id="has_wheelchair_access"
                name="has_wheelchair_access"
                label="Wheelchair accessible"
              />
              <gov-error-message
                v-if="form.$errors.has('has_wheelchair_access')"
                v-text="form.$errors.get('has_wheelchair_access')"
                for="has_wheelchair_access"
              />
            </gov-checkboxes>
          </gov-form-group>
          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import countries from "@/storage/countries";

export default {
  name: "CreateLocation",
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
      }),
      countries
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
