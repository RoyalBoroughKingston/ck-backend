<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">Reference no.</gov-table-header>
        <gov-table-header scope="col">Service</gov-table-header>
        <gov-table-header scope="col">Name</gov-table-header>
        <gov-table-header scope="col">Status</gov-table-header>
        <gov-table-header scope="col">Date/time</gov-table-header>
        <gov-table-header class="text-right" scope="col"></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="referral in referrals" :key="referral.id">
        <gov-table-cell>{{ referral.reference }}</gov-table-cell>
        <gov-table-cell>{{ referral.service.name }}</gov-table-cell>
        <gov-table-cell>{{ referral.name }}</gov-table-cell>
        <gov-table-cell>{{ humanReadableStatus(referral.status) }}</gov-table-cell>
        <gov-table-cell>{{ formatDateTime(referral.created_at) }}</gov-table-cell>
        <gov-table-cell class="text-right">
          <gov-link :to="{ name: 'referrals-confirmation', params: { referral: referral.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="referrals.length === 0">
        <gov-table-cell class="text-center" colspan="6">No referrals</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkReferralsTable",
  props: {
    referrals: {
      type: Array,
      required: true
    }
  },
  methods: {
    humanReadableStatus(status) {
      const string = status.replace("_", " ");
      return string.charAt(0).toUpperCase() + string.substr(1);
    }
  }
};
</script>
