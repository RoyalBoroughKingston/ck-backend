<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-label :for="path">
      Occurrence in month
    </gov-label>
    <gov-select
      :value="value"
      @input="$emit('input', $event)"
      :id="path"
      :name="path"
      :options="occurrences"
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
  name: "OccurrenceOfMonthInput",
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
      occurrences: [
        { text: "Please select", value: null, disabled: true },
        { text: "First", value: 1 },
        { text: "Second", value: 2 },
        { text: "Third", value: 3 },
        { text: "Fourth", value: 4 },
        { text: "Last", value: 5 }
      ]
    };
  }
};
</script>
