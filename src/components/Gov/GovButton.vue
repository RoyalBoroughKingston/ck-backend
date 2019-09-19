<template>
  <router-link
    v-if="to"
    :to="to"
    class="govuk-button"
    :class="computedClasses"
    :disabled="disabled"
  >
    <slot />
  </router-link>

  <a
    v-else-if="href"
    :href="href"
    class="govuk-button"
    :class="computedClasses"
    :disabled="disabled"
  >
    <slot />
  </a>

  <button
    v-else
    @click="onClick"
    :type="type"
    class="govuk-button"
    :class="computedClasses"
    :disabled="disabled"
  >
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
    },
    href: {
      required: false
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    success: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
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
        "govuk-button--start": this.start,
        "ck-button--active": this.active,
        "ck-button--success": this.success,
        "ck-button--disabled": this.disabled,
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.govuk-button {
  &.ck-button--active {
    @extend .govuk-button:hover, .govuk-button:focus;
    z-index: 1;
  }

  &.govuk-button--error {
    background-color: $govuk-error-colour !important;

    &:hover,
    &:focus {
      background-color: darken($govuk-error-colour, 5%) !important;
    }
  }

  &.ck-button--success {
    background-color: govuk-colour("green") !important;

    &:hover,
    &:focus {
      background-color: darken(govuk-colour("green"), 5%) !important;
    }
  }

  &.ck-button--disabled {
    pointer-events: none;
  }
}
</style>
