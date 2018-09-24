<template>
  <gov-table>
    <template slot="body">

      <gov-table-row>
        <gov-table-header top scope="row">URL</gov-table-header>
        <gov-table-cell>{{ organisation.url }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ organisation.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Slug</gov-table-header>
        <gov-table-cell>{{ organisation.slug }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Email</gov-table-header>
        <gov-table-cell>{{ organisation.email }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Phone</gov-table-header>
        <gov-table-cell>{{ organisation.phone }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Description</gov-table-header>
        <gov-table-cell v-html="toHtml(organisation.description)" />
      </gov-table-row>

    </template>
  </gov-table>
</template>

<script>
export default {
  name: "OrganisationDetails",
  props: {
    organisation: {
      required: true,
      type: Object
    }
  }
};
</script>
