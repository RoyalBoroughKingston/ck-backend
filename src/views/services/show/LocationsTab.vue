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
                  v-text="humanReadableRegularOpeningHour(regularOpeningHour)"
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
                  v-text="holidayOpeningHour.starts_at"
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
  </div>
</template>

<script>
export default {
  name: "LocationsTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    humanReadableRegularOpeningHour(openingHour) {
      switch (openingHour.frequency) {
        case "weekly":
          return `${this.weekday(openingHour.weekday)} - ${this.timePeriod(openingHour)}`;
        case "monthly":
          return `${this.dayOfMonth(openingHour.day_of_month)} of each month - ${this.timePeriod(openingHour)}`;
      }
      return "TEST - " + openingHour.frequency;
    },
    timePeriod(openingHour) {
      return `${this.formatTime(openingHour.opens_at)} to ${this.formatTime(openingHour.closes_at)}`;
    },
    weekday(weekday) {
      return this.moment(weekday, "E").format("dddd");
    },
    dayOfMonth(dayOfMonth) {
      return this.moment(dayOfMonth, "D").format("Do");
    }
  }
};
</script>
