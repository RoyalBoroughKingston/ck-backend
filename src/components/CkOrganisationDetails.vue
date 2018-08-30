<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header scope="row">Organisation name</gov-table-header>
        <gov-table-cell>{{ organisation.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Description</gov-table-header>
        <gov-table-cell>{{ organisation.description }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Website Address</gov-table-header>
        <gov-table-cell>{{ organisation.url }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Phone number</gov-table-header>
        <gov-table-cell>{{ organisation.phone }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Email</gov-table-header>
        <gov-table-cell>{{ organisation.email }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header class="align-top" scope="row">Logo</gov-table-header>
        <gov-table-cell>
          <img :src="apiUrl(`/organisations/${organisation.id}/logo`)" alt="Organisation logo">
        </gov-table-cell>
      </gov-table-row>
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
