<template>
  <gov-table>
    <template slot="header">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="col">Address Line 1</th>
        <th class="govuk-table__header" scope="col">City</th>
        <th class="govuk-table__header" scope="col">Postcode</th>
        <th class="govuk-table__header text-right" scope="col"></th>
      </tr>
    </template>
    <template slot="body">
      <tr v-for="(location, key) in locations" :key="key" class="govuk-table__row">
        <td class="govuk-table__cell" scope="row">{{ location.address_line_1 }}</td>
        <td class="govuk-table__cell">{{ location.city }}</td>
        <td class="govuk-table__cell">{{ location.postcode }}</td>
        <td class="govuk-table__cell text-right">
          <gov-link :to="{ name: 'locations-show', params: { location: location.id } }">View</gov-link>
        </td>
      </tr>
      <tr v-if="locations.length === 0" class="govuk-table__row">
        <td class="text-center" colspan="4">No locations</td>
      </tr>
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
