<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Banner</gov-heading>

      <gov-body>Review the banner content for the frontend.</gov-body>

      <ck-radio-input
        :value="frontend.banner.enabled"
        @input="onInput({ field: 'enabled', value: $event })"
        id="cms.frontend.banner.enabled"
        label="Enable/Disable Banner"
        hint="Banner configuration will be shown when enabled"
        :options="[{ value: false, label: 'Disabled' }, { value: true, label: 'Enabled' }]"
        :error="null"
      />

      <gov-inset-text v-show="frontend.banner.enabled">
        <ck-text-input
          :value="frontend.banner.title || ''"
          @input="onInput({ field: 'title', value: $event })"
          label="What is the banner title?"
          help="This text will appear as the large heading on the banner (70 characters max)"
          :error="errors.get('cms.frontend.banner.title')"
          id="cms.frontend.banner.title"
        />

        <ck-wysiwyg-input
          :value="frontend.banner.content || ''"
          @input="onInput({ field: 'content', value: $event })"
          label="Banner description"
          help="This text will appear as the smaller description text on the banner (200 characters max)"
          :error="errors.get('cms.frontend.banner.content')"
          id="cms.frontend.banner.content"
        />

        <ck-image-input
          @input="onInput({ field: 'image_file_id', value: $event.file_id })"
          id="logo"
          label="Add a logo"
          hint="Click 'Choose file' below to upload a logo to be displayed on the banner"
          accept="image/x-png"
          :existing-url="frontend.banner.has_image ? apiUrl(`/settings/banner-image.png?v=${now}`) : undefined"
        />

        <ck-text-input
          :value="frontend.banner.button_text || ''"
          @input="onInput({ field: 'button_text', value: $event })"
          label="What should the button say?"
          hint='eg. "Find out more" (30 characters max)'
          :error="errors.get('cms.frontend.banner.button_text')"
          id="cms.frontend.banner.button_text"
        />

        <ck-text-input
          :value="frontend.banner.button_url || ''"
          @input="onInput({ field: 'button_url', value: $event })"
          label="What page should the banner link to?"
          hint="Copy and paste the web address below"
          :error="errors.get('cms.frontend.banner.button_url')"
          id="cms.frontend.banner.button_url"
          type="url"
        />
      </gov-inset-text>
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
import CkImageInput from "@/components/Ck/CkImageInput";

export default {
  name: "CmsFrontendBanner",

  components: {
    CkImageInput
  },

  model: {
    prop: "frontend",
    event: "input"
  },

  props: {
    frontend: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  methods: {
    onInput({ field, value }) {
      const frontend = { ...this.frontend };

      frontend.banner[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.banner.${field}`)
    }
  }
};
</script>
