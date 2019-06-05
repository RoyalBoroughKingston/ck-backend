<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Home</gov-heading>

      <gov-body>Review the content for the home page on the frontend.</gov-body>

      <ck-text-input
        :value="frontend.home.search_title"
        @input="onInput({ field: 'search_title', value: $event })"
        label="Search Title"
        :error="errors.get('cms.frontend.home.search_title')"
        id="cms.frontend.home.search_title"
      />

      <ck-text-input
        :value="frontend.home.categories_title"
        @input="onInput({ field: 'categories_title', value: $event })"
        label="Categories Title"
        :error="errors.get('cms.frontend.home.categories_title')"
        id="cms.frontend.home.categories_title"
      />

      <ck-text-input
        :value="frontend.home.personas_title"
        @input="onInput({ field: 'personas_title', value: $event })"
        label="Personas Title"
        :error="errors.get('cms.frontend.home.personas_title')"
        id="cms.frontend.home.personas_title"
      />

      <ck-wysiwyg-input
        :value="frontend.home.personas_content"
        @input="onInput({ field: 'personas_content', value: $event })"
        label="Personas Content"
        :error="errors.get('cms.frontend.home.personas_content')"
        id="cms.frontend.home.personas_content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendHome",

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

      frontend.home[field] = value;

      this.$emit("input", frontend);
    }
  }
};
</script>
