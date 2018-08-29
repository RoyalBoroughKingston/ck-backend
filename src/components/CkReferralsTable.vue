<template>
  <gov-table>
    <template slot="header">
      <tr class="govuk-table__row">
        <th class="govuk-table__header" scope="col">Reference no.</th>
        <th class="govuk-table__header" scope="col">Service</th>
        <th class="govuk-table__header" scope="col">Name</th>
        <th class="govuk-table__header" scope="col">Status</th>
        <th class="govuk-table__header" scope="col">Date/time</th>
        <th class="govuk-table__header text-right" scope="col"></th>
      </tr>
    </template>
    <template slot="body">
      <tr v-for="(referral, key) in referrals" :key="key" class="govuk-table__row">
        <td class="govuk-table__cell" scope="row">{{ referral.reference }}</td>
        <td class="govuk-table__cell">{{ referral.service.name }}</td>
        <td class="govuk-table__cell">{{ referral.name }}</td>
        <td class="govuk-table__cell">{{ humanReadableStatus(referral.status) }}</td>
        <td class="govuk-table__cell">{{ referral.created_at }}</td>
        <td class="govuk-table__cell text-right">
          <gov-link :to="{ name: 'referrals-show', params: { referral: referral.id } }">View</gov-link>
        </td>
      </tr>
      <tr v-if="referrals.length === 0" class="govuk-table__row">
        <td class="text-center" colspan="6">No referrals</td>
      </tr>
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
