<template>
  <div>
    <gov-heading size="l">Additional service information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>Additional information regarding the service, If a question is not relevant to your service please skip it.</gov-body>
        <gov-section-break size="l" />

        <ck-select-input
          :value="form.wait_time"
          @input="$emit('update:wait_time', $event); $emit('clear', 'wait_time')"
          id="wait_time"
          label="Average wait time (if applicable)"
          hint="General indication as to how long someone may have to wait for an appointment/slot after initial contact has been made, if this is not relevant to your service, or service as a drop-in, please skip this question."
          :options="waitTimeOptions"
          :error="form.$errors.get('wait_time')"
        />

        <ck-radio-input
          :value="form.is_free"
          @input="$emit('update:is_free', $event); $emit('clear', 'is_free')"
          id="is_free"
          label="Is the service free"
          hint="Indicates if the service is free or not (used for filtering on search)"
          :options="[{ value: true, label: 'Yes - The service is free' }, { value: false, label: 'No - there are elements of this service that must be paid for' }]"
          :error="form.$errors.get('is_free')"
        />

        <!-- Extra fee info -->
        <gov-inset-text v-if="form.is_free === false">
          <!-- Fees text -->
          <gov-form-group :invalid="form.$errors.has('fees_text')">
            <gov-label class="govuk-!-font-weight-bold" for="fees_text">
              How much does it cost? (if applicable)
            </gov-label>
            <gov-hint for="fees_text">
              Please indicate the basic cost of the service. If there are multiple price
              points, please provide an indicative range (eg. "5-10 per session")
              (max 75 characters).
            </gov-hint>
            <gov-input
              :value="form.fees_text"
              @input="$emit('update:fees_text', $event)"
              id="fees_text"
              name="fees_text"
              type="text"
              maxlength="75"
            />
            <gov-error-message
              v-if="form.$errors.has('fees_text')"
              v-text="form.$errors.get('fees_text')"
              for="fees_text"
            />
          </gov-form-group>
          <!-- /Fees text -->

          <!-- Fees URL -->
          <gov-form-group :invalid="form.$errors.has('fees_url')">
            <gov-label class="govuk-!-font-weight-bold" for="fees_url">
              Please provide a link to full pricing table (if applicable)
            </gov-label>
            <gov-input
              :value="form.fees_url"
              @input="$emit('update:fees_url', $event)"
              id="fees_url"
              name="fees_url"
              type="url"
            />
            <gov-error-message
              v-if="form.$errors.has('fees_url')"
              v-text="form.$errors.get('fees_url')"
              for="fees_url"
            />
          </gov-form-group>
          <!-- /Fees URL -->
        </gov-inset-text>
        <!-- /Extra fee info -->

        <!-- Testimonial -->
        <gov-form-group :invalid="form.$errors.has('testimonial')">
          <gov-label class="govuk-!-font-weight-bold" for="testimonial">
            Please provide a user quote to display on your service page
          </gov-label>
          <gov-hint for="testimonial">
            Quote from a user of the service, including their first name. If you
            don't have a quote to use, please skip this question - you can
            always add one later on (max 150 characters).
          </gov-hint>
          <gov-textarea
            :value="form.testimonial"
            @input="$emit('update:testimonial', $event)"
            id="testimonial"
            name="testimonial"
            maxlength="150"
          />
          <gov-error-message
            v-if="form.$errors.has('testimonial')"
            v-text="form.$errors.get('testimonial')"
            for="testimonial"
          />
        </gov-form-group>
        <!-- /Testimonial -->

        <!-- Video embed -->
        <gov-form-group :invalid="form.$errors.has('video_embed')">
          <gov-label class="govuk-!-font-weight-bold" for="video_embed">
            If you have one, please provide a link to a video that describes your service
          </gov-label>
          <gov-hint for="video_embed">
            The video should be a short (less than 5 min) description of what
            the service is, and how it can be accessed. Can be a link
            to YouTube or Vimeo.
          </gov-hint>
          <gov-input
            :value="form.video_embed"
            @input="$emit('update:video_embed', $event)"
            id="video_embed"
            name="video_embed"
            type="url"
          />
          <gov-error-message
            v-if="form.$errors.has('video_embed')"
            v-text="form.$errors.get('video_embed')"
            for="video_embed"
          />
        </gov-form-group>
        <!-- /Video embed -->

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfoTab",
  props: {
    form: {
      type: Object,
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
      ]
    };
  },
  watch: {
    "form.is_free"(newIsFree) {
      if (newIsFree) {
        return;
      }

      this.$emit("update:fees_text", "");
      this.$emit("update:fees_url", "");
    }
  }
};
</script>
