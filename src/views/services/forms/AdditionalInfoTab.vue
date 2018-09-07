<template>
  <div>
    <gov-heading size="l">Additional service information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>Additional information regarding the service, If a question is not relevant to your service please skip it.</gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="wait_time"
          @input="$emit('update:wait_time', $event); $emit('clear', 'wait_time')"
          id="wait_time"
          label="Average wait time (if applicable)"
          hint="General indication as to how long someone may have to wait for an appointment/slot after initial contact has been made, if this is not relevant to your service, or service as a drop-in, please skip this question."
          :options="waitTimeOptions"
          :error="errors.get('wait_time')"
        />

        <ck-radio-input
          :value="is_free"
          @input="$emit('update:is_free', $event); $emit('clear', 'is_free')"
          id="is_free"
          label="Is the service free"
          hint="Indicates if the service is free or not (used for filtering on search)"
          :options="isFreeOptions"
          :error="errors.get('is_free')"
        />

        <!-- Extra fee info -->
        <gov-inset-text v-if="is_free === false">
          <ck-text-input
            :value="fees_text"
            @input="$emit('update:fees_text', $event); $emit('clear', 'fees_text')"
            id="fees_text"
            label="How much does it cost? (if applicable)"
            hint='Please indicate the basic cost of the service. If there are multiple price points, please provide an indicative range (eg. "5-10 per session") (max 75 characters).'
            type="text"
            :error="errors.get('fees_text')"
            :maxlength="75"
          />

          <ck-text-input
            :value="fees_url"
            @input="$emit('update:fees_url', $event); $emit('clear', 'fees_url')"
            id="fees_url"
            label="Please provide a link to full pricing table (if applicable)"
            type="url"
            :error="errors.get('fees_url')"
          />
        </gov-inset-text>
        <!-- /Extra fee info -->

        <ck-textarea-input
          :value="testimonial"
          @input="$emit('update:testimonial', $event); $emit('clear', 'testimonial')"
          id="testimonial"
          label="Please provide a user quote to display on your service page"
          hint="Quote from a user of the service, including their first name. If you don't have a quote to use, please skip this question - you can always add one later on (max 150 characters)."
          :maxlength="150"
          :error="errors.get('testimonial')"
        />

        <ck-text-input
          :value="video_embed"
          @input="$emit('update:video_embed', $event); $emit('clear', 'video_embed')"
          id="video_embed"
          label="If you have one, please provide a link to a video that describes your service"
          hint="The video should be a short (less than 5 min) description of what the service is, and how it can be accessed. Can be a link to YouTube or Vimeo."
          type="url"
          :error="errors.get('video_embed')"
        />

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfoTab",
  props: {
    errors: {
      required: true
    },
    wait_time: {
      required: true
    },
    is_free: {
      required: true
    },
    fees_text: {
      required: true
    },
    fees_url: {
      required: true
    },
    testimonial: {
      required: true
    },
    video_embed: {
      required: true
    }
  },
  data() {
    return {
      waitTimeOptions: [
        { text: "Not applicable for this service", value: null },
        { text: "One week", value: "one_week" },
        { text: "Two weeks", value: "two_weeks" },
        { text: "Three weeks", value: "three_weeks" },
        { text: "One month", value: "month" },
        { text: "Longer than a month", value: "longer" }
      ],
      isFreeOptions: [
        { value: true, label: "Yes - The service is free" },
        {
          value: false,
          label: "No - there are elements of this service that must be paid for"
        }
      ]
    };
  },
  watch: {
    is_free(newIsFree) {
      if (newIsFree) {
        this.$emit("update:fees_text", "");
        this.$emit("update:fees_url", "");
      }
    }
  }
};
</script>
