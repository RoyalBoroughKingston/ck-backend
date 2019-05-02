<template>
  <div>
    <gov-heading size="l">What does your {{ type }} offer</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          These sections should describe what your {{ type }} offers and is the
          main body of content on your page on Connected Kingston.
        </gov-body>

        <gov-section-break size="l" />

        <ck-textarea-input
          :value="intro"
          @input="$emit('update:intro', $event); $emit('clear', 'intro')"
          id="intro"
          :label="`Your ${type}, an overview?`"
          :hint="`Write a brief description of what your ${type} does.`"
          :maxlength="300"
          :error="errors.get('intro')"
        />

        <ck-wysiwyg-input
          :value="description"
          @input="$emit('update:description', $event); $emit('clear', 'description')"
          id="description"
          label="Long description"
          :hint="`This is the largest body of text on your page. Fill it with everything else someone should know about your ${type}. Use headers, bullets and formatting for the maximum effect.`"
          :error="errors.get('description')"
          large
          :maxlength="1600"
        />

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
    type: {
      required: true,
      type: String
    },
    intro: {
      required: true
    },
    description: {
      required: true
    }
  }
};
</script>
