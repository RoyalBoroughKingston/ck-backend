<template>
  <legend class="govuk-fieldset__legend" :class="computedClass">
    <slot />
  </legend>
</template>

<script>
export default {
  name: "GovFieldsetLegend",
  props: {
    size: {
      type: String,
      required: true
    }
  },
  computed: {
    computedClass() {
      return `govuk-fieldset__legend--${this.size}`;
    }
  }
};
</script>
