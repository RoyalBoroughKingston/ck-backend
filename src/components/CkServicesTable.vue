<template>
  <gov-table>
    <template slot="header">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="col">Service name</th>
        <th class="govuk-table__header" scope="col">Organisation</th>
        <th class="govuk-table__header" scope="col">Status</th>
        <th class="govuk-table__header text-right" scope="col"></th>
      </tr>
    </template>
    <template slot="body">
      <tr v-for="(service, key) in services" :key="key" class="govuk-table__row">
        <td class="govuk-table__cell" scope="row">{{ service.name }}</td>
        <td class="govuk-table__cell">{{ service.organisation.name }}</td>
        <td class="govuk-table__cell">{{ humanReadableStatus(service.status) }}</td>
        <td class="govuk-table__cell text-right">
          <gov-link :to="{ name: 'services-show', params: { service: service.id } }">View</gov-link>
        </td>
      </tr>
      <tr v-if="services.length === 0" class="govuk-table__row">
        <td class="text-center" colspan="4">No services</td>
      </tr>
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
