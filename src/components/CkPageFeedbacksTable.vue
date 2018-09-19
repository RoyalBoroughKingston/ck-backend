<template>
  <gov-table>
    <template slot="header">
      <gov-table-row>
        <gov-table-header scope="col">URL</gov-table-header>
        <gov-table-header scope="col">Date / Time</gov-table-header>
        <gov-table-header scope="col" right></gov-table-header>
      </gov-table-row>
    </template>
    <template slot="body">
      <gov-table-row v-for="pageFeedback in pageFeedbacks" :key="pageFeedback.id">
        <gov-table-cell>{{ pageFeedback.url }}</gov-table-cell>
        <gov-table-cell>{{ formatDateTime(pageFeedback.created_at) }}</gov-table-cell>
        <gov-table-cell right>
          <gov-link :to="{ name: 'page-feedbacks-show', params: { pageFeedback: pageFeedback.id } }">View</gov-link>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="pageFeedbacks.length === 0">
        <gov-table-cell center colspan="3">No page feedbacks</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkPageFeedbacksTable",
  props: {
    pageFeedbacks: {
      type: Array,
      required: true
    }
  }
};
</script>
