<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Favourites</gov-heading>

      <gov-body>
        Review the content for the favourites page on the frontend.
      </gov-body>

      <ck-text-input
        :value="frontend.favourites.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.favourites.title')"
        id="cms.frontend.favourites.title"
      />

      <ck-wysiwyg-input
        :value="frontend.favourites.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.favourites.content')"
        id="cms.frontend.favourites.content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: "CmsFrontendFavourites",

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

      frontend.favourites[field] = value;

      this.$emit("input", frontend);
      this.$emit("clear", `frontend.favourites.${field}`)
    }
  }
};
</script>
