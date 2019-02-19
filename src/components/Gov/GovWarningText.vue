<template>
  <div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">{{ title }}</span>
      <slot />
    </strong>
  </div>
</template>

<script>
export default {
  name: "GovWarningText",

  props: {
    title: {
      required: false,
      type: String,
      default: "Warning"
    }
  }
};
</script>
