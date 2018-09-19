<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">Action</gov-table-header>
        <gov-table-header scope="col">Description</gov-table-header>
        <gov-table-header scope="col">Date / Time</gov-table-header>
        <gov-table-header scope="col">Guest / User</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="audit in audits" :key="audit.id">
        <gov-table-cell>
          <gov-tag :class="`action action--${audit.action}`">{{ audit.action }}</gov-tag>
        </gov-table-cell>
        <gov-table-cell>{{ audit.description }}</gov-table-cell>
        <gov-table-cell>{{ formatDateTime(audit.created_at) }}</gov-table-cell>
        <gov-table-cell>{{ audit.user ? `${audit.user.first_name} ${audit.user.last_name}` : 'Guest' }}</gov-table-cell>
        <gov-table-cell right>
          <gov-link :to="{ name: 'audits-show', params: { audit: audit.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="audits.length === 0">
        <gov-table-cell center colspan="5">No audits</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkAuditsTable",
  props: {
    audits: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "../scss/app.scss";

.action {
  text-transform: uppercase;

  &--create {
    background-color: govuk-colour("green") !important;
  }

  &--update {
    background-color: govuk-colour("orange") !important;
  }

  &--delete {
    background-color: $govuk-error-colour !important;
  }
}
</style>
