<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'admin-index-feedback' }">Back to page feedbacks</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful :title="`Connected Kingston - Page Feedback: ${pageFeedback.feedback.substr(0, 10)}...`" />

        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View page feedback</gov-heading>

          <ck-page-feedback-details :page-feedback="pageFeedback" />

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import CkPageFeedbackDetails from "@/components/CkPageFeedbackDetails";

export default {
  name: "ShowPageFeedback",
  components: { CkPageFeedbackDetails },
  data() {
    return {
      loading: false,
      pageFeedback: null
    };
  },
  methods: {
    async fetchPageFeedback() {
      this.loading = true;
      const { data } = await http.get(
        `/page-feedbacks/${this.$route.params.pageFeedback}`
      );
      this.pageFeedback = data.data;
      this.loading = false;
    }
  },
  created() {
    this.fetchPageFeedback();
  }
};
</script>
