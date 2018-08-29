<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'referrals-index' }">Back to referrals</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-body size="l" class="govuk-!-font-weight-bold">You are about to access referral information</gov-body>
          <gov-body>Due to confidentiality you will be tracked</gov-body>
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
