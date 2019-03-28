<template>
  <ck-file-input
    :value="stopWords"
    @input="onInput('stopWords', $event === null ? null : $event.content)"
    id="stop_words"
    label="Upload a new set of stop words"
    accept="text/csv"
    :error="errors.get('stop_words')"
  />
</template>

<script>
export default {
  name: "StopWordsForm",

  props: {
    errors: {
      required: true,
      type: Object
    },

    stopWords: {
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
