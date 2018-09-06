<template>
  <div>
    <gov-heading size="l">Referral</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          Use this section to specify how referrals should be made to this service.
        </gov-body>
        <gov-section-break size="l" />

        <!-- Show referral disclaimer -->
        <gov-form-group :invalid="form.$errors.has('show_referral_disclaimer')">
          <gov-radios>
            <gov-label class="govuk-!-font-weight-bold" for="show_referral_disclaimer">
              Show referral disclaimer?
            </gov-label>
            <gov-radio
              :bind-to="form.show_referral_disclaimer"
              @input="$emit('update:show_referral_disclaimer', $event)"
              id="show_referral_disclaimer_enabled"
              name="show_referral_disclaimer"
              label="Display"
              :value="true"
            />
            <gov-radio
              :bind-to="form.show_referral_disclaimer"
              @input="$emit('update:show_referral_disclaimer', $event)"
              id="show_referral_disclaimer_no"
              name="show_referral_disclaimer"
              label="Don't display"
              :value="false"
            />
            <gov-error-message
              v-if="form.$errors.has('show_referral_disclaimer')"
              v-text="form.$errors.get('show_referral_disclaimer')"
              for="show_referral_disclaimer"
            />
          </gov-radios>
        </gov-form-group>
        <!-- /Show referral disclaimer -->

        <!-- Referral method -->
        <gov-form-group :invalid="form.$errors.has('referral_method')">
          <gov-label class="govuk-!-font-weight-bold" for="referral_method">
            Referral method
          </gov-label>
          <gov-hint for="referral_method">
            How does this service receive referrals?
          </gov-hint>
          <gov-select
            :value="form.referral_method"
            @input="$emit('update:referral_method', $event)"
            id="referral_method"
            name="referral_method"
            :options="referralMethodOptions"
          />
          <gov-error-message
            v-if="form.$errors.has('referral_method')"
            v-text="form.$errors.get('referral_method')"
            for="referral_method"
          />
        </gov-form-group>
        <!-- /Referral method -->

        <!-- Referral button text -->
        <gov-form-group v-if="referralIsInternalOrExternal" :invalid="form.$errors.has('referral_button_text')">
          <gov-label class="govuk-!-font-weight-bold" for="referral_button_text">
            Referral button text
          </gov-label>
          <gov-hint for="referral_button_text">
            The text to be displayed on the button to make the referral.
          </gov-hint>
          <gov-input
            :value="form.referral_button_text"
            @input="$emit('update:referral_button_text', $event)"
            id="referral_button_text"
            name="referral_button_text"
            type="text"
          />
          <gov-error-message
            v-if="form.$errors.has('referral_button_text')"
            v-text="form.$errors.get('referral_button_text')"
            for="referral_button_text"
          />
        </gov-form-group>
        <!-- /Referral button text -->

        <!-- Referral email -->
        <gov-form-group
          v-if="referralIsInternalOrExternal && (form.referral_method === 'internal')"
          :invalid="form.$errors.has('referral_email')"
        >
          <gov-label class="govuk-!-font-weight-bold" for="referral_email">
            Referral email
          </gov-label>
          <gov-hint for="referral_email">
            The email address which should be notified when referrals are made
          </gov-hint>
          <gov-input
            :value="form.referral_email"
            @input="$emit('update:referral_email', $event)"
            id="referral_email"
            name="referral_email"
            type="email"
            key="referral_email"
          />
          <gov-error-message
            v-if="form.$errors.has('referral_email')"
            v-text="form.$errors.get('referral_email')"
            for="referral_email"
          />
        </gov-form-group>
        <!-- /Referral email -->

        <!-- Referral URL -->
        <gov-form-group
          v-if="referralIsInternalOrExternal && (form.referral_method === 'external')"
          :invalid="form.$errors.has('referral_url')"
        >
          <gov-label class="govuk-!-font-weight-bold" for="referral_url">
            Referral URL
          </gov-label>
          <gov-hint for="referral_url">
            The URL that the user must visit to make a referral
          </gov-hint>
          <gov-input
            :value="form.referral_url"
            @input="$emit('update:referral_url', $event)"
            id="referral_url"
            name="referral_url"
            type="url"
            key="referral_url"
          />
          <gov-error-message
            v-if="form.$errors.has('referral_url')"
            v-text="form.$errors.get('referral_url')"
            for="referral_url"
          />
        </gov-form-group>
        <!-- /Referral URL -->

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
    "form.referral_method"(newReferralMethod) {
      if (newReferralMethod === null || newReferralMethod === "none") {
        this.$emit("update:referral_button_text", "");
        this.$emit("update:referral_email", "");
        this.$emit("update:referral_url", "");
      }

      if (newReferralMethod !== "internal") {
        this.$emit("update:referral_email", "");
      }

      if (newReferralMethod !== "external") {
        this.$emit("update:referral_url", "");
      }
    }
  }
};
</script>
