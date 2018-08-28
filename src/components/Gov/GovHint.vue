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
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return [this.for, "hint"].join("-");
    }
  }
};
</script>
