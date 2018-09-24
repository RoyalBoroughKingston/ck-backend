<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">First name</gov-table-header>
        <gov-table-header scope="col">Last name</gov-table-header>
        <gov-table-header scope="col">Email</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="user in users" :key="user.id">
        <gov-table-cell scope="row">{{ user.first_name }}</gov-table-cell>
        <gov-table-cell>{{ user.last_name }}</gov-table-cell>
        <gov-table-cell>{{ user.email }}</gov-table-cell>
        <gov-table-cell right>
          <gov-link :to="{ name: 'users-show', params: { user: user.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="users.length === 0">
        <gov-table-cell center colspan="4">No users</gov-table-cell>
      </gov-table-row>
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
