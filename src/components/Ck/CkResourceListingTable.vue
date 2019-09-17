<template>
  <ck-loader v-if="loading"/>
  <div v-else>
    <gov-table>
      <template slot="header">
        <gov-table-row>
          <gov-table-header
            v-for="(column, index) in columns"
            :key="`ResourceListingTableHeading-${index}`"
            @click="onSort(column)"
            :clickable="column.hasOwnProperty('sort')"
          >
            {{ column.heading }}
            <template v-if="column.hasOwnProperty('sort')">
              {{ sortText(column) }}
            </template>
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
            v-html="column.render(resource)"
          />
          <gov-table-cell right>
            <gov-link @click="onAction(resource)" :to="viewRoute ? viewRoute(resource) : null">
              {{ actionText }}
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
import http from "@/http";
import GovTable from "@/components/Gov/GovTable.vue";
import GovTableCell from "@/components/Gov/GovTableCell.vue";
import GovTableHeader from "@/components/Gov/GovTableHeader.vue";
import GovTableRow from "@/components/Gov/GovTableRow.vue";
import GovLink from "@/components/Gov/GovLink.vue";
import CkLoader from "@/components/CkLoader.vue";
import CkPagination from "@/components/Ck/CkPagination.vue";

export default {
  name: "ResourceListingTable",

  components: {
    GovTable,
    GovTableCell,
    GovTableHeader,
    GovTableRow,
    GovLink,
    CkLoader,
    CkPagination
  },

  props: {
    uri: {
      required: true,
      type: String
    },

    params: {
      required: false,
      type: Object,
      default: () => ({})
    },

    columns: {
      required: true,
      type: Array
    },

    viewRoute: {
      required: false,
      type: Function
    },

    defaultSort: {
      required: false,
      type: String,
      default: ""
    },

    actionText: {
      required: false,
      type: String,
      default: "View"
    }
  },

  data() {
    return {
      resources: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
      sort: this.defaultSort
    };
  },

  computed: {
    allParams() {
      const params = {
        ...this.params,
        page: this.currentPage
      };

      if (this.sort !== "") {
        params.sort = this.sort;
      }

      return params;
    }
  },

  methods: {
    async fetchResources() {
      this.loading = true;

      const response = await http.get(this.uri, { params: this.allParams });
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

    onSort(column) {
      const currentSortDirection = this.sort.charAt(0) === "-" ? "desc" : "asc";
      const currentSortField =
        this.sort.charAt(0) === "-" ? this.sort.substr(1) : this.sort;

      const columnSortField = column.sort;

      // Do nothing if the field is not sortable.
      if (columnSortField === undefined) {
        return;
      }

      if (currentSortField !== columnSortField) {
        // If not the current sort.
        this.sort = columnSortField;
      } else {
        // If it is the current sort (toggle asc/desc).
        if (currentSortDirection === "asc") {
          this.sort = `-${columnSortField}`;
        } else {
          this.sort = columnSortField;
        }
      }

      // Refetch the resources.
      this.fetchResources();
    },

    sortText(column) {
      const currentSortDirection = this.sort.charAt(0) === "-" ? "desc" : "asc";
      const currentSortField =
        this.sort.charAt(0) === "-" ? this.sort.substr(1) : this.sort;

      if (currentSortField !== column.sort) {
        return "";
      }

      return currentSortDirection === "asc" ? "(ASC)" : "(DESC)";
    },

    onAction(resource) {
      this.$emit("action", resource);
    }
  },

  created() {
    this.fetchResources();
  }
};
</script>
