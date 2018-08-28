<template>
  <hr class="govuk-section-break" :class="computedClass">
</template>

<script>
export default {
  name: "GovSectionBreak",
  props: {
    size: {
      type: String,
      required: false
    }
  },
  computed: {
    computedClass() {
      return this.size ? `govuk-section-break--${this.size}` : null;
    }
  }
};
</script>
