<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Referrals</gov-heading>
          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-form-group>
                <gov-label for="search">Search for a referral</gov-label>
                <gov-input @enter="onSearch" v-model="query" id="search" name="search" type="search" class="govuk-!-width-three-quarters" />&nbsp;<!--
             --><gov-button @click="onSearch" type="submit">Search</gov-button>
              </gov-form-group>
            </gov-grid-column>
          </gov-grid-row>
          <ck-loader v-if="loading" />
          <template v-else>
            <ck-referrals-table :referrals="referrals" />
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
  name: "ListReferrals",
  data() {
    return {
      loading: false,
      query: "",
      referrals: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  computed: {
    params() {
      let params = {
        page: this.currentPage,
        include: "service"
      };

      if (this.query.length > 0) {
        params["filter[name]"] = this.query;
      }

      return params;
    }
  },
  methods: {
    fetchReferrals() {
      this.loading = true;

      http.get("/referrals", { params: this.params }).then(({ data }) => {
        this.referrals = data.data;
        this.currentPage = data.meta.current_page;
        this.lastPage = data.meta.last_page;
        this.loading = false;
      });
    },
    onNext() {
      this.currentPage++;
      this.fetchReferrals();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchReferrals();
    },
    onSearch() {
      this.currentPage = 1;
      this.fetchReferrals();
    }
  },
  created() {
    this.fetchReferrals();
  }
};
</script>
