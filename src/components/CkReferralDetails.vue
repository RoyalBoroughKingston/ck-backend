<template>
  <gov-table>
    <template slot="body">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Reference no.</th>
        <td class="govuk-table__cell">{{ referral.reference }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Type</th>
        <td class="govuk-table__cell">{{ type }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Service</th>
        <td class="govuk-table__cell">{{ referral.service.name }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Name</th>
        <td class="govuk-table__cell">{{ referral.name }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Email</th>
        <td class="govuk-table__cell">{{ referral.email || "-" }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Phone</th>
        <td class="govuk-table__cell">{{ referral.phone || "-" }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Consent</th>
        <td class="govuk-table__cell">{{ consented }}</td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Status</th>
        <td class="govuk-table__cell">
          <gov-tag>{{ humanReadableStatus(referral.status) }}</gov-tag>
        </td>
      </tr>
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="row">Date/Time</th>
        <td class="govuk-table__cell">{{ formatDateTime(referral.created_at) }}</td>
      </tr>
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
    },
  },
  methods: {
    humanReadableStatus(status) {
      const string = status.replace("_", " ");
      return string.charAt(0).toUpperCase() + string.substr(1);
    }
  }
};
</script>
