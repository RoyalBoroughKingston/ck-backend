<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">Address Line 1</gov-table-header>
        <gov-table-header scope="col">City</gov-table-header>
        <gov-table-header scope="col">Postcode</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="location in locations" :key="location.id">
        <gov-table-cell>{{ location.address_line_1 }}</gov-table-cell>
        <gov-table-cell>{{ location.city }}</gov-table-cell>
        <gov-table-cell>{{ location.postcode }}</gov-table-cell>
        <gov-table-cell right>
          <gov-link :to="{ name: 'locations-show', params: { location: location.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="locations.length === 0">
        <gov-table-cell center colspan="4">No locations</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkLocationsTable",
  props: {
    locations: {
      type: Array,
      required: true
    }
  }
};
</script>
