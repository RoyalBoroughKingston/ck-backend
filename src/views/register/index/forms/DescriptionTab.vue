<template>
  <div>
    <gov-heading size="l">What does your {{ service.type }} offer</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          These sections should describe what your {{ service.type }} offers and
          is the main body of content on your page on Connected Kingston.
        </gov-body>

        <gov-section-break size="l" />

        <ck-textarea-input
          :value="service.intro"
          @input="$emit('input', { field: 'intro', value: $event })"
          id="intro"
          :label="`Your ${service.type}, an overview`"
          :hint="`Write a brief description of what your ${service.type} does.`"
          :maxlength="300"
          :error="errors.get('service.intro')"
        />

          <gov-heading size="m">What you offer</gov-heading>

        <gov-body>
          Include a bullet list of some of the things you do as a
          {{ service.type }}.
        </gov-body>

        <gov-body>
          For example: (Weekly Meetups, Peer Support, Group Therapy)
        </gov-body>

        <ck-offerings-input
          :offerings="service.offerings"
          @input="$emit('input', { field: 'offerings', value: $event })"
          :errors="errors"
        />

        <ck-wysiwyg-input
          :value="service.description"
          @input="$emit('input', { field: 'description', value: $event })"
          id="description"
          label="Long description"
          :hint="`This is the largest body of text on your page. Fill it with everything else someone should know about your ${service.type}. Use headers, bullets and formatting for the maximum effect.`"
          :error="errors.get('service.description')"
          large
          :maxlength="3000"
        />

        <slot />
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import CkOfferingsInput from '@/views/services/inputs/OfferingsInput.vue';

export default {
  components: {
    CkOfferingsInput
  },

  props: {
    service: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  }
};
</script>
