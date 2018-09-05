<template>
  <div class="govuk-error-summary" role="alert" tabindex="-1">
    <slot name="title">
      <h2 class="govuk-error-summary__title">
        {{ title }}
      </h2>
    </slot>
    <div class="govuk-error-summary__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "GovErrorSummary",
  props: {
    title: {
      required: false,
      type: String,
      default: ""
    }
  }
};
</script>
