<template>
  <div>
    <gov-heading size="l">Locations</gov-heading>
    <div v-for="(serviceLocation, index) in service.service_locations" :key="serviceLocation.id">
      <gov-table>
        <template slot="body">
          <gov-table-row>
            <gov-table-header scope="row" top>Name</gov-table-header>
            <gov-table-cell>{{ serviceLocation.name || "-" }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Address line 1</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.address_line_1 }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Address line 2</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.address_line_2 || "-" }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Address line 3</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.address_line_3 || "-" }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>City</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.city }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>County</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.county }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Postcode</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.postcode }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Country</gov-table-header>
            <gov-table-cell>{{ serviceLocation.location.country }}</gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Regular opening hours</gov-table-header>
            <gov-table-cell>
              <gov-list>
                <li
                  v-for="(regularOpeningHour, index) in serviceLocation.regular_opening_hours"
                  :key="index"
                  v-text="formatRegularOpeningHour(regularOpeningHour)"
                />
                <li v-if="serviceLocation.regular_opening_hours.length === 0">
                  No regular opening hours have been specifeid for this service
                </li>
              </gov-list>
            </gov-table-cell>
          </gov-table-row>
          <gov-table-row>
            <gov-table-header scope="row" top>Holiday opening hours</gov-table-header>
            <gov-table-cell>
              <gov-list>
                <li
                  v-for="(holidayOpeningHour, index) in serviceLocation.holiday_opening_hours"
                  :key="index"
                  v-text="formatHolidayOpeningHour(holidayOpeningHour)"
                />
                <li v-if="serviceLocation.holiday_opening_hours.length === 0">
                  No holiday opening hours have been specifeid for this service
                </li>
              </gov-list>
            </gov-table-cell>
          </gov-table-row>
        </template>
      </gov-table>
      <gov-section-break v-if="index < service.service_locations.length - 1" size="l" />
    </div>
    <g-v-body v-if="service.service_locations.length === 0">
      No locations have been specified for this service.
    </g-v-body>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "LocationsTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatRegularOpeningHour(openingHour) {
      switch (openingHour.frequency) {
        case "weekly":
          return `${this.weekday(openingHour.weekday)} - ${this.timePeriod(
            openingHour
          )}`;
        case "monthly":
          return `${this.dayOfMonth(
            openingHour.day_of_month
          )} of each month - ${this.timePeriod(openingHour)}`;
        case "fortnightly":
          return `Every other ${this.weekdayFromDate(
            openingHour.starts_at
          )} (${this.fortnightWeek(openingHour.starts_at)}) - ${this.timePeriod(
            openingHour
          )}`;
        case "nth_occurrence_of_month":
          return `${this.dayOfMonth(
            openingHour.occurrence_of_month
          )} ${this.weekday(openingHour.weekday)} of each month`;
      }
    },
    formatHolidayOpeningHour(openingHour) {
      const open = openingHour.is_closed ? "Closed" : "Open";
      const dateRange = `${this.formatDate(
        openingHour.starts_at
      )} to ${this.formatDate(openingHour.ends_at)}`;
      let string = `${open} from ${dateRange}`;

      if (!openingHour.is_closed) {
        string += ` - ${this.timePeriod(openingHour)}`;
      }

      return string;
    },
    timePeriod(openingHour) {
      return `${this.formatTime(openingHour.opens_at)} to ${this.formatTime(
        openingHour.closes_at
      )}`;
    },
    weekday(weekday) {
      return moment(weekday, "E").format("dddd");
    },
    weekdayFromDate(date) {
      return moment(date, moment.HTML5_FMT.DATE).format("dddd");
    },
    dayOfMonth(dayOfMonth) {
      return moment(dayOfMonth, "D").format("Do");
    },
    fortnightWeek(date) {
      const daysInFortnight = 14;
      const thisSunday = moment().day(7);
      const diffInDays = moment(date, moment.HTML5_FMT.DATE).diff(
        thisSunday,
        "days"
      );
      const remainingDays = Math.abs(diffInDays % daysInFortnight);

      return remainingDays > 6 ? "next calendar week" : "this calendar week";
    }
  }
};
</script>
