<template>
  <gov-form-group :invalid="error !== null">

      <gov-label :for="id" class="govuk-!-font-weight-bold">
        <slot name="label">{{ label }}</slot>
      </gov-label>

      <slot name="hint">
        <gov-hint v-if="hint" :for="id" v-text="hint" />
      </slot>

      <gov-file-upload
        :value="value"
        @change="$emit('input', $event)"
        :id="id"
        :name="id"
        :accept="accept"
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
  name: "CkFileInput",
  props: {
    value: {
      required: true
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
    accept: {
      required: false,
      default: null
    },
    id: {
      required: true,
      type: String
    }
  }
};
</script>
