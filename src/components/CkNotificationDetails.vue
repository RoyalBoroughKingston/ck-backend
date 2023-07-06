<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header top scope="row">Status</gov-table-header>
        <gov-table-cell>
          <gov-tag
            :class="`notification-status notification-status--${formatStatus(
              notification
            )}`"
            >{{ formatStatus(notification) }}</gov-tag
          >
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Channel</gov-table-header>
        <gov-table-cell>{{
          formatChannel(notification.channel)
        }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Type</gov-table-header>
        <gov-table-cell>{{
          formatType(notification.notifiable_type)
        }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Recipient</gov-table-header>
        <gov-table-cell>{{ notification.recipient }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Date / Time</gov-table-header>
        <gov-table-cell>{{ formatSentAt(notification) }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Message</gov-table-header>
        <gov-table-cell>
          <gov-body
            v-for="(paragraph, index) in notification.message.split('\n')"
            :key="index"
            v-text="paragraph"
          />
        </gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: 'CkNotificationDetails',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatStatus(notification) {
      if (notification.sent_at !== null) {
        return 'sent'
      } else if (notification.failed_at !== null) {
        return 'failed'
      } else {
        return 'sending'
      }
    },
    formatType(type) {
      switch (type) {
        case 'users':
          return 'User'
        case 'referrals':
          return 'Referral'
        case 'services':
          return 'Service'
        case null:
          return '-'
        default:
          return 'Unknown type'
      }
    },
    formatChannel(channel) {
      switch (channel) {
        case 'sms':
          return 'SMS'
        case 'email':
          return 'Email'
        default:
          return 'Unknown channel'
      }
    },
    formatSentAt(notification) {
      if (notification.sent_at !== null) {
        return this.formatDateTime(notification.sent_at)
      } else if (notification.failed_at !== null) {
        return this.formatDateTime(notification.failed_at)
      } else {
        return 'Sending...'
      }
    },
  },
}
</script>

<style lang="scss">
@import '../scss/app.scss';

.notification-status {
  text-transform: uppercase;

  &--sent {
    background-color: govuk-colour('green') !important;
  }

  &--failed {
    background-color: $govuk-error-colour !important;
  }
}
</style>
