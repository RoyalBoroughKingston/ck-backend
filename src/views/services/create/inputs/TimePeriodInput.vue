<template>
  <gov-form-group :invalid="form.$errors.has(opensAtPath) || form.$errors.has(closesAtPath)">
    <gov-label>Opening time</gov-label>
    <gov-select
      :value="opensAt"
      @input="$emit('update:opens_at', $event)"
      :id="opensAtPath"
      :name="opensAtPath"
      :options="hours"
      class="govuk-!-width-one-quarter"
    />&nbsp;<!--
  --><gov-select
      :value="closesAt"
      @input="$emit('update:closes_at', $event)"
      :id="closesAtPath"
      :name="closesAtPath"
      :options="hours"
      class="govuk-!-width-one-quarter"
    />
    <gov-error-message
      v-if="form.$errors.has(opensAtPath) || form.$errors.has(closesAtPath)"
      v-text="form.$errors.get(opensAtPath) || form.$errors.get(closesAtPath)"
      :for="opensAtPath"
    />
  </gov-form-group>
</template>

<script>
export default {
  name: "TimePeriodInput",
  props: {
    opensAt: {
      required: true
    },
    closesAt: {
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    opensAtPath: {
      type: String,
      required: true
    },
    closesAtPath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hours: [{ text: "--:--", value: null, disabled: true }]
    };
  },
  created() {
    for (let hour = 0; hour < 24; hour += 0.5) {
      const text =
        ("0" + (Math.floor(hour) % 24)).slice(-2) +
        ":" +
        ((hour % 1) * 60 + "0").slice(0, 2);
      const value = `${text}:00`;
      this.hours.push({ text, value });
    }
    this.hours.push({ text: "24:00", value: "23:59:59" });
  }
};
</script>
