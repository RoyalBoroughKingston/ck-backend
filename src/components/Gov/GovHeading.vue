<template>
  <!-- For h1 tags -->
  <h1 v-if="tag === 'h1'" :class="computedClass">
    <slot />
  </h1>

  <!-- For h2 tags -->
  <h2 v-else-if="tag === 'h2'" :class="computedClass">
    <slot />
  </h2>

  <!-- For h3 tags -->
  <h3 v-else-if="tag === 'h3'" :class="computedClass">
    <slot />
  </h3>

  <!-- For h4 tags -->
  <h4 v-else-if="tag === 'h4'" :class="computedClass">
    <slot />
  </h4>

  <!-- For h5 tags -->
  <h5 v-else-if="tag === 'h5'" :class="computedClass">
    <slot />
  </h5>

  <!-- For h6 tags -->
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
      required: false,
      default: "m"
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
