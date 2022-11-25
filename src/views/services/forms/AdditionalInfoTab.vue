<template>
  <div>
    <gov-heading size="l">Additional {{ type }} information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          This section allows you to add more information to your
          {{ type }} page. The more detail that can be provided, the better.
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="wait_time"
          @input="
            $emit('update:wait_time', $event);
            $emit('clear', 'wait_time');
          "
          id="wait_time"
          label="Usual wait time (if applicable)"
          :options="waitTimeOptions"
          :error="errors.get('wait_time')"
        >
          <template slot="hint">
            <gov-hint for="wait_time">
              Provide an indication of how long someone may have to wait to
              access your {{ type }} after initial contact has been made. You
              can amend this in future as and when circumstances change.
            </gov-hint>
            <gov-hint for="wait_time">
              If this is not relevant to your {{ type }}, please skip this
              question.
            </gov-hint>
          </template>
        </ck-select-input>

        <ck-radio-input
          :value="is_free"
          @input="
            $emit('update:is_free', $event);
            $emit('clear', 'is_free');
          "
          id="is_free"
          :label="`Is the ${type} free?`"
          :options="isFreeOptions"
          :error="errors.get('is_free')"
        >
          <template slot="hint">
            <gov-hint for="is_free">
              Indicates whether your {{ type }} is completely free, or if some
              elements of the service must be paid for. Users can filter their
              searches based on the answer you provide.
            </gov-hint>
            <gov-hint for="is_free">
              If the cost of your {{ type }} varies, you may want to split these
              into different {{ type }} listings.
            </gov-hint>
          </template>
        </ck-radio-input>

        <!-- Extra fee info -->
        <gov-inset-text v-if="is_free === false">
          <ck-text-input
            :value="fees_text"
            @input="
              $emit('update:fees_text', $event);
              $emit('clear', 'fees_text');
            "
            id="fees_text"
            label="How much does it cost? (if applicable)"
            :hint="`Please indicate the basic cost of the ${type}. If there are multiple price points, please provide an indicative range (eg. &quot;5-10 per session&quot;).`"
            type="text"
            :error="errors.get('fees_text')"
            :maxlength="75"
          />

          <ck-text-input
            :value="fees_url"
            @input="
              $emit('update:fees_url', $event);
              $emit('clear', 'fees_url');
            "
            id="fees_url"
            label="Please provide a link to full pricing table (if applicable)"
            type="url"
            :error="errors.get('fees_url')"
          />
        </gov-inset-text>
        <!-- /Extra fee info -->

        <ck-textarea-input
          :value="testimonial"
          @input="
            $emit('update:testimonial', $event);
            $emit('clear', 'testimonial');
          "
          id="testimonial"
          label="Quote from a satisfied user, client, beneficiary or customer"
          :maxlength="150"
          :error="errors.get('testimonial')"
        >
          <template slot="hint">
            <gov-hint for="testimonial">
              Please enter a quote from a service user highlighting a positive
              outcome to help promote your good work. For example:
            </gov-hint>
            <gov-hint for="testimonial">
              This {{ type }} changed my life!
            </gov-hint>
          </template>
        </ck-textarea-input>

        <ck-text-input
          :value="video_embed"
          @input="
            $emit('update:video_embed', $event);
            $emit('clear', 'video_embed');
          "
          id="video_embed"
          :label="`${$options.filters.ucfirst(type)} video`"
          type="url"
          :error="errors.get('video_embed')"
        >
          <template slot="hint">
            <gov-hint for="video_embed">
              If you have a short video (less than 5 minutes) showcasing your
              {{ type }}, please add a link below to the site that hosts it.
            </gov-hint>
            <gov-hint for="video_embed">
              Youtube and Vimeo links are accepted.
            </gov-hint>
            <gov-hint for="video_embed">
              <gov-link :href="videoEmbedHelpHref">
                Need help editing or creating a {{ type }} video?
              </gov-link>
            </gov-hint>
          </template>
        </ck-text-input>
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="m" visible />

    <gov-heading size="l">Contact details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          Please provide your {{ type }}’s public-facing contact details. These
          will be displayed on your {{ type }}’s page on the Connected Kingston
          website.
        </gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="contact_name"
          @input="
            $emit('update:contact_name', $event);
            $emit('clear', 'contact_name');
          "
          id="contact_name"
          label="Contact name"
          :hint="`Provide the contact name (First name & Surname) for this ${type}, or a generic entry if this isn’t applicable e.g. ‘Enquiries’, or ‘Helpdesk’.`"
          type="text"
          :error="errors.get('contact_name')"
        />

        <ck-text-input
          :value="contact_phone"
          @input="
            $emit('update:contact_phone', $event);
            $emit('clear', 'contact_phone');
          "
          id="contact_phone"
          label="Contact phone number"
          type="tel"
          :error="errors.get('contact_phone')"
        >
          <template slot="hint">
            <gov-hint for="contact_phone">
              Please provide a public facing phone number for people to contact
              you on.
            </gov-hint>
            <gov-hint for="contact_phone">
              Please use the following formatting:
              <br />
              020 8XXX XXXX for landline or 07XXX XXXXXX for mobile.
            </gov-hint>
          </template>
        </ck-text-input>

        <ck-text-input
          :value="contact_email"
          @input="
            $emit('update:contact_email', $event);
            $emit('clear', 'contact_email');
          "
          id="contact_email"
          :label="`Public ${type} email address`"
          :hint="`Please provide the contact email address for the ${type}.`"
          type="email"
          :error="errors.get('contact_email')"
        />

        <gov-section-break size="l" />

        <gov-heading size="m">Social media links</gov-heading>

        <gov-body>
          If you have any social media accounts for your {{ type }}, please
          select the appropriate platform from the dropdown and add the relevant
          URL.
        </gov-body>
        <gov-body>
          If you don’t have accounts for the specific {{ type }}, please add the
          accounts of the overall organisation.
        </gov-body>

        <social-medias-input
          :social-medias="social_medias"
          @input="$emit('update:social_medias', $event)"
          :errors="errors"
        />
      </gov-grid-column>
    </gov-grid-row>

    <slot />
  </div>
