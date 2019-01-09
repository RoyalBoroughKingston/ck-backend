<template>
  <ck-loader v-if="loading"/>
  <div v-else>
    <gov-table>
      <template slot="head">
        <gov-table-row>
          <gov-table-header
            v-for="(column, index) in columns"
            :key="`ResourceListingTableHeading-${index}`"
          >
            {{ column.heading }}
          </gov-table-header>
          <gov-table-header>
          </gov-table-header>
        </gov-table-row>
      </template>
      <template slot="body">
        <gov-table-row v-for="resource in resources" :key="resource.id">
          <gov-table-cell
            v-for="(column, index) in columns"
            :key="`ResourceListingTableCell-${index}`"
          >
            {{ column.render(resource) }}
          </gov-table-cell>
          <gov-table-cell right>
            <gov-link :to="viewRoute(resource)">
              View
            </gov-link>
          </gov-table-cell>
        </gov-table-row>
        <gov-table-row v-if="resources.length === 0">
          <gov-table-cell :colspan="columns.length + 1">None found</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
    <ck-pagination
      @previous="onPrevious"
      @next="onNext"
      :current-page="currentPage"
      :total-pages="totalPages"
    />
  </div>
</template>

<script>
import GovTable from '@/components/Gov/GovTable.vue';
import GovTableCell from '@/components/Gov/GovTableCell.vue';
import GovTableHeader from '@/components/Gov/GovTableHeader.vue';
import GovTableRow from '@/components/Gov/GovTableRow.vue';
import GovLink from '@/components/Gov/GovLink.vue';
import CkLoader from '@/components/CkLoader.vue';
import CkPagination from '@/components/Ck/CkPagination.vue';

export default {
  name: 'ResourceListingTable',

  components: {
    GovTable,
    GovTableHead,
    GovTableBody,
    GovTableCell,
    GovTableHeader,
    GovTableRow,
    GovLink,
    CkLoader,
    CkPagination,
  },

  props: {
    uri: {
      required: true,
      type: String,
    },

    params: {
      required: false,
      type: Object,
      default: () => ({}),
    },

    columns: {
      required: true,
      type: Array,
    },

    viewRoute: {
      required: true,
      type: Function,
    },
  },

  data() {
    return {
      resources: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
    };
  },

  methods: {
    async fetchResources() {
      this.loading = true;

      const response = await this.$http.get(this.uri, {
        params: { ...this.params, page: this.currentPage },
      });
      this.resources = response.data.data;
      this.currentPage = response.data.meta.current_page;
      this.totalPages = response.data.meta.last_page;

      this.loading = false;
    },

    onPrevious() {
      this.currentPage = this.currentPage - 1;
      this.fetchResources();
    },

    onNext() {
      this.currentPage = this.currentPage + 1;
      this.fetchResources();
    },
  },

  created() {
    this.fetchResources();
  },
};
</script>
