<template>
  <gov-table>
    <template slot="header">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="col">Organisation name</th>
        <th class="govuk-table__header" scope="col">Url</th>
        <th class="govuk-table__header" scope="col">Phone</th>
        <th class="govuk-table__header" scope="col">Email</th>
        <th class="govuk-table__header text-right" scope="col"></th>
      </tr>
    </template>
    <template slot="body">
      <tr v-for="(organisation, key) in organisations" :key="key" class="govuk-table__row">
        <td class="govuk-table__cell" scope="row">{{ organisation.name }}</td>
        <td class="govuk-table__cell">{{ organisation.url }}</td>
        <td class="govuk-table__cell">{{ organisation.phone }}</td>
        <td class="govuk-table__cell">{{ organisation.email }}</td>
        <td class="govuk-table__cell text-right">
          <gov-link :to="{ name: 'organisations-show', params: { organisation: organisation.slug } }">View</gov-link>
        </td>
      </tr>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkOrganisationsTable",
  props: {
    organisations: {
      type: Array,
      required: true
    }
  }
};
</script>
