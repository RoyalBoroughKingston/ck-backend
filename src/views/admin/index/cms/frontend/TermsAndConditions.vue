<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Terms and Conditions</gov-heading>

      <gov-body>
        Review the content for the terms and conditions page on the frontend.
      </gov-body>

      <ck-text-input
        :value="frontend.terms_and_conditions.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.terms_and_conditions.title')"
        id="cms.frontend.terms_and_conditions.title"
      />

      <ck-wysiwyg-input
        :value="frontend.terms_and_conditions.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.terms_and_conditions.content')"
        id="cms.frontend.terms_and_conditions.content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendTermsAndConditions",

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

      frontend.terms_and_conditions[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.terms_and_conditions.${field}`)
    }
  }
};
</script>
