<template>
  <div>
    <ck-radio-input
      :value="location_type"
      @input="onInput({ field: 'location_type', value: $event })"
      id="location_type"
      label="Select location"
      hint="You can select an existing location or create a new one."
      :options="locationTypes"
      :error="null"
    />

    <!-- Existing location: select from list -->
    <gov-inset-text v-if="location_type === 'existing'">
      <ck-loader v-if="loading" />
      <ck-select-input
        v-else
        :value="location_id"
        @input="onInput({ field: 'location_id', value: $event })"
        id="location_id"
        label="Location"
        :options="locations"
        :error="errors.get('location_id')"
      />
    </gov-inset-text>
    <!-- /Existing location: select from list -->

    <!-- New location: enter details -->
    <gov-inset-text v-else-if="location_type === 'new'">
      <location-form
        :errors="locationErrors"
        :address_line_1="locationForm.address_line_1"
        :address_line_2="locationForm.address_line_2"
        :address_line_3="locationForm.address_line_3"
        :city="locationForm.city"
        :county="locationForm.county"
        :postcode="locationForm.postcode"
        :country="locationForm.country"
        :has_induction_loop="locationForm.has_induction_loop"
        :has_wheelchair_access="locationForm.has_wheelchair_access"
        @update:address_line_1="onLocationInput({ field: 'address_line_1', value: $event })"
        @update:address_line_2="onLocationInput({ field: 'address_line_2', value: $event })"
        @update:address_line_3="onLocationInput({ field: 'address_line_3', value: $event })"
        @update:city="onLocationInput({ field: 'city', value: $event })"
        @update:county="onLocationInput({ field: 'county', value: $event })"
        @update:postcode="onLocationInput({ field: 'postcode', value: $event })"
        @update:country="onLocationInput({ field: 'country', value: $event })"
        @update:has_induction_loop="onLocationInput({ field: 'has_induction_loop', value: $event })"
        @update:has_wheelchair_access="onLocationInput({ field: 'has_wheelchair_access', value: $event })"
        @clear="$emit('clear-location', $event)"
      />
    </gov-inset-text>
    <!-- /New location: enter details -->

    <!-- Regular opening hours -->
    <gov-heading size="m">Opening hours</gov-heading>
    <gov-inset-text
      v-for="(regularOpeningHour, openingHourIndex) in regular_opening_hours"
      :key="regularOpeningHour.index"
    >
      <ck-select-input
        :value="regularOpeningHour.frequency"
        @input="alert('TODO')"
        :id="`regular_opening_hours.${index}.frequency`"
        label="Frequency type"
        :options="frequencies"
        :error="errors.get(`regular_opening_hours.${index}.frequency`)"
      />

      <ck-select-input
        :value="regularOpeningHour.weekday"
        @input="alert('TODO')"
        :id="`regular_opening_hours.${index}.weekday`"
        label="Weekday"
        :options="weekdays"
        :error="errors.get(`regular_opening_hours.${index}.weekday`)"
      />

      <ck-select-input
        :value="regularOpeningHour.day_of_month"
        @input="alert('TODO')"
        :id="`regular_opening_hours.${index}.day_of_month`"
        label="Day of month"
        :options="daysInMonth"
        :error="errors.get(`regular_opening_hours.${index}.day_of_month`)"
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
  </div>
</template>

<script>
import moment from "moment";
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
  name: "ServiceLocationForm",
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
    errors: {
      required: true,
      type: Object
    },
    locationErrors: {
      required: true,
      type: Object
    },
    location_type: {
      required: true
    },
    location_id: {
      required: true
    },
    name: {
      required: true,
      type: String
    },
    regular_opening_hours: {
      required: true,
      type: Array
    },
    holiday_opening_hours: {
      required: true,
      type: Array
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
      locationTypes: [
        { value: 'existing', label: 'Existing' },
        { value: 'new', label: 'New' }
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
      daysInMonth: [{ text: "Please select", value: null, disabled: true }]
    };
  },
  methods: {
    setDaysInMonth() {
      for (let day = 1; day <= 31; day++) {
      let text = moment({ year: 2018, month: 0, day }).format("Do");
      text = day > 28 ? `${text} (or last day of month)` : text;

      this.daysInMonth.push({ text, value: day });
    }
    },
    cloneRegularOpeningHours() {
      return this.regular_opening_hours.map(regularOpeningHour => ({...regularOpeningHour}));
    },
    cloneHolidayOpeningHours() {
      return this.holiday_opening_hours.map(holidayOpeningHour => ({...holidayOpeningHour}));
    },
    onInput({ field, value }) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
    onLocationInput({ field, value }) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear-location", field);
    },
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
    this.setDaysInMonth();
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
    location_type(newLocationType) {
      if (fnewLocationType === "new") {
        this.$emit("update:location_id", { index, value: null });
      }

      if (fnewLocationType === "existing") {
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
    },
    forms: {
      handler(newForms) {
        newForms.forEach((form, index) => {
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