</template>

<script>
import SocialMediasInput from "@/views/services/inputs/SocialMediasInput";

export default {
  name: "AdditionalInfoTab",
  components: { SocialMediasInput },
  props: {
    errors: {
      required: true,
    },
    type: {
      required: true,
    },
    wait_time: {
      required: true,
    },
    is_free: {
      required: true,
    },
    fees_text: {
      required: true,
    },
    fees_url: {
      required: true,
    },
    testimonial: {
      required: true,
    },
    video_embed: {
      required: true,
    },
    contact_name: {
      required: true,
    },
    contact_phone: {
      required: true,
    },
    contact_email: {
      required: true,
    },
    social_medias: {
      required: true,
    },
  },
  computed: {
    waitTimeOptions() {
      return [
        { text: `Not applicable for this ${this.type}`, value: null },
        { text: "One week", value: "one_week" },
        { text: "Two weeks", value: "two_weeks" },
        { text: "Three weeks", value: "three_weeks" },
        { text: "One month", value: "month" },
        { text: "Longer than a month", value: "longer" },
      ];
    },
    isFreeOptions() {
      return [
        { value: true, label: `Yes - The ${this.type} is free` },
        {
          value: false,
          label: `No - there are elements of this ${this.type} that must be paid for`,
        },
      ];
    },
    videoEmbedHelpHref() {
      const to = "info@connectedkingston.uk";
      const subject = `Make a video for my ${this.type}`;
      const body = `My ${this.type} is: xxx\n\nI am interested in making a video for my ${this.type} page on Connected Kingston.`;

      return `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    },
  },
  watch: {
    is_free(newIsFree) {
      if (newIsFree) {
        this.$emit("update:fees_text", "");
        this.$emit("update:fees_url", "");
      }
    },
  },
};
</script>
