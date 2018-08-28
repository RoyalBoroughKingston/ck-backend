<template>
  <div class="govuk-form-group" :class="{ 'govuk-form-group--error': invalid }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GovFormGroup",
  props: {
    invalid: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
