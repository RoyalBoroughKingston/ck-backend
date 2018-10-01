<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header top scope="row">Reference no.</gov-table-header>
        <gov-table-cell>{{ referral.reference }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Type</gov-table-header>
        <gov-table-cell>{{ type }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Service</gov-table-header>
        <gov-table-cell>{{ referral.service.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ referral.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Email</gov-table-header>
        <gov-table-cell>{{ referral.email || "-" }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Phone</gov-table-header>
        <gov-table-cell>{{ referral.phone || "-" }}</gov-table-cell>
      </gov-table-row>
      <template v-if="!isSelfReferral">
        <gov-table-row>
          <gov-table-header top scope="row">Referee Name</gov-table-header>
          <gov-table-cell>{{ referral.referee_name }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header top scope="row">Referee Email</gov-table-header>
          <gov-table-cell>{{ referral.referee_email || "-" }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header top scope="row">Referee Phone</gov-table-header>
          <gov-table-cell>{{ referral.referee_phone || "-" }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header top scope="row">Referee Organisation</gov-table-header>
          <gov-table-cell>{{ referral.referee_organisation }}</gov-table-cell>
        </gov-table-row>
      </template>
      <gov-table-row>
        <gov-table-header top scope="row">Consent</gov-table-header>
        <gov-table-cell>{{ consented }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Status</gov-table-header>
        <gov-table-cell>
          <gov-tag>{{ humanReadableStatus(referral.status) }}</gov-tag>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Date/Time</gov-table-header>
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
    isSelfReferral() {
      return this.referral.referee_name === null;
    },
    type() {
      // Implies self-referral.
      if (this.isSelfReferral) {
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
