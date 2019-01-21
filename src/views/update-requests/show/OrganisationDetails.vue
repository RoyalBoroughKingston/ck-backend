<template>
  <gov-table>
    <template slot="body">

      <gov-table-row v-if="organisation.hasOwnProperty('url')">
        <gov-table-header top scope="row">URL</gov-table-header>
        <gov-table-cell break>{{ organisation.url }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="organisation.hasOwnProperty('name')">
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ organisation.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="organisation.hasOwnProperty('slug')">
        <gov-table-header top scope="row">Slug</gov-table-header>
        <gov-table-cell>{{ organisation.slug }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="organisation.hasOwnProperty('email')">
        <gov-table-header top scope="row">Email</gov-table-header>
        <gov-table-cell>{{ organisation.email }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="organisation.hasOwnProperty('phone')">
        <gov-table-header top scope="row">Phone</gov-table-header>
        <gov-table-cell>{{ organisation.phone }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="organisation.hasOwnProperty('description')">
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
