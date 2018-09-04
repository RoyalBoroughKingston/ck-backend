<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-label :for="path">Frequency type</gov-label>
    <gov-select
      :value="value"
      @input="$emit('input', $event)"
      :id="path"
      :name="path"
      :options="frequencies"
    />
    <gov-error-message
      v-if="form.$errors.has(path)"
      v-text="form.$errors.get(path)"
      :for="path"
    />
  </gov-form-group>
</template>

<script>
export default {
  name: "FrequencyInput",
  props: {
    value: {
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      frequencies: [
        { text: "Please select", value: null, disabled: true },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
        { text: "Fortnightly", value: "fortnightly" },
        { text: "Nth occurrence of month", value: "nth_occurrence_of_month" }
      ]
    };
  }
};
</script>
