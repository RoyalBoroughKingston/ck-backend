<template>
  <span :id="id" class="govuk-error-message">
    <slot />
  </span>
</template>

<script>
export default {
  name: "GovErrorMessage",
  props: {
    for: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return [this.for, "error"].join("-");
    }
  }
};
</script>
