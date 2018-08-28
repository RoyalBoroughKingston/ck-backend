<template>
  <label class="govuk-label">
    <slot />
  </label>
</template>

<script>
export default {
  name: "GovLabel",
  props: {
    for: {
      type: String,
      required: true
    }
  }
};
</script>
