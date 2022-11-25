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
      @change="
        $emit('input', $event);
        removeExisting = false;
      "
      :id="id"
      :name="id"
      :accept="accept"
      ref="file"
    />

    <slot name="after-input" />

    <!-- Existing image -->
    <template v-if="image">
      <img
        v-if="existingUrl && !value && !removeExisting"
        :src="existingUrl"
        :key="`ExistingImage::${_uid}`"
        alt="Organisation logo"
      />
      <!-- Uploaded image -->
      <img
        v-else-if="value"
        :src="value"
        :key="`UploadedImage::${_uid}`"
        alt="Uploaded organisation logo"
      />
    </template>

    <gov-error-message v-if="error !== null" v-text="error" :for="id" />

    <slot name="after-error-message" />

    <div
      v-if="(existingUrl && !removeExisting) || value"
      class="govuk-!-margin-top-2"
    >
      <gov-button @click="onRemove" type="button" error>Remove file</gov-button>
    </div>
  </gov-form-group>
</template>

<script>
export default {
  name: "CkFileInput",
  props: {
    value: {
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
    error: {
      required: true,
    },
    accept: {
      required: false,
      default: null,
    },
    id: {
      required: true,
      type: String,
    },
    existingUrl: {
      required: false,
      type: String,
    },
    image: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      removeExisting: false,
    };
  },

  methods: {
    onRemove() {
      // For uploaded file.
      if (this.value) {
        this.$refs.file.$el.value = "";
        this.$emit("input", null);
        return;
      }

      // For existing file.
      this.removeExisting = true;
      this.$emit("input", false);
    },
  },
};
</script>
