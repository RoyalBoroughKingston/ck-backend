<template>
  <div>
    <gov-heading size="l">
      Additional {{ service.type }} information
    </gov-heading>

    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          This section allows you to add more information to your
          {{ service.type }} page. The more detail that can be provided, the
          better.
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="service.wait_time"
          @input="$emit('input', { field: 'wait_time', value: $event })"
          id="wait_time"
          label="Usual wait time (if applicable)"
          :options="waitTimeOptions"
          :error="errors.get('service.wait_time')"
        >
          <template slot="hint">
            <gov-hint for="wait_time">
              Provide an indication of how long someone may have to wait to
              access your {{ service.type }} after initial contact has been
              made. You can amend this in future as and when circumstances
              change.
            </gov-hint>

            <gov-hint for="wait_time">
              If this is not relevant to your {{ service.type }}, please skip
              this question.
            </gov-hint>
          </template>
        </ck-select-input>

        <ck-radio-input
          :value="service.is_free"
          @input="$emit('input', { field: 'is_free', value: $event })"
          id="is_free"
          :label="`Is the ${service.type} free?`"
          :options="isFreeOptions"
          :error="errors.get('service.is_free')"
        >
          <template slot="hint">
            <gov-hint for="is_free">
              Indicates whether your {{ service.type }} is completely free, or
              if some elements of the service must be paid for. Users can filter
              their searches based on the answer you provide.
            </gov-hint>

            <gov-hint for="is_free">
              If the cost of your {{ service.type }} varies, you may want to
              split these into different {{ service.type }} listings.
            </gov-hint>
          </template>
        </ck-radio-input>

        <!-- Extra fee info -->
        <gov-inset-text v-if="service.is_free === false">
          <ck-text-input
            :value="service.fees_text"
            @input="$emit('input', { field: 'fees_text', value: $event })"
            id="fees_text"
            label="How much does it cost? (if applicable)"
            :hint="`Please indicate the basic cost of the ${service.type}. If there are multiple price points, please provide an indicative range (eg. &quot;5-10 per session&quot;).`"
            type="text"
            :error="errors.get('service.fees_text')"
            :maxlength="75"
          />

          <ck-text-input
            :value="service.fees_url"
            @input="$emit('input', { field: 'fees_url', value: $event })"
            id="fees_url"
            label="Please provide a link to full pricing table (if applicable)"
            type="url"
            :error="errors.get('service.fees_url')"
          />
        </gov-inset-text>
        <!-- /Extra fee info -->

        <ck-textarea-input
          :value="service.testimonial"
          @input="$emit('input', { field: 'testimonial', value: $event })"
          id="testimonial"
          label="Quote from a satisfied user, client, beneficiary or customer"
          :maxlength="150"
          :error="errors.get('service.testimonial')"
        >
          <template slot="hint">
            <gov-hint for="testimonial">
              Please enter a quote from a service user highlighting a positive
              outcome to help promote your good work. For example:
            </gov-hint>

            <gov-hint for="testimonial">
              This {{ service.type }} changed my life!
            </gov-hint>
          </template>
        </ck-textarea-input>

        <ck-text-input
          :value="service.video_embed"
          @input="$emit('input', { field: 'video_embed', value: $event })"
          id="video_embed"
          :label="`${$options.filters.ucfirst(service.type)} video`"
          type="url"
          :error="errors.get('service.video_embed')"
        >
          <template slot="hint">
            <gov-hint for="video_embed">
              If you have a short video (less than 5 minutes) showcasing your
              {{ service.type }}, please add a link below to the site that hosts
              it.
            </gov-hint>

            <gov-hint for="video_embed">
              Youtube and Vimeo links are accepted.
            </gov-hint>

            <gov-hint for="video_embed">
              <gov-link :href="videoEmbedHelpHref">
                Need help editing or creating a {{ service.type }} video?
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
          Please provide your {{ service.type }}’s public-facing contact
          details. These will be displayed on your {{ service.type }}’s page on
          the Connected Kingston website.
        </gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="service.contact_name"
          @input="$emit('input', { field: 'contact_name', value: $event })"
          id="contact_name"
          label="Contact name"
          :hint="`Provide the contact name (First name & Surname) for this ${service.type}, or a generic entry if this isn’t applicable e.g. ‘Enquiries’, or ‘Helpdesk’.`"
          type="text"
          :error="errors.get('service.contact_name')"
        />

        <ck-text-input
          :value="service.contact_phone"
          @input="$emit('input', { field: 'contact_phone', value: $event })"
          id="contact_phone"
          label="Contact phone number"
          type="tel"
          :error="errors.get('service.contact_phone')"
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
          :value="service.contact_email"
          @input="$emit('input', { field: 'contact_email', value: $event })"
          id="contact_email"
          :label="`Public ${service.type} email address`"
          :hint="`Please provide the contact email address for the ${service.type}.`"
          type="email"
          :error="errors.get('service.contact_email')"
        />

        <gov-section-break size="l" />

        <gov-heading size="m">Social media links</gov-heading>

        <gov-body>
          If you have any social media accounts for your {{ service.type }},
          please select the appropriate platform from the dropdown and add the
          relevant URL.
        </gov-body>
        <gov-body>
          If you don’t have accounts for the specific {{ service.type }}, please
          add the accounts of the overall organisation.
        </gov-body>

        <social-medias-input
          :social-medias="service.social_medias"
          @input="$emit('input', { field: 'social_medias', value: $event })"
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
  components: {
    SocialMediasInput,
  },

  props: {
    service: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      required: true,
    },
  },

  computed: {
    waitTimeOptions() {
      return [
        { text: `Not applicable for this ${this.service.type}`, value: null },
        { text: "One week", value: "one_week" },
        { text: "Two weeks", value: "two_weeks" },
        { text: "Three weeks", value: "three_weeks" },
        { text: "One month", value: "month" },
        { text: "Longer than a month", value: "longer" },
      ];
    },

    isFreeOptions() {
      return [
        { value: true, label: `Yes - The ${this.service.type} is free` },
        {
          value: false,
          label: `No - there are elements of this ${this.service.type} that must be paid for`,
        },
      ];
    },

    videoEmbedHelpHref() {
      const to = "info@connectedkingston.uk";
      const subject = `Make a video for my ${this.service.type}`;
      const body = `My ${this.service.type} is: xxx\n\nI am interested in making a video for my ${this.service.type} page on Connected Kingston.`;

      return `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    },
  },
};
</script>
