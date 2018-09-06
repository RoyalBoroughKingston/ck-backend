<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-label :for="path">Weekday</gov-label>
    <gov-select
      :value="value"
      @input="$emit('input', $event)"
      :id="path"
      :name="path"
      :options="weekdays"
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
  name: "WeekdayInput",
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
      weekdays: [
        { text: "Please select", value: null, disabled: true },
        { text: "Monday", value: 1 },
        { text: "Tuesday", value: 2 },
        { text: "Wednesday", value: 3 },
        { text: "Thirsday", value: 4 },
        { text: "Friday", value: 5 },
        { text: "Saturday", value: 6 },
        { text: "Sunday", value: 7 }
      ]
    };
  }
};
</script>
