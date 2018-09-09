<template>
  <span :id="id" class="govuk-hint">
    <slot />
  </span>
</template>

<script>
export default {
  name: "GovHint",
  props: {
    for: {
      type: String
    }
  },
  computed: {
    id() {
      return this.for ? [this.for, "hint"].join("-") : null;
    }
  }
};
</script>
