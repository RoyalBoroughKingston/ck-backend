<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Thesaurus" />

    <template>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">Thesaurus</gov-heading>

          <ck-loader v-if="loading" />
          <ck-thesaurus-list v-else :synonyms="synonyms" />
        </gov-grid-column>

        <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
          <gov-button :to="{ name: 'taxonomies-categories-create' }" expand>Edit thesaurus</gov-button>
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
    }
  },

  created() {
    this.fetchSynonyms();
  }
};
</script>
