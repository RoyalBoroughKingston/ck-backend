<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Edit Stop Words" />

    <gov-back-link :to="{ name: 'admin-index-search-engine-stop-words' }"
      >Back to stop words</gov-back-link
    >
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Stop Words</gov-heading>

          <gov-warning-text>
            Please note, uploading a new set of stop words may cause the search
            functionality to stop working for a short period of time. Please do
            not replace during peak hours.
          </gov-warning-text>

          <gov-heading size="m">Edit Stop Words</gov-heading>

          <gov-body
            >Update the stop words used when searching for services.</gov-body
          >

          <stop-words-form
            :errors="form.$errors"
            :stopWords.sync="file"
            @clear="form.$errors.clear($event)"
          />

          <gov-section-break size="l" />

          <gov-button v-if="form.$submitting" disabled type="submit"
            >Updating...</gov-button
          >
          <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
          <ck-submit-error v-if="form.$errors.any()" />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import StopWordsForm from "@/views/stop-words/forms/StopWordsForm";

export default {
  name: "EditStopWords",

  components: { StopWordsForm },

  data() {
    return {
      file: null,

      form: new Form({
        stop_words: null,
      }),
    };
  },

  methods: {
    async onSubmit() {
      const content = this.base64Decode(this.file);
      const stopWords = this.parseCsv(content);

      this.form.stop_words = stopWords;

      await this.form.put("/stop-words");

      this.$router.push({ name: "admin-index-search-engine-stop-words" });
    },

    /**
     * @link https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551
     */
    base64Decode(string) {
      string = string.split(",").pop();
      string = decodeURIComponent(
        atob(string)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return string;
    },

    parseCsv(content) {
      const stopWords = content
        .split(/\n/)
        .filter((stopWord) => stopWord.length > 0);

      return stopWords;
    },
  },
};
</script>
