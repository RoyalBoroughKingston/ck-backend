<template>
    <ck-file-input
      :value="synonyms"
      @input="onInput('synonyms', $event)"
      id="synonyms"
      label="Synonyms"
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
