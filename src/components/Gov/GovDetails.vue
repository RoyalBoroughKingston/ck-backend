<template>
  <details class="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text" v-text="summary">
        <slot name="summary" />
      </span>
    </summary>
    <div class="govuk-details__text">
      <slot />
    </div>
  </details>
</template>

<script>
export default {
  name: "GovDetails",
  props: {
    summary: {
      type: String,
      required: false
    }
  }
};
</script>
