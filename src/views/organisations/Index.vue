<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Organisations" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Organisations</gov-heading>
          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-form-group>
                <gov-label for="search">Search for an organisation by name</gov-label>
                <gov-input @enter="onSearch" v-model="query" id="search" name="search" type="search" class="govuk-!-width-three-quarters" />&nbsp;<!--
             --><gov-button @click="onSearch" type="submit">Search</gov-button>
              </gov-form-group>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
              <gov-label for="empty">&nbsp;</gov-label>
              <gov-button @click="onAddOrganisation" type="submit" expand>Add organisation</gov-button>
            </gov-grid-column>
          </gov-grid-row>
          <ck-loader v-if="loading" />
          <template v-else>
            <ck-organisations-table :organisations="organisations" />
            <gov-body>
              Page {{ currentPage }} of {{ lastPage }}
              <gov-link v-if="currentPage > 1" @click="onPrevious">Back</gov-link>&nbsp;<!--
           --><gov-link v-if="currentPage < lastPage" @click="onNext">Next</gov-link>
            </gov-body>
          </template>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ListOrganisations",
  data() {
    return {
      loading: false,
      query: "",
      organisations: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  computed: {
    params() {
      let params = { page: this.currentPage };

      if (this.query.length > 0) {
        params["filter[name]"] = this.query;
      }

      return params;
    }
  },
  methods: {
    fetchOrganisations() {
      this.loading = true;

      http.get("/organisations", { params: this.params }).then(({ data }) => {
        this.organisations = data.data;
        this.currentPage = data.meta.current_page;
        this.lastPage = data.meta.last_page;
        this.loading = false;
      });
    },
    onNext() {
      this.currentPage++;
      this.fetchOrganisations();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchOrganisations();
    },
    onSearch() {
      this.currentPage = 1;
      this.fetchOrganisations();
    },
    onAddOrganisation() {
      this.$router.push({ name: "organisations-create" });
    }
  },
  created() {
    this.fetchOrganisations();
  }
};
</script>
