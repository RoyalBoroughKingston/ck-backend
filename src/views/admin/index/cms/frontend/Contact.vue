<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Contact</gov-heading>

      <gov-body>
        Review the content for the contact page on the frontend.
      </gov-body>

      <ck-text-input
        :value="frontend.contact.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.contact.title')"
        id="cms.frontend.contact.title"
      />

      <ck-wysiwyg-input
        :value="frontend.contact.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.contact.content')"
        id="cms.frontend.contact.content"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: 'CmsFrontendContact',

  model: {
    prop: 'frontend',
    event: 'input',
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
      const frontend = { ...this.frontend }

      frontend.contact[field] = value

      this.$emit('input', frontend)
      this.$emit('clear', `frontend.contact.${field}`)
    },
  },
}
</script>
