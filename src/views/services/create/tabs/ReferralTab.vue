<template>
  <div>
    <gov-heading size="l">Referral</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          Use this section to specify how referrals should be made to this service.
        </gov-body>

        <gov-section-break size="l" />

        <ck-radio-input
          :value="form.show_referral_disclaimer"
          @input="$emit('update:show_referral_disclaimer', $event); $emit('clear', 'show_referral_disclaimer')"
          id="show_referral_disclaimer"
          label="Show referral disclaimer?"
          :options="[{ value: true, label: 'Display' }, { value: false, label: 'Don\'t display' }]"
          :error="form.$errors.get('show_referral_disclaimer')"
        />

        <ck-select-input
          v-if="form.show_referral_disclaimer"
          :value="form.referral_method"
          @input="$emit('update:referral_method', $event); $emit('clear', 'referral_method')"
          id="referral_method"
          label="Referral method"
          hint="How does this service receive referrals?"
          :options="referralMethodOptions"
          :error="form.$errors.get('referral_method')"
        />

        <ck-text-input
          v-if="form.show_referral_disclaimer && referralIsInternalOrExternal"
          :value="form.referral_button_text"
          @input="$emit('update:referral_button_text', $event); $emit('clear', 'referral_button_text')"
          id="referral_button_text"
          label="Referral button text"
          hint="The text to be displayed on the button to make the referral."
          type="text"
          :error="form.$errors.get('referral_button_text')"
        />

        <ck-text-input
          v-if="form.show_referral_disclaimer && referralIsInternalOrExternal && (form.referral_method === 'internal')"
          :value="form.referral_email"
          @input="$emit('update:referral_email', $event); $emit('clear', 'referral_email')"
          id="referral_email"
          label="Referral email"
          hint="The email address which should be notified when referrals are made"
          type="email"
          :error="form.$errors.get('referral_email')"
        />

        <ck-text-input
          v-if="form.show_referral_disclaimer && referralIsInternalOrExternal && (form.referral_method === 'external')"
          :value="form.referral_url"
          @input="$emit('update:referral_url', $event); $emit('clear', 'referral_url')"
          id="referral_url"
          label="Referral URL"
          hint="The URL that the user must visit to make a referral"
          type="url"
          :error="form.$errors.get('referral_url')"
        />

        <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
        <gov-button v-else @click="$emit('submit')" type="submit">Create</gov-button>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "ReferralTab",
  props: {
    form: {
      type: Object,
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
      return (
        this.form.referral_method !== null &&
        this.form.referral_method !== "none"
      );
    }
  },
  watch: {
    "form.show_referral_disclaimer"(newShowReferralDisclaimer) {
      if (newShowReferralDisclaimer !== true) {
        this.$emit("update:referral_method", "none");
        this.$emit("update:referral_button_text", "");
        this.$emit("update:referral_email", "");
        this.$emit("update:referral_url", "");

        this.$emit("clear", "referral_method");
        this.$emit("clear", "referral_button_text");
        this.$emit("clear", "referral_email");
        this.$emit("clear", "referral_url");
      } else {
        this.$emit("update:referral_method", null);
        this.$emit("clear", "referral_method");
      }
    },
    "form.referral_method"(newReferralMethod) {
      if (newReferralMethod === null || newReferralMethod === "none") {
        this.$emit("update:referral_button_text", "");
        this.$emit("update:referral_email", "");
        this.$emit("update:referral_url", "");

        this.$emit("clear", "referral_button_text");
        this.$emit("clear", "referral_email");
        this.$emit("clear", "referral_url");
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
