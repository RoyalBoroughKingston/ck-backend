<template>
  <gov-form-group :invalid="error !== null">

    <gov-label :for="id" class="govuk-!-font-weight-bold">
      <slot name="label">{{ label }}</slot>
    </gov-label>

    <slot name="hint">
      <gov-hint v-if="hint" :for="id" v-text="hint" />
    </slot>

    <gov-file-upload
      :value="value"
      @change="$emit('input', $event)"
      :id="id"
      :name="id"
      :accept="accept"
      ref="file"
    />

    <slot name="after-input" />

    <gov-error-message
      v-if="error !== null"
      v-text="error"
      :for="id"
    />

    <div v-if="value" class="govuk-!-margin-top-2">
      <gov-button @click="onRemove" type="button" error>Remove file</gov-button>
    </div>

  </gov-form-group>
</template>

<script>
export default {
  name: "CkFileInput",
  props: {
    value: {
      required: true
    },
    label: {
      required: true,
      type: String
    },
    hint: {
      required: false,
      type: String
    },
    error: {
      required: true
    },
    accept: {
      required: false,
      default: null
    },
    id: {
      required: true,
      type: String
    }
  },

  methods: {
    onRemove() {
      this.$refs.file.$el.value = "";
      this.$emit('input', null);
    }
  }
};
</script>
