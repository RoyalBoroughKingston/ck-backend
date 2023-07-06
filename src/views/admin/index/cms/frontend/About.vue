<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">About</gov-heading>

      <gov-body
        >Review the content for the about page on the frontend.</gov-body
      >

      <ck-text-input
        :value="frontend.about.title"
        @input="onInput({ field: 'title', value: $event })"
        label="Title"
        :error="errors.get('cms.frontend.about.title')"
        id="cms.frontend.about.title"
      />

      <ck-wysiwyg-input
        :value="frontend.about.content"
        @input="onInput({ field: 'content', value: $event })"
        label="Content"
        :error="errors.get('cms.frontend.about.content')"
        id="cms.frontend.about.content"
      />

      <ck-text-input
        :value="frontend.about.video_url"
        @input="onInput({ field: 'video_url', value: $event })"
        label="Video URL"
        hint="Only YoutTube and Vimeo URLs supported."
        :error="errors.get('cms.frontend.about.video_url')"
        id="cms.frontend.about.video_url"
        type="url"
      />
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
export default {
  name: 'CmsFrontendAbout',

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

      frontend.about[field] = value

      this.$emit('input', frontend)
      this.$emit('clear', `frontend.about.${field}`)
    },
  },
}
</script>
