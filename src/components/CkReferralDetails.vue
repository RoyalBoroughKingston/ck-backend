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
        <gov-table-header top scope="row">Person Signposted</gov-table-header>
        <gov-table-cell>{{ referral.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Signposted Email</gov-table-header>
        <gov-table-cell>{{ referral.email || "-" }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Signposted Phone</gov-table-header>
        <gov-table-cell>{{ referral.phone || "-" }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Signposted To</gov-table-header>
        <gov-table-cell>{{ referral.service.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Signposted To Email</gov-table-header>
        <gov-table-cell>{{ referral.service.referral_email }}</gov-table-cell>
      </gov-table-row>

      <template v-if="!isSelfReferral">
        <gov-table-row>
          <gov-table-header top scope="row">Champion Name</gov-table-header>
          <gov-table-cell>{{ referral.referee_name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Champion Email</gov-table-header>
          <gov-table-cell>{{ referral.referee_email || "-" }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Champion Phone</gov-table-header>
          <gov-table-cell>{{ referral.referee_phone || "-" }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Champion Organisation</gov-table-header>
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
          <gov-tag>{{ referral.status | status }}</gov-tag>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Date/Time</gov-table-header>
        <gov-table-cell>{{ formatDateTime(referral.created_at) }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="referral.status === 'completed'">
        <gov-table-header top scope="row">Scheduled for deletion</gov-table-header>
        <gov-table-cell>{{ formatDate(autoDeleteDate(referral.updated_at)) }}</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
import moment from "moment";

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
        return "Referred myself";
      }

      return "Referred by someone else";
    },
    consented() {
      return this.referral.referral_consented_at === null ? "No" : "Yes";
    }
  },
  methods: {
    autoDeleteDate(updated_at) {
      return moment(updated_at, moment.ISO_8601)
        .add(6, "months")
        .format("Y-MM-DD[T]HH:mm:ssZ");
    }
  },
  filters: {
    status(status) {
      switch (status) {
        case "new":
          return "New";
        case "in_progress":
          return "In progress";
        case "completed":
          return "Completed";
        case "incompleted":
          return "Incomplete";
        default:
          return "Invalid status";
      }
    }
  }
};
</script>
