<template>
  <gov-form-group :invalid="error !== null">

      <gov-label :for="id" class="govuk-!-font-weight-bold">
        <slot name="label">{{ label }}</slot>
      </gov-label>

      <slot name="hint">
        <gov-hint v-if="hint" :for="id" v-text="hint" />
      </slot>

      <gov-select
        :value="value"
        @input="$emit('input', $event)"
        :id="id"
        :name="id"
        :options="options"
      />

      <slot name="after-input" />

      <gov-error-message
        v-if="error !== null"
        v-text="error"
        :for="id"
      />

    </gov-form-group>
</template>

<script>
export default {
  name: "CkSelectInput",
  props: {
    value: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    },
    hint: {
      required: false,
      type: String
    },
    error: {
      required: true
    },
    options: {
      required: true,
      type: Array
    },
    id: {
      required: true,
      type: String
    }
  }
};
</script>
