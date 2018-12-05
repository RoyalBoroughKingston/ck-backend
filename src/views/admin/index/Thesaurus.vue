<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Thesaurus" />

    <template>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">Thesaurus</gov-heading>

          <gov-button @click="onExportCsv">Download thesaurus</gov-button>

          <ck-loader v-if="loading" />
          <ck-thesaurus-list v-else :synonyms="synonyms" />
        </gov-grid-column>

        <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
          <gov-button :to="{ name: 'thesaurus-edit' }" expand>Edit thesaurus</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </template>
  </div>
</template>

<script>
import http from "@/http";
import CkThesaurusList from "@/components/CkThesaurusList";

export default {
  name: "ListThesaurus",

  components: { CkThesaurusList },

  data() {
    return {
      loading: false,
      synonyms: [],
      currentPage: 1,
      lastPage: 1
    };
  },

  methods: {
    async fetchSynonyms() {
      this.loading = true;

      const { data } = await http.get("/thesaurus");
      this.synonyms = data.data;

      this.loading = false;
    },

    onExportCsv() {
      let csvContent = "data:text/csv;charset=utf-8,";

      this.synonyms.forEach(rowArray => {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });

      const encodedUri = encodeURI(csvContent);
      window.open(encodedUri, "_blank");
    }
  },

  created() {
    this.fetchSynonyms();
  }
};
</script>
