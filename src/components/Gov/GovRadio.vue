<template>
  <div class="govuk-radios__item">
    <input
      :checked="bindTo === value"
      @change="$emit('input', value)"
      class="govuk-radios__input"
      :id="id"
      :name="name"
      type="radio"
      :value="value"
      :disabled="disabled"
    />
    <gov-label class="govuk-radios__label" :for="id">{{ label }}</gov-label>
  </div>
</template>

<script>
export default {
  name: "GovRadioInput",
  model: {
    prop: "bindTo",
    event: "input",
  },
  props: {
    bindTo: {
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
};
</script>
