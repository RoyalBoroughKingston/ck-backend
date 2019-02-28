<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Page Feedback" />

    <gov-heading size="l">Feedback</gov-heading>

    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <ck-table-filters @search="onSearch" hide-extra>
          <gov-form-group>
            <gov-label for="filter[url]">Page URL</gov-label>
            <gov-input v-model="filters.url" id="filter[url]" name="filter[url]" type="search"/>
          </gov-form-group>
        </ck-table-filters>
      </gov-grid-column>
    </gov-grid-row>

    <ck-resource-listing-table
      ref="pageFeedbacksTable"
      uri="/page-feedbacks"
      :params="params"
      default-sort="-created_at"
      :columns="[
        { heading: 'Page URL', sort: 'url', render: (pageFeedback) => pageFeedback.url },
        { heading: 'Contact name', render: (pageFeedback) => pageFeedback.name || '-' },
        { heading: 'Contact details', render: (pageFeedback) => pageFeedback.email || pageFeedback.phone || '-' },
        { heading: 'Date / Time', sort: 'created_at', render: (pageFeedback) => formatDateTime(pageFeedback.created_at) },
      ]"
      :view-route="(pageFeedback) => {
        return {
          name: 'page-feedbacks-show',
          params: { pageFeedback: pageFeedback.id }
        }
      }"
    />
  </div>
</template>

<script>
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";
import CkTableFilters from "@/components/Ck/CkTableFilters.vue";

export default {
  name: "ListNotification",
  components: { CkResourceListingTable, CkTableFilters },
  data() {
    return {
      filters: {
        url: ""
      }
    };
  },
  computed: {
    params() {
      const params = {};

      if (this.filters.url !== "") {
        params["filter[url]"] = this.filters.url;
      }

      return params;
    }
  },
  methods: {
    onSearch() {
      this.$refs.pageFeedbacksTable.currentPage = 1;
      this.$refs.pageFeedbacksTable.fetchResources();
    }
  }
};
</script>
