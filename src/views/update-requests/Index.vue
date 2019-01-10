<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Update Requests" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">

          <gov-heading size="xl">Update requests</gov-heading>

          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-heading size="m">Filters</gov-heading>

              <form @submit.prevent="onSearch">

                <gov-form-group>
                  <gov-label for="filter[entry]">Entry</gov-label>
                  <gov-input v-model="filters.entry" id="filter[entry]" name="filter[entry]" type="search"/>
                </gov-form-group>

                <gov-form-group>
                  <gov-button type="submit">Search</gov-button>
                </gov-form-group>

              </form>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="updateRequestsTable"
            uri="/update-requests"
            :params="params"
            default-sort="-created_at"
            :columns="[
              { heading: 'User', render: (updateRequest) => `${updateRequest.user.first_name} ${updateRequest.user.last_name}` },
              { heading: 'Type', render: (updateRequest) => displayType(updateRequest.updateable_type) },
              { heading: 'Entry', sort: 'entry', render: (updateRequest) => displayEntry(updateRequest) },
              { heading: 'Date / Time', sort: 'created_at', render: (updateRequest) => formatDateTime(updateRequest.created_at) },
            ]"
            :view-route="(updateRequest) => {
              return {
                name: 'update-requests-show',
                params: { updateRequest: updateRequest.id }
              }
            }"
          />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";

export default {
  name: "ListUpdateRequests",
  components: { CkResourceListingTable },
  data() {
    return {
      filters: {
        entry: "",
      },
    };
  },
  computed: {
    params() {
      const params = {
        "include": "user",
      };

      if (this.filters.entry !== "") {
        params["filter[entry]"] = this.filters.entry;
      }

      return params;
    }
  },
  methods: {
    onSearch() {
      this.$refs.updateRequestsTable.currentPage = 1;
      this.$refs.updateRequestsTable.fetchResources();
    },
    displayType(type) {
      switch (type) {
        case "services":
          return "Service";
        case "organisations":
          return "Organisation";
        case "locations":
          return "Location";
        case "service_locations":
          return "Service location";
        default:
          return "Invalid type";
      }
    },
    displayEntry(updateRequest) {
      switch (updateRequest.updateable_type) {
        case "services":
          return updateRequest.data.name;
        case "organisations":
          return updateRequest.data.name;
        case "locations":
          return updateRequest.data.address_line_1;
        case "service_locations":
          return updateRequest.data.name || "-";
        default:
          return "-";
      }
    },
  },
};
</script>
