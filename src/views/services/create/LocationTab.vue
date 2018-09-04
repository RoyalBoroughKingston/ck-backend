<template>
  <div>
    <gov-heading size="l">Location of the service</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          If this service operates from multiple locations, please add each individually
          by filling in the location below and then select "Add another location".
        </gov-body>

        <gov-section-break size="l" />

        <div v-for="(form, index) in forms" :key="form.index">
          <gov-form-group :invalid="false"> <!-- TODO: Check all the errors -->
            <gov-radios>
              <gov-label class="govuk-!-font-weight-bold" :for="`service_location.${index}.location_type`">
                Select location
              </gov-label>
              <gov-hint :for="`service_location.${index}.location_type`">
                You can select an existing location or create a new one.
              </gov-hint>
              <gov-radio
                :bind-to="form.location_type"
                @input="$emit('update:location_type', { index, value: $event })"
                :id="`service_location.${index}.location_type_existing`"
                name="location_type"
                label="Existing"
                value="existing"
              />
              <gov-radio
                :bind-to="form.location_type"
                @input="$emit('update:location_type', { index, value: $event })"
                :id="`service_location.${index}.location_type_new`"
                name="location_type"
                label="New"
                value="new"
              />
            </gov-radios>
          </gov-form-group>

          <!-- Existing location: select from list -->
          <gov-inset-text v-if="form.location_type === 'existing'">
            <gov-label
              :for="`service_location.${index}.location_id`"
              class="govuk-!-font-weight-bold"
            >
              Location
            </gov-label>

            <ck-loader v-if="loading" />
            <gov-select
              v-else
              :value="form.location_id"
              @input="$emit('update:location_id', { index, value: $event })"
              :id="`service_location.${index}.location_id`"
              name="location_id"
              :options="locations"
            />
            <gov-error-message
              v-if="form.$errors.has('location_id')"
              v-text="form.$errors.get('location_id')"
              :for="`service_location.${index}.location_id`"
            />
          </gov-inset-text>
          <!-- /Existing location: select from list -->

          <!-- New location: etner details -->
          <gov-inset-text v-else-if="form.location_type === 'new'">
            <!-- Address line 1 -->
            <gov-form-group :invalid="form.location.$errors.has('address_line_1')">
              <gov-label
                :for="`location.${form.index}.address_line_1`"
                class="govuk-!-font-weight-bold"
              >
                Address Line 1
              </gov-label>
              <gov-input
                :value="form.location.address_line_1"
                @input="$emit('update:address_line_1', { index, value: $event })"
                :id="`location.${form.index}.address_line_1`"
                name="address_line_1"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('address_line_1')"
                v-text="form.location.$errors.get('address_line_1')"
                :for="`location.${form.index}.address_line_1`"
              />
            </gov-form-group>
            <!-- /Address line 1 -->

            <!-- Address line 2 -->
            <gov-form-group :invalid="form.location.$errors.has('address_line_2')">
              <gov-label
                :for="`location.${form.index}.address_line_2`"
                class="govuk-!-font-weight-bold"
              >
                Address Line 2
              </gov-label>
              <gov-input
                :value="form.location.address_line_2"
                @input="$emit('update:address_line_2', { index, value: $event })"
                :id="`location.${form.index}.address_line_2`"
                name="address_line_2"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('address_line_2')"
                v-text="form.location.$errors.get('address_line_2')"
                :for="`location.${form.index}.address_line_2`"
              />
            </gov-form-group>
            <!-- /Address line 2 -->

            <!-- Address line 3 -->
            <gov-form-group :invalid="form.location.$errors.has('address_line_3')">
              <gov-label
                :for="`location.${form.index}.address_line_3`"
                class="govuk-!-font-weight-bold"
              >
                Address Line 3
              </gov-label>
              <gov-input
                :value="form.location.address_line_3"
                @input="$emit('update:address_line_3', { index, value: $event })"
                :id="`location.${form.index}.address_line_3`"
                name="address_line_3"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('address_line_3')"
                v-text="form.location.$errors.get('address_line_3')"
                :for="`location.${form.index}.address_line_3`"
              />
            </gov-form-group>
            <!-- /Address line 3 -->

            <!-- City -->
            <gov-form-group :invalid="form.location.$errors.has('city')">
              <gov-label
                :for="`location.${form.index}.city`"
                class="govuk-!-font-weight-bold"
              >
                City
              </gov-label>
              <gov-input
                :value="form.location.city"
                @input="$emit('update:city', { index, value: $event })"
                :id="`location.${form.index}.city`"
                name="city"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('city')"
                v-text="form.location.$errors.get('city')"
                for="city"
              />
            </gov-form-group>
            <!-- /City -->

            <!-- County -->
            <gov-form-group :invalid="form.location.$errors.has('county')">
              <gov-label
                :for="`location.${form.index}.county`"
                class="govuk-!-font-weight-bold"
              >
                County
              </gov-label>
              <gov-input
                :value="form.location.county"
                @input="$emit('update:county', { index, value: $event })"
                :id="`location.${form.index}.county`"
                name="county"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('county')"
                v-text="form.location.$errors.get('county')"
                for="county"
              />
            </gov-form-group>
            <!-- /County -->

            <!-- Postcode -->
            <gov-form-group :invalid="form.location.$errors.has('postcode')">
              <gov-label
                :for="`location.${form.index}.postcode`"
                class="govuk-!-font-weight-bold"
              >
                Postcode
              </gov-label>
              <gov-input
                :value="form.location.postcode"
                @input="$emit('update:postcode', { index, value: $event })"
                :id="`location.${form.index}.postcode`"
                name="postcode"
                type="text"
              />
              <gov-error-message
                v-if="form.location.$errors.has('postcode')"
                v-text="form.location.$errors.get('postcode')"
                for="postcode"
              />
            </gov-form-group>
            <!-- /Postcode -->

            <!-- Country -->
            <gov-form-group :invalid="form.location.$errors.has('country')">
              <gov-label
                :for="`location.${form.index}.country`"
                class="govuk-!-font-weight-bold"
              >
                Country
              </gov-label>
              <gov-select
                :value="form.location.country"
                @input="$emit('update:country', { index, value: $event })"
                :id="`location.${form.index}.country`"
                name="country"
                :options="countries"
              />
              <gov-error-message
                v-if="form.location.$errors.has('country')"
                v-text="form.location.$errors.get('country')"
                for="country"
              />
            </gov-form-group>
            <!-- /Country -->

            <gov-section-break size="l" />

            <!-- Accessibility -->
            <gov-form-group :invalid="form.location.$errors.has('has_induction_loop') || form.location.$errors.has('has_wheelchair_access')">
              <gov-fieldset-legend size="xl">
                <gov-heading size="m">Accessibility information</gov-heading>
              </gov-fieldset-legend>
              <gov-body>Select which accessibility requirements the building meets</gov-body>
              <gov-checkboxes>
                <gov-checkbox
                  :value="form.location.has_induction_loop"
                  @input="$emit('update:has_induction_loop', { index, value: $event })"
                  :id="`location.${form.index}.has_induction_loop`"
                  name="has_induction_loop"
                  label="Induction loop"
                />
                <gov-error-message
                  v-if="form.location.$errors.has('has_induction_loop')"
                  v-text="form.location.$errors.get('has_induction_loop')"
                  :for="`location.${form.index}.has_induction_loop`"
                />
                <gov-checkbox
                  :value="form.location.has_wheelchair_access"
                  @input="$emit('update:has_wheelchair_access', { index, value: $event })"
                  :id="`location.${form.index}.has_wheelchair_access`"
                  name="has_wheelchair_access"
                  label="Wheelchair accessible"
                />
                <gov-error-message
                  v-if="form.location.$errors.has('has_wheelchair_access')"
                  v-text="form.location.$errors.get('has_wheelchair_access')"
                  :for="`location.${form.index}.has_wheelchair_access`"
                />
              </gov-checkboxes>
            </gov-form-group>
            <!-- /Accessibility -->
          </gov-inset-text>
          <!-- /New location: etner details -->

          <!-- Regular opening hours -->
          <gov-heading size="m">Opening hours</gov-heading>
          <gov-inset-text
            v-for="(regularOpeningHour, openingHourIndex) in form.regular_opening_hours"
            :key="regularOpeningHour.index"
          >
            <!-- Frequency -->
            <gov-form-group :invalid="form.$errors.has(`regular_opening_hours.${openingHourIndex}.frequency`)">
              <gov-label :for="`regular_opening_hours.${openingHourIndex}.frequency`">
                Frequency type
              </gov-label>
              <gov-select
                :value="form.regular_opening_hours[openingHourIndex].frequency"
                @input="$emit('update:regular_opening_hours_frequency', { serviceLocationIndex: index, openingHourIndex, value: $event })"
                :id="`regular_opening_hours.${openingHourIndex}.frequency`"
                :name="`regular_opening_hours.${openingHourIndex}.frequency`"
                :options="frequencies"
              />
              <gov-error-message
                v-if="form.$errors.has(`regular_opening_hours.${openingHourIndex}.frequency`)"
                v-text="form.$errors.get(`regular_opening_hours.${openingHourIndex}.frequency`)"
                :for="`regular_opening_hours.${openingHourIndex}.frequency`"
              />
            </gov-form-group>
            <!-- /Frequency -->

            <!-- Weekday -->
            <gov-form-group
              v-if="
                form.regular_opening_hours[openingHourIndex].frequency === 'weekly' ||
                form.regular_opening_hours[openingHourIndex].frequency === 'nth_occurrence_of_month'
              "
              :invalid="form.$errors.has(`regular_opening_hours.${openingHourIndex}.weekday`)"
            >
              <gov-label :for="`regular_opening_hours.${openingHourIndex}.weekday`">
                Weekday
              </gov-label>
              <gov-select
                :value="form.regular_opening_hours[openingHourIndex].weekday"
                @input="$emit('update:regular_opening_hours_weekday', { serviceLocationIndex: index, openingHourIndex, value: $event })"
                :id="`regular_opening_hours.${openingHourIndex}.weekday`"
                :name="`regular_opening_hours.${openingHourIndex}.weekday`"
                :options="weekdays"
              />
              <gov-error-message
                v-if="form.$errors.has(`regular_opening_hours.${openingHourIndex}.weekday`)"
                v-text="form.$errors.get(`regular_opening_hours.${openingHourIndex}.weekday`)"
                :for="`regular_opening_hours.${openingHourIndex}.weekday`"
              />
            </gov-form-group>
            <!-- /Weekday -->

            <!-- Day of month -->
            <gov-form-group
              v-if="form.regular_opening_hours[openingHourIndex].frequency === 'monthly'"
              :invalid="form.$errors.has(`regular_opening_hours.${openingHourIndex}.day_of_month`)"
            >
              <gov-label :for="`regular_opening_hours.${openingHourIndex}.day_of_month`">
                Day of month
              </gov-label>
              <gov-select
                :value="form.regular_opening_hours[openingHourIndex].day_of_month"
                @input="$emit('update:regular_opening_hours_day_of_month', { serviceLocationIndex: index, openingHourIndex, value: $event })"
                :id="`regular_opening_hours.${openingHourIndex}.day_of_month`"
                :name="`regular_opening_hours.${openingHourIndex}.day_of_month`"
                :options="days"
              />
              <gov-error-message
                v-if="form.$errors.has(`regular_opening_hours.${openingHourIndex}.day_of_month`)"
                v-text="form.$errors.get(`regular_opening_hours.${openingHourIndex}.day_of_month`)"
                :for="`regular_opening_hours.${openingHourIndex}.day_of_month`"
              />
            </gov-form-group>
            <!-- /Day of month -->

            <!-- Time period -->
            <gov-form-group :invalid="false"> <!-- TODO -->
              <gov-label>Opening time</gov-label>
              <gov-select
                :value="form.regular_opening_hours[openingHourIndex].opens_at"
                @input="$emit('update:regular_opening_hours_opens_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
                :id="`regular_opening_hours.${openingHourIndex}.opens_at`"
                :name="`regular_opening_hours.${openingHourIndex}.opens_at`"
                :options="hours"
                class="govuk-!-width-one-quarter"
              />&nbsp;<!--
           --><gov-select
                :value="form.regular_opening_hours[openingHourIndex].closes_at"
                @input="$emit('update:regular_opening_hours_closes_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
                :id="`regular_opening_hours.${openingHourIndex}.closes_at`"
                :name="`regular_opening_hours.${openingHourIndex}.closes_at`"
                :options="hours"
                class="govuk-!-width-one-quarter"
              />
              <gov-error-message
                v-if="form.$errors.has(`regular_opening_hours.${openingHourIndex}.opens_at`)"
                v-text="form.$errors.get(`regular_opening_hours.${openingHourIndex}.opens_at`)"
                :for="`regular_opening_hours.${openingHourIndex}.opens_at`"
              /> <!-- TODO: Add closes_at -->
            </gov-form-group>
            <!-- /Time period -->

            <gov-button @click="$emit('delete-regular-opening-hour', { serviceLocationIndex: index, openingHourIndex })" error>Delete day</gov-button>
          </gov-inset-text>
          <gov-button @click="onAddRegularOpeningHour(index)">
            <template v-if="form.regular_opening_hours.length === 0">Add day</template>
            <template v-else>Add another day</template>
          </gov-button>
          <!-- /Regular opening hours -->

          <!-- Holiday opening hours -->
          <gov-heading size="m">Holiday times</gov-heading>
          <gov-inset-text
            v-for="(holidayOpeningHour, openingHourIndex) in form.holiday_opening_hours"
            :key="holidayOpeningHour.index"
          >
            <p>{{ openingHourIndex }}</p>

            <gov-button @click="$emit('delete-holiday-opening-hour', { serviceLocationIndex: index, openingHourIndex })" error>Delete holiday times</gov-button>
          </gov-inset-text>
          <gov-button @click="onAddHolidayOpeningHour(index)">
            <template v-if="form.holiday_opening_hours.length === 0">Add holiday times</template>
            <template v-else>Add more holiday times</template>
          </gov-button>
          <!-- /Holiday opening hours -->

          <div>
            <gov-button @click="$emit('delete', index)" error>Delete location</gov-button>
          </div>

          <gov-section-break v-if="index < (forms.length - 1)" size="l" visible />
        </div>

        <div>
          <gov-button @click="onAdd">
            <template v-if="forms.length === 0">Add location</template>
            <template v-else>Add another location</template>
          </gov-button>
        </div>

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import Form from "@/classes/Form";
import countries from "@/storage/countries";
import moment from "moment";

