<template>
  <router-link v-if="to" :to="to" class="govuk-button" :class="computedClasses">
    <slot />
  </router-link>

  <button v-else @click="onClick" :type="type" class="govuk-button" :class="computedClasses">
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
    },
    start: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      required: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  computed: {
    computedClasses() {
      return {
        expand: this.expand,
        "govuk-button--error": this.error,
        "govuk-button--start": this.start
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.govuk-button {
  &.govuk-button--error {
    background-color: $govuk-error-colour;

    &:hover,
    &:focus {
      background-color: darken($govuk-error-colour, 5%);
    }
  }
}
</style>
