<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-label :for="path">
      Day of month
    </gov-label>
    <gov-select
      :value="value"
      @input="$emit('input', $event)"
      :id="path"
      :name="path"
      :options="days"
    />
    <gov-error-message
      v-if="form.$errors.has(path)"
      v-text="form.$errors.get(path)"
      :for="path"
    />
  </gov-form-group>
</template>

<script>
import moment from "moment";

export default {
  name: "DayOfMonthInput",
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
      days: [{ text: "Please select", value: null, disabled: true }]
    };
  },
  created() {
    for (let day = 1; day <= 31; day++) {
      let text = moment({ year: 2018, month: 0, day }).format("Do");
      text = day > 28 ? `${text} (or last day of month)` : text;

      this.days.push({ text, value: day });
    }
  }
};
</script>
