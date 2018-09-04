<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-radios>
      <gov-label class="govuk-!-font-weight-bold" :for="path" v-text="label" />
      <gov-hint :for="path" v-text="hint" />
      <gov-radio
        v-model="enabled"
        :id="`${path}_disabled`"
        :name="path"
        label="No specific requirement"
        :value="false"
      />
      <gov-radio
        v-model="enabled"
        :id="`${path}_enabled`"
        :name="path"
        label="Other"
        :value="true"
      />
    </gov-radios>

    <gov-inset-text v-if="enabled === true">
      <gov-hint>
        (max. 75 characters)
      </gov-hint>
      <gov-textarea
        :value="value"
        @input="onInput"
        :id="path"
        :name="path"
        type="text"
        maxlength="75"
      />
    </gov-inset-text>

    <gov-error-message
      v-if="form.$errors.has(path)"
      v-text="form.$errors.get(path)"
      :for="path"
    />
  </gov-form-group>
</template>

<script>
export default {
  name: "CriteriaInput",
  props: {
    value: {
      type: String,
      required: true
    },
    form: {
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
      enabled: null
    };
  },
  watch: {
    enabled(enabled) {
      if (!enabled) {
        this.$emit("input", "");
      }
    }
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    }
  }
}
</script>
