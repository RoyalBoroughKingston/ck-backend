<template>
  <gov-table>
    <template slot="header">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="col">First name</th>
        <th class="govuk-table__header" scope="col">Last name</th>
        <th class="govuk-table__header" scope="col">Email</th>
        <th class="govuk-table__header" scope="col">Phone</th>
        <th class="govuk-table__header text-right" scope="col"></th>
      </tr>
    </template>
    <template slot="body">
      <tr v-for="(user, key) in users" :key="key" class="govuk-table__row">
        <td class="govuk-table__cell" scope="row">{{ user.first_name }}</td>
        <td class="govuk-table__cell">{{ user.last_name }}</td>
        <td class="govuk-table__cell">{{ user.email }}</td>
        <td class="govuk-table__cell">{{ user.phone }}</td>
        <td class="govuk-table__cell text-right">
          <gov-link :to="{ name: 'users-show', params: { user: user.id } }">View</gov-link>
        </td>
      </tr>
      <tr v-if="users.length === 0" class="govuk-table__row">
        <td class="text-center" colspan="5">No users</td>
      </tr>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkUsersTable",
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>
