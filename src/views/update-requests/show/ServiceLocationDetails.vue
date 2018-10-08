<template>
  <ck-loader v-if="loading" />
  <div v-else>
    <gov-body>
      For the <gov-link :to="{ name: 'services-show', params: { service: service.id } }" v-text="service.name" />
      service at location <gov-link :to="{ name: 'locations-show', params: { location: location.id } }" v-text="location.address_line_1" />.
    </gov-body>

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
  </div>
</template>

<script>
import moment from "moment";
import http from "@/http";

export default {
  name: "ServiceLocationDetails",
  props: {
    serviceLocation: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      model: null,
      service: null,
      location: null
    };
  },
  computed: {
    fetching() {
      if (this.loading.serviceLocation) {
        return true;
      }

      if (this.loading.service) {
        return true;
      }

      if (this.loading.location) {
        return true;
      }

      return false;
    }
  },
  methods: {
    async fetchAll() {
      this.loading = true;

      await this.fetchServiceLocation();
      await this.fetchService();
      await this.fetchLocation();

      this.loading = false;
    },
    async fetchServiceLocation() {
      const { data } = await http.get(`/service-locations/${this.serviceLocation.id}`);
      this.model = data.data;
    },
    async fetchService() {
      const { data } = await http.get(`/services/${this.model.service_id}`);
      this.service = data.data;
    },
    async fetchLocation() {
      const { data } = await http.get(`/locations/${this.model.location_id}`);
      this.location = data.data;
    },
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
  },
  created() {
    this.fetchAll();
  }
};
</script>
