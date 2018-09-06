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
            <frequency-input
              :form="form"
              :path="`regular_opening_hours.${openingHourIndex}.frequency`"
              :value="form.regular_opening_hours[openingHourIndex].frequency"
              @input="$emit('update:regular_opening_hours_frequency', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <weekday-input
              v-if="
                form.regular_opening_hours[openingHourIndex].frequency === 'weekly' ||
                form.regular_opening_hours[openingHourIndex].frequency === 'nth_occurrence_of_month'
              "
              :form="form"
              :path="`regular_opening_hours.${openingHourIndex}.weekday`"
              :value="form.regular_opening_hours[openingHourIndex].weekday"
              @input="$emit('update:regular_opening_hours_weekday', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <day-of-month-input
              v-if="form.regular_opening_hours[openingHourIndex].frequency === 'monthly'"
              :form="form"
              :path="`regular_opening_hours.${openingHourIndex}.day_of_month`"
              :value="form.regular_opening_hours[openingHourIndex].day_of_month"
              @input="$emit('update:regular_opening_hours_day_of_month', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <occurrence-of-month-input
              v-if="form.regular_opening_hours[openingHourIndex].frequency === 'nth_occurrence_of_month'"
              :form="form"
              :path="`regular_opening_hours.${openingHourIndex}.occurrence_of_month`"
              :value="form.regular_opening_hours[openingHourIndex].occurrence_of_month"
              @input="$emit('update:regular_opening_hours_occurrence_of_month', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <date-input
              v-if="form.regular_opening_hours[openingHourIndex].frequency === 'fortnightly'"
              :form="form"
              :path="`regular_opening_hours.${openingHourIndex}.occurrence_of_month`"
              label="Starting date"
              :value="form.regular_opening_hours[openingHourIndex].starts_at"
              @input="$emit('update:regular_opening_hours_starts_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <time-period-input
              :form="form"
              :opens-at="form.regular_opening_hours[openingHourIndex].opens_at"
              :closes-at="form.regular_opening_hours[openingHourIndex].closes_at"
              :opens-at-path="`regular_opening_hours.${openingHourIndex}.opens_at`"
              :closes-at-path="`regular_opening_hours.${openingHourIndex}.closes_at`"
              @update:opens_at="$emit('update:regular_opening_hours_opens_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
              @update:closes_at="$emit('update:regular_opening_hours_closes_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

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
            <is-closed-input
              :form="form"
              :path="`holiday_opening_hours.${openingHourIndex}.is_closed`"
              :value="form.holiday_opening_hours[openingHourIndex].is_closed"
              @input="$emit('update:holiday_opening_hours_is_closed', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <date-input
              :form="form"
              :path="`holiday_opening_hours.${openingHourIndex}.starts_at`"
              label="Starting date"
              :value="form.holiday_opening_hours[openingHourIndex].starts_at"
              @input="$emit('update:holiday_opening_hours_starts_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <date-input
              :form="form"
              :path="`holiday_opening_hours.${openingHourIndex}.ends_at`"
              label="Ending date"
              :value="form.holiday_opening_hours[openingHourIndex].ends_at"
              @input="$emit('update:holiday_opening_hours_ends_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

            <time-period-input
              v-if="!form.holiday_opening_hours[openingHourIndex].is_closed"
              :form="form"
              :opens-at="form.holiday_opening_hours[openingHourIndex].opens_at"
              :closes-at="form.holiday_opening_hours[openingHourIndex].closes_at"
              :opens-at-path="`holiday_opening_hours.${openingHourIndex}.opens_at`"
              :closes-at-path="`holiday_opening_hours.${openingHourIndex}.closes_at`"
              @update:opens_at="$emit('update:holiday_opening_hours_opens_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
              @update:closes_at="$emit('update:holiday_opening_hours_closes_at', { serviceLocationIndex: index, openingHourIndex, value: $event })"
            />

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
import DateInput from "@/views/services/create/inputs/DateInput";
import OccurrenceOfMonthInput from "@/views/services/create/inputs/OccurrenceOfMonthInput";
import DayOfMonthInput from "@/views/services/create/inputs/DayOfMonthInput";
import WeekdayInput from "@/views/services/create/inputs/WeekdayInput";
import FrequencyInput from "@/views/services/create/inputs/FrequencyInput";
import TimePeriodInput from "@/views/services/create/inputs/TimePeriodInput";
import IsClosedInput from "@/views/services/create/inputs/IsClosedInput";

export default {
  name: "LocationTab",
  components: {
    DateInput,
    OccurrenceOfMonthInput,
    DayOfMonthInput,
    WeekdayInput,
    FrequencyInput,
    TimePeriodInput,
    IsClosedInput
  },
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
      ]
    };
  },
  methods: {
    async fetchLocations() {
      this.loading = true;
      this.locations = await this.fetchAll("/locations");
      this.locations = this.locations.map(location => {
        return {
          text: `${location.address_line_1}, ${location.city}, ${
            location.postcode
          }`,
          value: location.id
        };
      });
      this.locations.unshift({
        text: "Please select",
        value: null,
        disabled: true
      });
      this.loading = false;
    },
    onAdd() {
      this.$emit(
        "add",
        new Form({
          id: null,
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
        })
      );

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
          is_closed: false,
          starts_at: "",
          ends_at: "",
          opens_at: null,
          closes_at: null,
          index: this.index
        }
      });

      this.index++;
    }
  },
  created() {
    this.fetchLocations();
    this.$root.$on("location-created", location => {
      this.locations.push({
        text: `${location.address_line_1}, ${location.city}, ${
          location.postcode
        }`,
        value: location.id
      });
    });
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

          form.regular_opening_hours.forEach(regularOpeningHour => {
            switch (regularOpeningHour.frequency) {
              case "weekly":
                regularOpeningHour.day_of_month = null;
                regularOpeningHour.occurrence_of_month = null;
                regularOpeningHour.starts_at = null;
                break;
              case "monthly":
                regularOpeningHour.weekday = null;
                regularOpeningHour.occurrence_of_month = null;
                regularOpeningHour.starts_at = null;
                break;
              case "fortnightly":
                regularOpeningHour.weekday = null;
                regularOpeningHour.day_of_month = null;
                regularOpeningHour.occurrence_of_month = null;
                break;
              case "nth_occurrence_of_month":
                regularOpeningHour.day_of_month = null;
                regularOpeningHour.starts_at = null;
                break;
            }
          });

          form.holiday_opening_hours.forEach(holidayOpeningHour => {
            if (holidayOpeningHour.is_closed) {
              holidayOpeningHour.opens_at = "00:00:00";
              holidayOpeningHour.closes_at = "00:00:00";
            }
          });
        });
      },
      deep: true
    }
  }
};
</script>
