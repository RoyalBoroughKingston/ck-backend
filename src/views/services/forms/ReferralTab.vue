<template>
  <div>
    <gov-heading size="l">Referral</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          Use this section to specify how referrals should be made to this service.
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="referral_method"
          @input="$emit('update:referral_method', $event); $emit('clear', 'referral_method')"
          id="referral_method"
          label="Referral method"
          hint="How does this service receive referrals?"
          :options="referralMethodOptions"
          :error="errors.get('referral_method')"
          :disabled="!isOrganisationAdmin"
        />

        <ck-text-input
          v-if="referralIsInternalOrExternal"
          :value="referral_button_text"
          @input="$emit('update:referral_button_text', $event); $emit('clear', 'referral_button_text')"
          id="referral_button_text"
          label="Referral button text"
          hint="The text to be displayed on the button to make the referral."
          type="text"
          :error="errors.get('referral_button_text')"
          :disabled="!isOrganisationAdmin"
        />

        <ck-text-input
          v-if="referralIsInternalOrExternal && (referral_method === 'internal')"
          :value="referral_email"
          @input="$emit('update:referral_email', $event); $emit('clear', 'referral_email')"
          id="referral_email"
          label="Referral email"
          hint="The email address which should be notified when referrals are made"
          type="email"
          :error="errors.get('referral_email')"
          :disabled="!isOrganisationAdmin"
        />

        <ck-text-input
          v-if="referralIsInternalOrExternal && (referral_method === 'external')"
          :value="referral_url"
          @input="$emit('update:referral_url', $event); $emit('clear', 'referral_url')"
          id="referral_url"
          label="Referral URL"
          hint="The URL that the user must visit to make a referral"
          type="url"
          :error="errors.get('referral_url')"
          :disabled="!isOrganisationAdmin"
        />

        <ck-radio-input
          v-if="referralIsInternalOrExternal"
          :value="show_referral_disclaimer"
          @input="$emit('update:show_referral_disclaimer', $event); $emit('clear', 'show_referral_disclaimer')"
          id="show_referral_disclaimer"
          label="Show referral disclaimer?"
          :options="[{ value: true, label: 'Display' }, { value: false, label: 'Don\'t display' }]"
          :error="errors.get('show_referral_disclaimer')"
          :disabled="!isOrganisationAdmin"
        />

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "ReferralTab",
  props: {
    errors: {
      required: true
    },
    isOrganisationAdmin: {
      required: true
    },
    show_referral_disclaimer: {
      required: true
    },
    referral_method: {
      required: true
    },
    referral_button_text: {
      required: true
    },
    referral_email: {
      required: true
    },
    referral_url: {
      required: true
    }
  },
  data() {
    return {
      referralMethodOptions: [
        { text: "Please select", value: null, disabled: true },
        { text: "Internal", value: "internal" },
        { text: "External", value: "external" },
        { text: "This service doesn't accept referrals", value: "none" }
      ]
    };
  },
  computed: {
    referralIsInternalOrExternal() {
      return this.referral_method !== null && this.referral_method !== "none";
    }
  },
  watch: {
    referral_method(newReferralMethod) {
      if (newReferralMethod === null || newReferralMethod === "none") {
        this.$emit("update:referral_button_text", "");
        this.$emit("update:referral_email", "");
        this.$emit("update:referral_url", "");
        this.$emit("update:show_referral_disclaimer", false);

        this.$emit("clear", "referral_button_text");
        this.$emit("clear", "referral_email");
        this.$emit("clear", "referral_url");
        this.$emit("clear", "show_referral_disclaimer");
      }

      if (newReferralMethod !== "internal") {
        this.$emit("update:referral_email", "");

        this.$emit("clear", "referral_email");
      }

      if (newReferralMethod !== "external") {
        this.$emit("update:referral_url", "");

        this.$emit("clear", "referral_url");
      }
    }
  }
};
</script>
