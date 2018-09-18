<template>
  <div>
    <gov-heading size="l">Feedback</gov-heading>
    <ck-loader v-if="loading" />
    <template v-else>
      <ck-page-feedbacks-table :page-feedbacks="pageFeedbacks" />
      <gov-body>
        Page {{ currentPage }} of {{ lastPage }}
        <gov-link v-if="currentPage > 1" @click="onPrevious">Back</gov-link>&nbsp;<!--
      --><gov-link v-if="currentPage < lastPage" @click="onNext">Next</gov-link>
      </gov-body>
    </template>
  </div>
</template>

<script>
import http from "@/http";
import CkPageFeedbacksTable from "@/components/CkPageFeedbacksTable";

export default {
  name: "ListNotification",
  components: { CkPageFeedbacksTable },
  data() {
    return {
      loading: false,
      pageFeedbacks: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  methods: {
    async fetchPageFeedbacks() {
      this.loading = true;

      const { data } = await http.get("/page-feedbacks", { params: { page: this.currentPage } });
      this.pageFeedbacks = data.data;
      this.currentPage = data.meta.current_page;
      this.lastPage = data.meta.last_page;

      this.loading = false;
    },
    onNext() {
      this.currentPage++;
      this.fetchPageFeedbacks();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchPageFeedbacks();
    }
  },
  created() {
    this.fetchPageFeedbacks();
  }
};
</script>
