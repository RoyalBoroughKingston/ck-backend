<template>
  <div>
    <ck-radio-input
      v-model="enabled"
      :id="`${id}_radio`"
      :label="label"
      :hint="hint"
      :options="[{ value: false, label: 'No specific requirement' }, { value: true, label: 'Other' }]"
      :error="error"
    />

    <gov-inset-text v-if="enabled === true">
      <ck-textarea-input
        :value="value"
        @input="$emit('input', $event)"
        :id="id"
        label="Criteria details"
        :hint="`(max. ${maxLength} characters)`"
        :maxlength="maxLength"
        :error="error"
      />
    </gov-inset-text>
  </div>
</template>

<script>
export default {
  name: "CriteriaInput",
  props: {
    value: {
      type: String,
      required: true
    },
    error: {
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      enabled: this.value !== "",
      maxLength: 150
    };
  },
  watch: {
    enabled(enabled) {
      if (!enabled) {
        this.$emit("input", "");
      }
    }
  }
};
</script>
