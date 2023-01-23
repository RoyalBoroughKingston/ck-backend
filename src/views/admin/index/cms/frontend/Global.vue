<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Global</gov-heading>

      <gov-body>Review the global content for the frontend.</gov-body>

      <ck-text-input
        :value="frontend.global.footer_title"
        @input="onInput({ field: 'footer_title', value: $event })"
        label="Footer Title"
        :error="errors.get('cms.frontend.global.footer_title')"
        id="cms.frontend.global.footer_title"
      />

      <ck-wysiwyg-input
        :value="frontend.global.footer_content"
        @input="onInput({ field: 'footer_content', value: $event })"
        label="Footer Content"
        :error="errors.get('cms.frontend.global.footer_content')"
        id="cms.frontend.global.footer_content"
      />

      <ck-text-input
        :value="frontend.global.contact_phone"
        @input="onInput({ field: 'contact_phone', value: $event })"
        label="Contact Phone Number"
        :error="errors.get('cms.frontend.global.contact_phone')"
        id="cms.frontend.global.contact_phone"
        type="tel"
      />

      <ck-text-input
        :value="frontend.global.contact_email"
        @input="onInput({ field: 'contact_email', value: $event })"
        label="Contact Email"
        :error="errors.get('cms.frontend.global.contact_email')"
        id="cms.frontend.global.contact_email"
        type="email"
      />

      <ck-text-input
        :value="frontend.global.twitter_handle"
        @input="onInput({ field: 'twitter_handle', value: $event })"
        label="Twitter Handle"
        hint="Without the @ infront."
        :error="errors.get('cms.frontend.global.twitter_handle')"
        id="cms.frontend.global.twitter_handle"
      />

      <ck-text-input
        :value="frontend.global.facebook_handle"
        @input="onInput({ field: 'facebook_handle', value: $event })"
        label="Facebook Handle"
        :error="errors.get('cms.frontend.global.facebook_handle')"
        id="cms.frontend.global.facebook_handle"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendGlobal",

  model: {
    prop: "frontend",
    event: "input",
  },

  props: {
    frontend: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onInput({ field, value }) {
      const frontend = { ...this.frontend };

      frontend.global[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.global.${field}`);
    },
  },
};
</script>
