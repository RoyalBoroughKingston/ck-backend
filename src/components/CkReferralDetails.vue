<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header scope="row">Reference no.</gov-table-header>
        <gov-table-cell>{{ referral.reference }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Type</gov-table-header>
        <gov-table-cell>{{ type }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Service</gov-table-header>
        <gov-table-cell>{{ referral.service.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Name</gov-table-header>
        <gov-table-cell>{{ referral.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Email</gov-table-header>
        <gov-table-cell>{{ referral.email || "-" }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Phone</gov-table-header>
        <gov-table-cell>{{ referral.phone || "-" }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Consent</gov-table-header>
        <gov-table-cell>{{ consented }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Status</gov-table-header>
        <gov-table-cell>
          <gov-tag>{{ humanReadableStatus(referral.status) }}</gov-tag>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row">Date/Time</gov-table-header>
        <gov-table-cell>{{ formatDateTime(referral.created_at) }}</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkReferralDetails",
  props: {
    referral: {
      type: Object,
      required: true
    }
  },
  computed: {
    type() {
      // Implies self-referral.
      if (this.referral.referee_name === null) {
        return "Refered myself";
      }

      return "Refered by someone else";
    },
    consented() {
      return this.referral.referral_consented_at === null ? "No" : "Yes";
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
