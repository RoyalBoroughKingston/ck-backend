<template>
  <div>
    <gov-heading size="l">Service description</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <ck-wysiwyg-input
          :value="description"
          @input="$emit('update:description', $event); $emit('clear', 'description')"
          id="description"
          label="Service description"
          :error="errors.get('description')"
        >
          <gov-hint slot="hint" for="description">
            Please enter a more detailed description of the service. This will be
            the main body of text on the page - though it shouldn't be too long.
            <br/><br/>
            The description should contain details about accessing the service,
            that sort of activities happen there, and who should get in touch
            (max 1600 characters).
          </gov-hint>
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
  },
};
</script>
