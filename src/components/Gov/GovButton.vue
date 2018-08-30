<template>
  <button @click="onClick" :type="type" class="govuk-button" :class="{ 'govuk-button--error': error }">
    <slot />
  </button>
</template>

<script>
export default {
  name: "GovButton",
  props: {
    type: {
      type: String,
      required: false,
      default: "submit"
    },
    expand: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.govuk-button--error {
  background-color: $govuk-error-colour;

  &:hover,
  &:focus {
    background-color: darken($govuk-error-colour, 5%);
  }
}
</style>
