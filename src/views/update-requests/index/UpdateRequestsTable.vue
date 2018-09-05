<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">User</gov-table-header>
        <gov-table-header scope="col">Type</gov-table-header>
        <gov-table-header scope="col">Entry</gov-table-header>
        <gov-table-header scope="col">Date/time</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="updateRequest in updateRequests" :key="updateRequest.id">
        <gov-table-cell>{{ updateRequest.user.first_name }} {{ updateRequest.user.last_name }}</gov-table-cell>
        <gov-table-cell>{{ type(updateRequest) }}</gov-table-cell>
        <gov-table-cell>{{ entry(updateRequest) }}</gov-table-cell>
        <gov-table-cell>{{ formatDateTime(updateRequest.created_at) }}</gov-table-cell>
        <gov-table-cell class="text-right">
          <gov-link :to="{ name: 'update-requests-show', params: { updateRequest: updateRequest.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="updateRequests.length === 0">
        <gov-table-cell center colspan="5">No update requests</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "UpdateRequestsTable",
  props: {
    updateRequests: {
      type: Array,
      required: true
    }
  },
  methods: {
    type(updateRequest) {
      switch (updateRequest.updateable_type) {
        case "services":
          return "Service";
        case "organisations":
          return "Organisation";
        case "locations":
          return "Location";
        case "service_locations":
          return "Service at location";
        default:
          return "Invalid type";
      }
    },
    entry(updateRequest) {
      switch (updateRequest.updateable_type) {
        case "services":
          return updateRequest.data.name;
        case "organisations":
          return updateRequest.data.name;
        case "locations":
          return updateRequest.data.address_line_1;
        case "service_locations":
          return updateRequest.data.name || "-";
        default:
          return "-";
      }
    }
  }
};
</script>
