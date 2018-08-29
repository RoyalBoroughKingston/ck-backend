<template>
  <gov-table>
    <template slot="body">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Organisation name</th>
        <td class="govuk-table__cell">{{ organisation.name }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Description</th>
        <td class="govuk-table__cell">{{ organisation.description }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Website Address</th>
        <td class="govuk-table__cell">{{ organisation.url }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Phone number</th>
        <td class="govuk-table__cell">{{ organisation.phone }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Email</th>
        <td class="govuk-table__cell">{{ organisation.email }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header align-top" scope="row">Logo</th>
        <td class="govuk-table__cell">
          <img :src="apiUrl(`/organisations/${organisation.id}/logo`)" alt="Organisation logo">
        </td>
      </tr>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkOrganisationDetails",
  props: {
    organisation: {
      type: Object,
      required: true
    }
  }
};
</script>
