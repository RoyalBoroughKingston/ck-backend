<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header scope="row">Service name</gov-table-header>
        <gov-table-cell>{{ service.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header class="align-top" scope="row">Description</gov-table-header>
        <gov-table-cell v-html="toHtml(service.description)" />
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkServiceDetails",
  props: {
    service: {
      type: Object,
      required: true
    }
  }
};
</script>
