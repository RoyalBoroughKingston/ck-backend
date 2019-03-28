<template>
  <gov-form-group :invalid="form.$errors.any()">

    <gov-label :for="id" class="govuk-!-font-weight-bold">
      <slot name="label">{{ label }}</slot>
    </gov-label>

    <slot name="hint">
      <gov-hint v-if="hint" :for="id" v-text="hint" />
    </slot>

    <gov-file-upload
      :value="form.file"
      @change="onChange"
      :id="id"
      :name="id"
      :accept="accept"
      ref="file"
    />

    <slot name="after-input" />

    <!-- Uploading loader -->
    <ck-loader v-if="form.$submitting">Uploading</ck-loader>
    <!-- Existing image -->
    <img
      v-else-if="existingUrl && !form.file && !removeExisting"
      :src="existingUrl"
      :key="`ExistingImage::${_uid}`"
      alt="Existing image"
    >
    <!-- Uploaded image -->
    <img
      v-else-if="form.file"
      :src="form.file"
      :key="`UploadedImage::${_uid}`"
      alt="Uploaded image"
    >

    <gov-error-message
      v-if="form.$errors.any()"
      v-text="form.$errors.any(['is_private', 'mime_type', 'file'])"
      :for="id"
    />

    <slot name="after-error-message" />

    <div
      v-if="(existingUrl && !removeExisting) || (form.file)"
      class="govuk-!-margin-top-2"
    >
      <gov-button @click="onRemove" type="button" error>Remove file</gov-button>
    </div>

  </gov-form-group>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "CkImageInput",
  props: {
    label: {
      required: true,
      type: String
    },
    hint: {
      required: false,
      type: String
    },
    accept: {
      required: false,
      default: null
    },
    id: {
      required: true,
      type: String
    },
    existingUrl: {
      required: false,
      type: String
    },
    private: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      removeExisting: false,
      form: new Form({
        is_private: this.private,
        mime_type: null,
        file: null
      })
    };
  },

  methods: {
    async onChange($event) {
      // If null, then simply emit null.
      if ($event === null) {
        this.form.mime_type = null;
        this.form.file = null;

        this.$emit("input", null);

        return;
      }

      // Destructure the payload with the variables we need.
      const { mime_type, content } = $event;

      /*
       * Reset remove existing flag to false since the user has interacted with
       * the search input.
       */
      this.removeExisting = false;

      // Set the variables in the form.
      this.form.mime_type = mime_type;
      this.form.file = content;

      // Upload the file and retrieve the ID.
      const { data: { id } } = await this.form.post("/files");

      // Emit the file ID.
      this.$emit("input", id);
    },

    onRemove() {
      // For uploaded file.
      if (this.form.file) {
        this.$refs.file.$el.value = "";
        this.form.mime_type = null;
        this.form.file = null;
        this.$emit("input", null);
        return;
      }

      // For existing file.
      this.removeExisting = true;
      this.$emit("input", false);
    }
  }
};
</script>