export default {
  name: "LocationTab",
  props: {
    forms: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      locations: [],
      index: 1,
      countries: [
        { text: "Please select", value: null, disabled: true },
        ...countries
      ],
      frequencies: [
        { text: "Please select", value: null, disabled: true },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
        { text: "Fortnightly", value: "fortnightly" },
        { text: "Nth occurrence of month", value: "nth_occurrence_of_month" }
      ],
      weekdays: [
        { text: "Please select", value: null, disabled: true },
        { text: "Monday", value: 1 },
        { text: "Tuesday", value: 2 },
        { text: "Wednesday", value: 3 },
        { text: "Thirsday", value: 4 },
        { text: "Friday", value: 5 },
        { text: "Saturday", value: 6 },
        { text: "Sunday", value: 7 }
      ],
      weekdays: [
        { text: "Please select", value: null, disabled: true },
        { text: "Monday", value: 1 },
        { text: "Tuesday", value: 2 },
        { text: "Wednesday", value: 3 },
        { text: "Thursday", value: 4 },
        { text: "Friday", value: 5 },
        { text: "Saturday", value: 6 },
        { text: "Sunday", value: 7 }
      ],
      occurences: [
        { text: "Please select", value: null, disabled: true },
        { text: "First", value: 1 },
        { text: "Second", value: 2 },
        { text: "Third", value: 3 },
        { text: "Fourth", value: 4 },
        { text: "Last", value: 5 }
      ],
      days: [
        { text: "Please select", value: null, disabled: true }
      ],
      hours: [
        { text: "--:--", value: null, disabled: true }
      ]
    };
  },
  methods: {
    async fetchLocations() {
      this.loading = true;
      this.locations = await this.fetchAll("/locations");
      this.locations = this.locations.map(location => {
        return {
          text: `${location.address_line_1}, ${location.postcode}`,
          value: location.id
        };
      });
      this.locations.unshift({ text: "Please select", value: null, disabled: true });
      this.loading = false;
    },
    onAdd() {
      this.$emit("add", new Form({
        service_id: null,
        location_id: null,
        name: "",
        regular_opening_hours: [],
        holiday_opening_hours: [],
        location: new Form({
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
        location_type: null,
        index: this.index
      }));

      this.index++;
    },
    onAddRegularOpeningHour(index) {
      this.$emit("add-regular-opening-hour", {
        index,
        value: {
          frequency: null,
          weekday: null,
          day_of_month: null,
          occurrence_of_month: null,
          starts_at: "",
          opens_at: null,
          closes_at: null,
          index: this.index
        }
      });

      this.index++;
    },
    onAddHolidayOpeningHour(index) {
      this.$emit("add-holiday-opening-hour", {
        index,
        value: {
          is_closed: null,
          starts_at: "",
          ends_at: "",
          opens_at: null,
          closes_at: null,
          index: this.index
        }
      });

      this.index++;
    },
    setDays() {
      for (let day = 1; day <= 31; day++) {
        let text = moment({ year: 2018, month: 0, day }).format("Do");
        text = (day > 28) ? (`${text} (or last day of month)`) : text;

        this.days.push({ text, value: day });
      }
    },
    setHours() {
      for (let hour = 0; hour < 24; hour += 0.5) {
        const text = ("0" + Math.floor(hour) % 24).slice(-2) + ":" + ((hour % 1)*60 + "0").slice(0, 2);
        const value = `${text}:00`;
        this.hours.push({ text, value });
      }
      this.hours.push({ text: "24:00", value: "23:59:59" });
    }
  },
  created() {
    this.fetchLocations();
    this.setDays();
    this.setHours();
  },
  watch: {
    forms: {
      handler(newForms) {
        newForms.forEach((form, index) => {
          if (form.location_type === "new") {
            this.$emit("update:location_id", { index, value: null });
          }

          if (form.location_type === "existing") {
            this.$emit("update:address_line_1", { index, value: "" });
            this.$emit("update:address_line_2", { index, value: "" });
            this.$emit("update:address_line_3", { index, value: "" });
            this.$emit("update:city", { index, value: "" });
            this.$emit("update:county", { index, value: "" });
            this.$emit("update:postcode", { index, value: "" });
            this.$emit("update:country", { index, value: "United Kingdom" });
            this.$emit("update:has_wheelchair_access", { index, value: false });
            this.$emit("update:has_induction_loop", { index, value: false });
          }
        });
      },
      deep: true
    }
  }
};
</script>
