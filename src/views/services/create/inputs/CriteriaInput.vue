<template>
  <div>
    <ck-radio-input
      v-model="enabled"
      :id="`${path}_radio`"
      :label="label"
      :hint="hint"
      :options="[{ value: false, label: 'No specific requirement' }, { value: true, label: 'Other' }]"
      :error="errors.get(path)"
    />

    <gov-inset-text v-if="enabled === true">
      <ck-textarea-input
        :value="value"
        @input="$emit('input', $event); $emit('clear', path)"
        :id="path"
        label="Criteria details"
        hint="(max. 75 characters)"
        :maxlength="75"
        :error="errors.get(path)"
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
    errors: {
      type: Object,
      required: true
    },
    path: {
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
      enabled: (this.value !== "")
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
