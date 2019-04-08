<template>
    <gov-width-container>

        <vue-headful title="Connected Kingston - Edit Thesaurus" />

        <gov-back-link :to="{ name: 'admin-index-search-engine' }">Back to thesaurus</gov-back-link>
        <gov-main-wrapper>
            <gov-grid-row>
            <gov-grid-column width="two-thirds">
                <gov-heading size="xl">Thesaurus</gov-heading>

                <gov-warning-text>
                  Please note, uploading a new Thesaurus may cause the search functionality
                  to stop working for a short period of time. Please do not replace during
                  peak hours.
                </gov-warning-text>

                <gov-heading size="m">Edit Thesaurus</gov-heading>

                <gov-body>Update the synonyms used when searching for services.</gov-body>
                <gov-body>
                  As all rows in a CSV must contain the same number of columns, the system will
                  strip out any blank cells. See the example below for reference:
                </gov-body>
                <ck-code>
                  run,dash,escape,elope,flee,<br>
                  help,aid,assist,support,encourage,back<br>
                  people,persons,,,
                </ck-code>

                <gov-heading size="s">Guidance on adding thesaurus entries:</gov-heading>

                <gov-list bullet>
                  <li>Synonyms should, if at all possible, be only singular words</li>
                  <li>
                    If you must use a multiple word synonym, it must appear on a row with only
                    one other synonym. This other synonym can then appear later in the sheet
                    with further synonyms. Example:

                    <gov-table>
                      <gov-table-row slot="header">
                        <gov-table-header/>
                        <gov-table-header center>A</gov-table-header>
                        <gov-table-header center>B</gov-table-header>
                        <gov-table-header center>C</gov-table-header>
                        <gov-table-header center>D</gov-table-header>
                      </gov-table-row>
                      <template slot="body">
                        <gov-table-row>
                          <gov-table-header center>1</gov-table-header>
                          <gov-table-cell>old people</gov-table-cell>
                          <gov-table-cell>elderly</gov-table-cell>
                          <gov-table-cell/>
                          <gov-table-cell/>
                        </gov-table-row>
                        <gov-table-row>
                          <gov-table-header center>2</gov-table-header>
                          <gov-table-cell>elderly</gov-table-cell>
                          <gov-table-cell>old</gov-table-cell>
                          <gov-table-cell>elders</gov-table-cell>
                          <gov-table-cell>pensioner</gov-table-cell>
                        </gov-table-row>
                      </template>
                    </gov-table>
                  </li>
                  <li>The multi-word synonym must appear in column A, and it’s replacement in column B</li>
                </gov-list>

                <thesaurus-form
                  :errors="form.$errors"
                  :synonyms.sync="file"
                  @clear="form.$errors.clear($event)"
                />

                <gov-section-break size="l" />

                <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
                <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
                <ck-submit-error v-if="form.$errors.any()" />

            </gov-grid-column>
            </gov-grid-row>
        </gov-main-wrapper>

    </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import ThesaurusForm from "@/views/thesaurus/forms/ThesaurusForm";
import CkCode from "@/components/CkCode";

export default {
  name: "EditThesuarus",

  components: { ThesaurusForm, CkCode },

  data() {
    return {
      file: null,

      form: new Form({
        synonyms: null
      })
    };
  },

  methods: {
    async onSubmit() {
      const content = this.base64Decode(this.file);
      const synonyms = this.parseCsv(content);

      this.form.synonyms = synonyms;

      await this.form.put("/thesaurus");

      this.$router.push({ name: "admin-index-search-engine" });
    },

    /**
     * @link https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551
     */
    base64Decode(string) {
      string = string.split(',').pop()
      string = decodeURIComponent(
        atob(string)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return string;
    },

    parseCsv(content) {
      const synonyms = content
        .split(/\n/)
        .map(synonym => synonym.split(","))
        .map(synonym => synonym.filter(word => word.length > 1))
        .filter(synonym => synonym.length > 0);

      return synonyms;
    }
  }
};
</script>
