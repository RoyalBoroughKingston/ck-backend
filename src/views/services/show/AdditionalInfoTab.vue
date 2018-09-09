<template>
  <div>
    <gov-heading size="l">Additional info</gov-heading>
    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="row" top>Average wait time</gov-table-header>
          <gov-table-cell>{{ waitTime }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Is this service free?</gov-table-header>
          <gov-table-cell>{{ isFree }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Testimonial</gov-table-header>
          <gov-table-cell>{{ service.testimonial || "-" }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Video URL</gov-table-header>
          <gov-table-cell>{{ service.video_embed || "-" }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfoTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    waitTime() {
      switch (this.service.wait_time) {
        case null:
          return "Not applicable for this service";
        case "one_week":
        case "two_weeks":
        case "three_weeks":
          return (
            this.service.wait_time.charAt(0).toUpperCase() +
            this.service.wait_time.replace("_", " ").substr(1)
          );
        case "month":
          return "One month";
        case "longer":
          return "Longer than one month";
      }
    },
    isFree() {
      return this.service.is_free ? "Yes" : "No";
    }
  }
};
</script>
