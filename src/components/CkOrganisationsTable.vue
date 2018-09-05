<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">Organisation name</gov-table-header>
        <gov-table-header scope="col">Url</gov-table-header>
        <gov-table-header scope="col">Phone</gov-table-header>
        <gov-table-header scope="col">Email</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="organisation in organisations" :key="organisation.id">
        <gov-table-cell scope="row">{{ organisation.name }}</gov-table-cell>
        <gov-table-cell class="wrap-long-text">{{ organisation.url }}</gov-table-cell>
        <gov-table-cell>{{ organisation.phone }}</gov-table-cell>
        <gov-table-cell>{{ organisation.email }}</gov-table-cell>
        <gov-table-cell right>
          <gov-link :to="{ name: 'organisations-show', params: { organisation: organisation.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="organisations.length === 0">
        <gov-table-cell center colspan="5">No organisations</gov-table-cell>
      </gov-table-row>
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

<style lang="scss">
.wrap-long-text {
  word-break: break-word;
}
</style>
