<template>
  <h1 v-if="tag === 'h1'" :class="computedClass">
    <slot />
  </h1>
  <h2 v-else-if="tag === 'h2'" :class="computedClass">
    <slot />
  </h2>
  <h3 v-else-if="tag === 'h3'" :class="computedClass">
    <slot />
  </h3>
  <h4 v-else-if="tag === 'h4'" :class="computedClass">
    <slot />
  </h4>
  <h5 v-else-if="tag === 'h5'" :class="computedClass">
    <slot />
  </h5>
  <h6 v-else-if="tag === 'h6'" :class="computedClass">
    <slot />
  </h6>
</template>

<script>
export default {
  name: "GovHeading",
  props: {
    size: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: false,
      default: "h1"
    }
  },
  computed: {
    computedClass() {
      return `govuk-heading-${this.size}`;
    }
  }
};
</script>
