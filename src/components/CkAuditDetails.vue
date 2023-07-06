<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header top scope="row">Action</gov-table-header>
        <gov-table-cell>
          <gov-tag :class="`action action--${audit.action}`">{{
            audit.action
          }}</gov-tag>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Description</gov-table-header>
        <gov-table-cell>{{ audit.description }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Guest / User</gov-table-header>
        <gov-table-cell>{{
          audit.user
            ? `${audit.user.first_name} ${audit.user.last_name}`
            : 'Guest'
        }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Client</gov-table-header>
        <gov-table-cell>{{ audit.oauth_client || '-' }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Date / Time</gov-table-header>
        <gov-table-cell>{{ formatDateTime(audit.created_at) }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">IP Address</gov-table-header>
        <gov-table-cell>{{ audit.ip_address }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">User Agent</gov-table-header>
        <gov-table-cell>{{ audit.user_agent || '-' }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row"
          >Scheduled for deletion</gov-table-header
        >
        <gov-table-cell>{{
          formatDate(autoDeleteDate(audit.updated_at))
        }}</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CkAuditDetails',
  props: {
    audit: {
      type: Object,
      required: true,
    },
  },
  methods: {
    autoDeleteDate(updated_at) {
      return moment(updated_at, moment.ISO_8601)
        .clone()
        .add(24, 'months')
        .format('Y-MM-DD[T]HH:mm:ssZ')
    },
  },
}
</script>

<style lang="scss">
@import '../scss/app.scss';

.action {
  text-transform: uppercase;

  &--create {
    background-color: govuk-colour('green') !important;
  }

  &--update {
    background-color: govuk-colour('orange') !important;
  }

  &--delete {
    background-color: $govuk-error-colour !important;
  }
}
</style>
