<template>
  <gov-form-group :invalid="error !== null">
    <gov-radios>

      <gov-label :for="id" class="govuk-!-font-weight-bold">
        <slot name="label">{{ label }}</slot>
      </gov-label>

      <slot name="hint">
        <gov-hint v-if="hint" :for="id" v-text="hint" />
      </slot>

      <gov-radio
        v-for="(option, index) in options"
        :key="index"
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${id}_${index}`"
        :name="id"
        :label="option.label"
        :value="option.value"
        :disabled="disabled"
      />

      <slot name="after-input" />

      <gov-error-message
        v-if="error !== null"
        v-text="error"
        :for="id"
      />

    </gov-radios>
  </gov-form-group>
</template>

<script>
export default {
  name: "CkRadioInput",
  props: {
    value: {
      required: true
    },
    label: {
      required: false,
      type: String
    },
    hint: {
      required: false,
      type: String
    },
    error: {
      required: true
    },
    id: {
      required: true,
      type: String
    },
    options: {
      required: true,
      type: Array
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  }
};
</script>
