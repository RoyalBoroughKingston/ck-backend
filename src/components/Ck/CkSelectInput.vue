<template>
  <gov-form-group :invalid="error !== null">
    <gov-label :for="id" class="govuk-!-font-weight-bold">
      <slot name="label">{{ label }}</slot>
    </gov-label>

    <slot name="hint">
      <gov-hint v-if="hint" :for="id" v-text="hint" />
    </slot>

    <gov-select
      v-if="options"
      :value="value"
      @input="$emit('input', $event)"
      :id="id"
      :name="id"
      :options="options"
      :width="width"
      :class="{ 'govuk-select--icons': hasIcons }"
      :disabled="disabled"
    />

    <gov-select
      v-else
      :value="value"
      @input="$emit('input', $event)"
      :id="id"
      :name="id"
      :width="width"
      :class="{ 'govuk-select--icons': hasIcons }"
      :disabled="disabled"
    >
      <slot />
    </gov-select>

    <slot name="after-input" />

    <gov-error-message v-if="error !== null" v-text="error" :for="id" />
  </gov-form-group>
</template>

<script>
export default {
  name: "CkSelectInput",
  props: {
    value: {
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
    error: {
      required: true,
    },
    options: {
      required: false,
      type: Array,
    },
    id: {
      required: true,
      type: String,
    },
    width: {
      type: Number,
      required: false,
    },
    hasIcons: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.govuk-select {
  &.govuk-select--icons {
    font-family: "Font Awesome 5 Free", "nta", Arial, sans-serif;
  }
}
</style>
