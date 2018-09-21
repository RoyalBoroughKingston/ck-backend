<template>
  <div>
    <ck-text-input
      :value="name"
      @input="onInput({ field: 'name', value: $event })"
      id="name"
      label="Name of location"
      type="text"
      :error="errors.get('name')"
    />

    <template v-if="isCreateForm">
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
          :address_line_1="address_line_1"
          :address_line_2="address_line_2"
          :address_line_3="address_line_3"
          :city="city"
          :county="county"
          :postcode="postcode"
          :country="country"
          :has_induction_loop="has_induction_loop"
          :has_wheelchair_access="has_wheelchair_access"
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
    </template>

    <!-- Regular opening hours -->
    <gov-heading size="m">Opening hours</gov-heading>
    <gov-inset-text
      v-for="(regularOpeningHour, index) in regular_opening_hours"
      :key="regularOpeningHour.index"
    >
      <ck-select-input
        :value="regularOpeningHour.frequency"
        @input="onRegularOpeningHourInput({ index, field: 'frequency', value: $event })"
        :id="`regular_opening_hours.${index}.frequency`"
        label="Frequency type"
        :options="frequencies"
        :error="errors.get(`regular_opening_hours.${index}.frequency`)"
      />

      <ck-select-input
        v-if="['weekly', 'nth_occurrence_of_month'].includes(regularOpeningHour.frequency)"
        :value="regularOpeningHour.weekday"
        @input="onRegularOpeningHourInput({ index, field: 'weekday', value: $event })"
        :id="`regular_opening_hours.${index}.weekday`"
        label="Weekday"
        :options="weekdays"
        :error="errors.get(`regular_opening_hours.${index}.weekday`)"
      />

      <ck-select-input
        v-if="regularOpeningHour.frequency === 'monthly'"
        :value="regularOpeningHour.day_of_month"
        @input="onRegularOpeningHourInput({ index, field: 'day_of_month', value: $event })"
        :id="`regular_opening_hours.${index}.day_of_month`"
        label="Day of month"
        :options="daysInMonth"
        :error="errors.get(`regular_opening_hours.${index}.day_of_month`)"
      />

      <ck-select-input
        v-if="regularOpeningHour.frequency === 'nth_occurrence_of_month'"
        :value="regularOpeningHour.occurrence_of_month"
        @input="onRegularOpeningHourInput({ index, field: 'occurrence_of_month', value: $event })"
        :id="`regular_opening_hours.${index}.occurrence_of_month`"
        label="Occurrence in month"
        :options="occurrences"
        :error="errors.get(`regular_opening_hours.${index}.occurrence_of_month`)"
      />

      <date-input
        v-if="regularOpeningHour.frequency === 'fortnightly'"
        :value="regularOpeningHour.starts_at"
        @input="onRegularOpeningHourInput({ index, field: 'fortnightly', value: $event })"
        :id="`regular_opening_hours.${index}.starts_at`"
        label="Starting date"
        :error="errors.get(`regular_opening_hours.${index}.starts_at`)"
      />

      <time-period-input
        :id="`regular_opening_hours.${index}`"
        :opens_at="regularOpeningHour.opens_at"
        :closes_at="regularOpeningHour.closes_at"
        @update:opens_at="onRegularOpeningHourInput({ index, field: 'opens_at', value: $event })"
        @update:closes_at="onRegularOpeningHourInput({ index, field: 'closes_at', value: $event })"
        :error="errors.get([`regular_opening_hours.${index}.opens_at`, `regular_opening_hours.${index}.closes_at`])"
      />

      <gov-button @click="onDeleteRegularOpeningHour(index)" error>Delete day</gov-button>
    </gov-inset-text>
    <gov-button @click="onAddRegularOpeningHour(index)">
      <template v-if="regular_opening_hours.length === 0">Add day</template>
      <template v-else>Add another day</template>
    </gov-button>
    <!-- /Regular opening hours -->

    <!-- Holiday opening hours -->
    <gov-heading size="m">Holiday times</gov-heading>
    <gov-inset-text
      v-for="(holidayOpeningHour, index) in holiday_opening_hours"
      :key="holidayOpeningHour.index"
    >
      <is-closed-input
        :value="holidayOpeningHour.is_closed"
        @input="onHolidayOpeningHourInput({ index, field: 'is_closed', value: $event })"
        :id="`holiday_opening_hours.${index}.is_closed`"
        :error="errors.get(`holiday_opening_hours.${index}.is_closed`)"
      />

      <date-input
        :value="holidayOpeningHour.starts_at"
        @input="onHolidayOpeningHourInput({ index, field: 'starts_at', value: $event })"
        :id="`holiday_opening_hours.${index}.starts_at`"
        label="Starting date"
        :error="errors.get(`holiday_opening_hours.${index}.starts_at`)"
      />

      <date-input
        :value="holidayOpeningHour.ends_at"
        @input="onHolidayOpeningHourInput({ index, field: 'ends_at', value: $event })"
        :id="`holiday_opening_hours.${index}.ends_at`"
        label="Ending date"
        :error="errors.get(`holiday_opening_hours.${index}.ends_at`)"
      />

      <time-period-input
        v-if="holidayOpeningHour.is_closed === false"
        :id="`holiday_opening_hours.${index}`"
        :opens_at="holidayOpeningHour.opens_at"
        :closes_at="holidayOpeningHour.closes_at"
        @update:opens_at="onHolidayOpeningHourInput({ index, field: 'opens_at', value: $event })"
        @update:closes_at="onHolidayOpeningHourInput({ index, field: 'closes_at', value: $event })"
        :error="errors.get([`holiday_opening_hours.${index}.opens_at`, `holiday_opening_hours.${index}.closes_at`])"
      />

      <gov-button @click="onDeleteHolidayOpeningHour(index)" error>Delete holiday times</gov-button>
    </gov-inset-text>

    <gov-button @click="onAddHolidayOpeningHour(index)">
      <template v-if="holiday_opening_hours.length === 0">Add holiday times</template>
      <template v-else>Add more holiday times</template>
    </gov-button>
    <!-- /Holiday opening hours -->
  </div>
