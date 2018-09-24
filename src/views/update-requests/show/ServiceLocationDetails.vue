<template>
  <gov-table>
    <template slot="body">

      <gov-table-row v-if="serviceLocation.name">
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ serviceLocation.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Regular opening hours</gov-table-header>
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
        <gov-table-header top scope="row">Holiday opening hours</gov-table-header>
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
</template>

<script>
import moment from "moment";

export default {
  name: "ServiceLocationDetails",
  props: {
    serviceLocation: {
      required: true,
      type: Object
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
