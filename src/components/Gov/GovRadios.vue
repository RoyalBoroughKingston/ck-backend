<template>
  <div class="govuk-radios" :class="{ 'govuk-radios--inline': inline }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GovRadios",
  props: {
    inline: {
      required: false,
      type: Boolean,
      default: false
    }
  }
};
</script>