</template>

<script>
import moment from "moment";
import countries from "@/storage/countries";
import DateInput from "@/views/services/inputs/DateInput";
import TimePeriodInput from "@/views/services/inputs/TimePeriodInput";
import IsClosedInput from "@/views/services/inputs/IsClosedInput";
import LocationForm from "@/views/locations/forms/LocationForm";

export default {
  name: "ServiceLocationForm",
  components: {
    LocationForm,
    DateInput,
    TimePeriodInput,
    IsClosedInput
  },
  props: {
    errors: {
      required: true,
      type: Object
    },
    locationErrors: {
      required: false,
      type: Object
    },
    location_type: {
      required: false
    },
    location_id: {
      required: false
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
    },
    address_line_1: {
      required: false,
      type: String
    },
    address_line_2: {
      required: false,
      type: String
    },
    address_line_3: {
      required: false,
      type: String
    },
    city: {
      required: false,
      type: String
    },
    county: {
      required: false,
      type: String
    },
    postcode: {
      required: false,
      type: String
    },
    country: {
      required: false,
      type: String
    },
    has_induction_loop: {
      required: false,
      type: Boolean
    },
    has_wheelchair_access: {
      required: false,
      type: Boolean
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
        { value: "existing", label: "Existing" },
        { value: "new", label: "New" }
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
        { text: "Thursday", value: 4 },
        { text: "Friday", value: 5 },
        { text: "Saturday", value: 6 },
        { text: "Sunday", value: 7 }
      ],
      daysInMonth: [{ text: "Please select", value: null, disabled: true }],
      occurrences: [
        { text: "Please select", value: null, disabled: true },
        { text: "First", value: 1 },
        { text: "Second", value: 2 },
        { text: "Third", value: 3 },
        { text: "Fourth", value: 4 },
        { text: "Last", value: 5 }
      ]
    };
  },
  computed: {
    isCreateForm() {
      return this.location_type !== undefined;
    }
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
      return this.regular_opening_hours.map(regularOpeningHour => ({
        ...regularOpeningHour
      }));
    },
    cloneHolidayOpeningHours() {
      return this.holiday_opening_hours.map(holidayOpeningHour => ({
        ...holidayOpeningHour
      }));
    },
    onInput({ field, value }) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
    onLocationInput({ field, value }) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear-location", field);
    },
    onRegularOpeningHourInput({ index, field, value }) {
      let regularOpeningHours = this.cloneRegularOpeningHours();
      regularOpeningHours[index][field] = value;
      this.$emit("update:regular_opening_hours", regularOpeningHours);
      this.$emit("clear", `regular_opening_hours.${index}.${field}`);
    },
    onHolidayOpeningHourInput({ index, field, value }) {
      let holidayOpeningHours = this.cloneHolidayOpeningHours();
      holidayOpeningHours[index][field] = value;
      this.$emit("update:holiday_opening_hours", holidayOpeningHours);
      this.$emit("clear", `holiday_opening_hours.${index}.${field}`);
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
    appendLocation(location) {
      this.locations.push({
        text: `${location.address_line_1}, ${location.city}, ${
          location.postcode
        }`,
        value: location.id
      });
    },
    onAddRegularOpeningHour() {
      let regularOpeningHours = this.cloneRegularOpeningHours();
      regularOpeningHours.push({
        frequency: null,
        weekday: null,
        day_of_month: null,
        occurrence_of_month: null,
        starts_at: "",
        opens_at: null,
        closes_at: null,
        index: this.index
      });
      this.$emit("update:regular_opening_hours", regularOpeningHours);
      this.index++;
    },
    onAddHolidayOpeningHour() {
      let holidayOpeningHours = this.cloneHolidayOpeningHours();
      holidayOpeningHours.push({
        is_closed: false,
        starts_at: "",
        ends_at: "",
        opens_at: null,
        closes_at: null,
        index: this.index
      });
      this.$emit("update:holiday_opening_hours", holidayOpeningHours);
      this.index++;
    },
    onDeleteRegularOpeningHour(index) {
      let regularOpeningHours = this.cloneRegularOpeningHours();
      regularOpeningHours.splice(index, 1);
      this.$emit("update:regular_opening_hours", regularOpeningHours);
    },
    onDeleteHolidayOpeningHour(index) {
      let holidayOpeningHours = this.cloneHolidayOpeningHours();
      holidayOpeningHours.splice(index, 1);
      this.$emit("update:holiday_opening_hours", holidayOpeningHours);
    }
  },
  created() {
    this.setDaysInMonth();
    this.fetchLocations();
    this.$root.$on("location-created", this.appendLocation);
  },
  watch: {
    location_type(newLocationType) {
      if (newLocationType === "new") {
        this.$emit("update:location_id", null);
      }

      if (newLocationType === "existing") {
        this.$emit("update:address_line_1", "");
        this.$emit("update:address_line_2", "");
        this.$emit("update:address_line_3", "");
        this.$emit("update:city", "");
        this.$emit("update:county", "");
        this.$emit("update:postcode", "");
        this.$emit("update:country", "United Kingdom");
        this.$emit("update:has_wheelchair_access", false);
        this.$emit("update:has_induction_loop", false);
      }
    },
    regular_opening_hours(newValue, oldValue) {
      if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
        return;
      }

      let regularOpeningHours = newValue.map(regularOpeningHour => ({
        ...regularOpeningHour
      }));

      for (let regularOpeningHour of regularOpeningHours) {
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
      }

      this.$emit("update:regular_opening_hours", regularOpeningHours);
    },
    holiday_opening_hours(newValue, oldValue) {
      if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
        return;
      }

      let holidayOpeningHours = newValue.map(holidayOpeningHour => ({
        ...holidayOpeningHour
      }));

      for (let holidayOpeningHour of holidayOpeningHours) {
        if (holidayOpeningHour.is_closed) {
          holidayOpeningHour.opens_at = "00:00:00";
          holidayOpeningHour.closes_at = "00:00:00";
        }
      }

      this.$emit("update:holiday_opening_hours", holidayOpeningHours);
    }
  }
};
</script>
