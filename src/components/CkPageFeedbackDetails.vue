<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header top scope="row">URL</gov-table-header>
        <gov-table-cell break>{{ pageFeedback.url }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Channel</gov-table-header>
        <gov-table-cell>{{ formatDateTime(pageFeedback.created_at) }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Feedback</gov-table-header>
        <gov-table-cell>{{ pageFeedback.feedback }}</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkPageFeedbackDetails",
  props: {
    pageFeedback: {
      type: Object,
      required: true
    }
  }
};
</script>
