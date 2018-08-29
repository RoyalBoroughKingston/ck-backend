<template>
  <gov-table>
    <template slot="body">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">First name</th>
        <td class="govuk-table__cell">{{ user.first_name }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Last name</th>
        <td class="govuk-table__cell">{{ user.last_name }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Email</th>
        <td class="govuk-table__cell">{{ user.email }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Phone number</th>
        <td class="govuk-table__cell">{{ user.phone }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header align-top" scope="row">Permissions</th>
        <td class="govuk-table__cell">
          <gov-body v-for="(role, key) in roles" :key="key">{{ role }}</gov-body>
        </td>
      </tr>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkUserDetails",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roles: ["Admin - BalanceCIC", "Service Worker - Mind"]
    };
  },
  methods: {
    fetchRoles() {
      //
    }
  },
  created() {
    //
  }
};
</script>
