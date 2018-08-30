<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">Service name</gov-table-header>
        <gov-table-header scope="col">Organisation</gov-table-header>
        <gov-table-header scope="col">Status</gov-table-header>
        <gov-table-header class="text-right" scope="col"></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="service in services" :key="service.id">
        <gov-table-cell scope="row">{{ service.name }}</gov-table-cell>
        <gov-table-cell>{{ service.organisation.name }}</gov-table-cell>
        <gov-table-cell>{{ humanReadableStatus(service.status) }}</gov-table-cell>
        <gov-table-cell class="text-right">
          <gov-link :to="{ name: 'services-show', params: { service: service.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="services.length === 0">
        <gov-table-cell class="text-center" colspan="4">No services</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkServicesTable",
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  methods: {
    humanReadableStatus(status) {
      switch (status) {
        case "active":
          return "Enabled";
        case "inactive":
          return "Disabled";
        default:
          return status;
      }
    }
  }
};
</script>
