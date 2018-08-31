<template>
  <div>
    <gov-heading size="l">Locations</gov-heading>
    <div v-for="serviceLocation in service.service_locations" :key="serviceLocation.id">
      <gov-table>
        <template slot="body">
          <gov-table-row>
            <gov-table-header scope="row" top>Heading</gov-table-header>
            <gov-table-cell>Value</gov-table-cell>
          </gov-table-row>
        </template>
      </gov-table>
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
  }
}
</script>
