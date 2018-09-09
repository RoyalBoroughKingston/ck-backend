<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GovGridColumn",
  props: {
    width: {
      type: String,
      required: true
    }
  },
  computed: {
    computedClass() {
      return `govuk-grid-column-${this.width}`;
    }
  }
};
</script>
