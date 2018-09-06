<template>
  <gov-form-group :invalid="error !== null">

      <gov-label
        :for="id"
        class="govuk-!-font-weight-bold"
        v-text="label"
      />

      <gov-input
        :value="value"
        @input="$emit('input', $event)"
        :id="id"
        :name="id"
        :type="type"
      />

      <gov-error-message
        v-if="error !== null"
        v-text="error"
        :for="id"
      />

    </gov-form-group>
</template>

<script>
export default {
  name: "CkTextInput",
  props: {
    value: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    },
    error: {
      required: true
    },
    type: {
      required: false,
      type: String,
      default: "text"
    },
    id: {
      required: true,
      type: String
    }
  }
};
</script>
