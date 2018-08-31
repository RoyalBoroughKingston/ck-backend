<template>
  <span :class="computedClass">
    <slot />
  </span>
</template>

<script>
export default {
  name: "GovCaption",
  props: {
    size: {
      type: String,
      required: true
    }
  },
  computed: {
    computedClass() {
      return `govuk-caption-${this.size}`;
    }
  }
};
</script>
