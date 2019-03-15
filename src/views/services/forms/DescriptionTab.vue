<template>
  <div>
    <gov-heading size="l">Service description</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <ck-wysiwyg-input
          :value="description"
          @input="$emit('update:description', $event); $emit('clear', 'description')"
          id="description"
          label="Longer service description"
          :error="errors.get('description')"
          large
          :maxlength="1600"
        >
          <template slot="hint">
            <gov-hint for="description">
              Please provide a detailed description of the service. This will
              display on the service page and is the main way users will find
              out about your service.
            </gov-hint>
            <gov-hint for="description">
              You will want to include details of what you offer, what people
              can expect when they sign up, and the best way to get in touch.
              You can also include links to other sites or information.
            </gov-hint>
            <gov-hint for="description">
              If you are describing multiple services or activities, it may be
              better to add these to Connected Kingston as separate, individual
              services.
            </gov-hint>
            <gov-hint for="description">
              The best pages are ones formatted with bullet points, paragraphs and headers.
            </gov-hint>
            <gov-hint for="description">
              (Maximum 1600 Characters)
            </gov-hint>
          </template>
        </ck-wysiwyg-input>

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "DescriptionTab",
  props: {
    errors: {
      required: true
    },
    description: {
      required: true
    }
  }
};
</script>
