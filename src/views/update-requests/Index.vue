<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Update requests</gov-heading>
          <ck-loader v-if="loading" />
          <template v-else>
            <update-requests-table :update-requests="updateRequests" />
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
import UpdateRequestsTable from "@/views/update-requests/index/UpdateRequestsTable";

export default {
  name: "ListUpdateRequests",
  components: { UpdateRequestsTable },
  data() {
    return {
      loading: false,
      updateRequests: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  methods: {
    async fetchUpdateRequests() {
      this.loading = true;

      const { data } = await http.get("/update-requests", {
        params: { page: this.currentPage, include: "user" }
      });
      this.updateRequests = data.data;
      this.currentPage = data.meta.current_page;
      this.lastPage = data.meta.last_page;

      this.loading = false;
    },
    onNext() {
      this.currentPage++;
      this.fetchUpdateRequests();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchUpdateRequests();
    },
    onSearch() {
      this.currentPage = 1;
      this.fetchUpdateRequests();
    }
  },
  created() {
    this.fetchUpdateRequests();
  }
};
</script>
