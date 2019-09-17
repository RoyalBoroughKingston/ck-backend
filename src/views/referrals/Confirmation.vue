<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - View Referral" />

    <gov-back-link :to="{ name: 'referrals-index' }">Back to referrals</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-body size="l" class="govuk-!-font-weight-bold">
            You are about to access confidential referral information
          </gov-body>
          <gov-body>Access to referral data is tracked</gov-body>
          <gov-button @click="onContinue">Continue</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
export default {
  name: "ShowReferralConfirmation",
  methods: {
    onContinue() {
      this.$router.push({
        name: "referrals-show",
        params: { referral: this.$route.params.referral }
      });
    }
  }
};
</script>
