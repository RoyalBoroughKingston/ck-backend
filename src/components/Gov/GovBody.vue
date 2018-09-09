<template>
  <!-- For paragraph tags -->
  <p v-if="tag === 'p'" :class="computedClass">
    <slot />
  </p>

  <!-- For div tags -->
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
      required: false
    },
    tag: {
      type: String,
      required: false,
      default: "p"
    }
  },
  computed: {
    computedClass() {
      return this.size ? ["govuk-body", this.size].join("-") : "govuk-body";
    }
  }
};
</script>
