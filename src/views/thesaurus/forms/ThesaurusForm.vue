<template>
  <ck-file-input
    :value="synonyms"
    @input="onInput('synonyms', $event === null ? null : $event.content)"
    id="synonyms"
    label="Upload new thesaurus"
    accept="text/csv"
    :error="errors.get('synonyms')"
  />
</template>

<script>
export default {
  name: "ThesaurusForm",

  props: {
    errors: {
      required: true,
      type: Object
    },

    synonyms: {
      required: true
    }
  },

  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
