<template>
  <div>
    <gov-heading size="l">Referral</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          Your service can be set up to accept referrals through Connected Kingston.
          These referrals directly connect your service to residents.
        </gov-body>
        <gov-body>
          If you are interested in turning on referrals for your organisation, please
          <gov-link :href="contactAdminTeamEmail">contact the admin team</gov-link>.
        </gov-body>
        <gov-body>
          Further information on referrals can be found on the
          <gov-link href="https://kva.org.uk/kingston-s-vcs/connected-kingston/how-to-add-your-organisation/">KVA website</gov-link>.
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="referral_method"
          @input="$emit('update:referral_method', $event); $emit('clear', 'referral_method')"
          id="referral_method"
          label="Referral method"
          hint="Does this service receive referrals, and if so, how?"
          :options="referralMethodOptions"
          :error="errors.get('referral_method')"
          :disabled="!isGlobalAdmin"
        />

        <ck-text-input
          v-if="referralIsInternalOrExternal"
          :value="referral_button_text"
          @input="$emit('update:referral_button_text', $event); $emit('clear', 'referral_button_text')"
          id="referral_button_text"
          label="What should your button say?"
          type="text"
          :error="errors.get('referral_button_text')"
          :disabled="!isGlobalAdmin"
        >
          <template slot="hint">
            <gov-hint for="referral_button_text">
              E.g ‘Sign Up’, ‘Refer To’, or ‘Join In’
            </gov-hint>
            <gov-hint for="referral_button_text" v-if="referral_method === 'internal'">
              By enabling referrals through Connected Kingston, a button will be
              added to your page which will link to the referral form.
            </gov-hint>
            <gov-hint for="referral_button_text" v-if="referral_method === 'external'">
              This button will be added to your service page, and link users to
              the URL below.
            </gov-hint>
          </template>
        </ck-text-input>

        <ck-text-input
          v-if="referralIsInternalOrExternal && (referral_method === 'internal')"
          :value="referral_email"
          @input="$emit('update:referral_email', $event); $emit('clear', 'referral_email')"
          id="referral_email"
          label="Where should we alert you when you receive a referral?"
          hint="This email address should be a group inbox if possible. When a referral is received, someone will need to login to respond."
          type="email"
          :error="errors.get('referral_email')"
          :disabled="!isGlobalAdmin"
        />

        <ck-text-input
          v-if="referralIsInternalOrExternal && (referral_method === 'external')"
          :value="referral_url"
          @input="$emit('update:referral_url', $event); $emit('clear', 'referral_url')"
          id="referral_url"
          label="External referral URL"
          hint="Please add the web address that the user will be directed to in order to make a referral."
          type="url"
          :error="errors.get('referral_url')"
          :disabled="!isGlobalAdmin"
        />

        <ck-radio-input
          v-if="referralIsInternalOrExternal"
          :value="show_referral_disclaimer"
          @input="$emit('update:show_referral_disclaimer', $event); $emit('clear', 'show_referral_disclaimer')"
          id="show_referral_disclaimer"
          label="Show referral disclaimer?"
          :options="[{ value: true, label: 'Display' }, { value: false, label: 'Don\'t display' }]"
          :error="errors.get('show_referral_disclaimer')"
          :disabled="!isGlobalAdmin"
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
    isNew: {
      required: false,
      type: Boolean,
      default: false
    },
    isGlobalAdmin: {
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
        { text: "Yes - Through Connected Kingston", value: "internal" },
        { text: "Yes - Through an external form", value: "external" },
        { text: "No - This service doesn’t accept referrals", value: "none" }
      ]
    };
  },
  computed: {
    referralIsInternalOrExternal() {
      return this.referral_method !== null && this.referral_method !== "none";
    },
    contactAdminTeamEmail() {
      const to = "info@connectedkingston.uk";
      const subject = "Turn referrals on for my service";
      const body =
        "Service Name: XXX\n\nWe are interested in finding out more about accepting referrals through Connected Kingston.";

      return `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  },
  watch: {
    referral_method(newReferralMethod, oldReferralMethod) {
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

      if (
        this.isNew &&
        (oldReferralMethod === null || oldReferralMethod === "none") &&
        (newReferralMethod !== null && newReferralMethod !== "none")
      ) {
        this.$emit("update:show_referral_disclaimer", true);

        this.$emit("clear", "show_referral_disclaimer");
      }
    }
  }
};
</script>
