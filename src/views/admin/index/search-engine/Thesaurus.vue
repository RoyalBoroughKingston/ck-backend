<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Thesaurus</gov-heading>

      <gov-body>
        On this page, you can view and edit the thesaurus used when a user makes a
        keyword search. The thesaurus means that when users enter in a search
        term - if it appears in the thesaurus, all synonyms will also be searched.
      </gov-body>

      <ck-loader v-if="loading" />
      <gov-button v-else @click="onExportCsv">Download thesaurus</gov-button>

      <gov-heading size="m">Synonyms</gov-heading>

      <ck-loader v-if="loading" />
      <ck-thesaurus-list v-else :synonyms="synonyms" />
    </gov-grid-column>

    <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
      <gov-button :to="{ name: 'thesaurus-edit' }" expand>Edit thesaurus</gov-button>
    </gov-grid-column>
  </gov-grid-row>
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
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "thesaurus.csv");
      document.body.appendChild(link);
      link.click();
    }
  },

  created() {
    this.fetchSynonyms();
  }
};
</script>
