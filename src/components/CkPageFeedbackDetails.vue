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
      <gov-table-row v-if="pageFeedback.name">
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ pageFeedback.name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="pageFeedback.email">
        <gov-table-header top scope="row">Email</gov-table-header>
        <gov-table-cell>{{ pageFeedback.email }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row v-if="pageFeedback.phone">
        <gov-table-header top scope="row">Phone</gov-table-header>
        <gov-table-cell>{{ pageFeedback.phone }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Scheduled for deletion</gov-table-header>
        <gov-table-cell>{{ formatDate(autoDeleteDate(pageFeedback.updated_at)) }}</gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
import moment from 'moment';

export default {
  name: "CkPageFeedbackDetails",
  props: {
    pageFeedback: {
      type: Object,
      required: true,
    },
  },
  methods: {
    autoDeleteDate(updated_at) {
      return moment(updated_at, moment.ISO_8601).add(6, 'months').format('Y-MM-DD[T]HH:mm:ssZ');
    },
  },
};
</script>
