<template>
  <p v-if="tag === 'p'" :class="computedClass">
    <slot />
  </p>
  <div v-else-if="tag === 'div'" :class="computedClass">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GovBody",
  props: {
    size: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: false,
      default: "p"
    }
  },
  computed: {
    computedClass() {
      return `govuk-body-${this.size}`;
    }
  }
};
</script>
