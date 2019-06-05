<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Privacy Policy</gov-heading>

      <gov-body>
        Review the content for the privacy policy page on the frontend.
      </gov-body>

      <ck-text-input
        :value="frontend.privacy_policy.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.privacy_policy.title')"
        id="cms.frontend.privacy_policy.title"
      />

      <ck-wysiwyg-input
        :value="frontend.privacy_policy.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.privacy_policy.content')"
        id="cms.frontend.privacy_policy.content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendPrivacyPolicy",

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

      frontend.privacy_policy[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.privacy_policy.${field}`)
    }
  }
};
</script>
