<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Get Involved</gov-heading>

      <gov-body>
        Review the content for the get involved page on the frontend.
      </gov-body>

      <ck-text-input
        :value="frontend.get_involved.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.get_involved.title')"
        id="cms.frontend.get_involved.title"
      />

      <ck-wysiwyg-input
        :value="frontend.get_involved.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.get_involved.content')"
        id="cms.frontend.get_involved.content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendGetInvolved",

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

      frontend.get_involved[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.get_involved.${field}`)
    }
  }
};
</script>
