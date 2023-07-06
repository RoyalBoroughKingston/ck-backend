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
          <gov-table-header scope="row" top
            >Is this {{ service.type }} free?</gov-table-header
          >
          <gov-table-cell>{{ isFree }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Testimonial</gov-table-header>
          <gov-table-cell>{{ service.testimonial || '-' }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Video URL</gov-table-header>
          <gov-table-cell break>{{
            service.video_embed || '-'
          }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
export default {
  name: 'AdditionalInfoTab',
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  computed: {
    waitTime() {
      let waitTime = `Not applicable for this ${this.service.type}`
      switch (this.service.wait_time) {
        case 'one_week':
        case 'two_weeks':
        case 'three_weeks':
          waitTime =
            this.service.wait_time.charAt(0).toUpperCase() +
            this.service.wait_time.replace('_', ' ').substr(1)
          break
        case 'month':
          waitTime = 'One month'
          break
        case 'longer':
          waitTime = 'Longer than one month'
          break
      }
      return waitTime
    },
    isFree() {
      return this.service.is_free ? 'Yes' : 'No'
    },
  },
}
</script>
