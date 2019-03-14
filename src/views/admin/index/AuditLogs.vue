<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Audits" />

    <gov-heading size="l">Audit logs</gov-heading>

    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <ck-table-filters @search="onSearch">
          <gov-form-group>
            <gov-label for="filter[action]">Action</gov-label>
            <gov-select v-model="filters.action" id="filter[action]" name="filter[action]" :options="actions"/>
          </gov-form-group>

          <template slot="extra-filters">
            <gov-form-group>
              <gov-label for="filter[description]">Description</gov-label>
              <gov-input v-model="filters.description" id="filter[description]" name="filter[description]" type="search"/>
            </gov-form-group>

            <gov-form-group>
              <gov-label for="filter[user_id]">User</gov-label>
              <ck-loader v-if="loadingUsers"/>
              <gov-select v-else v-model="filters.user_id" id="filter[user_id]" name="filter[user_id]" :options="users"/>
            </gov-form-group>

            <gov-form-group>
              <gov-label for="filter[oauth_client_id]">Client</gov-label>
              <ck-loader v-if="loadingOauthClients"/>
              <gov-select v-else v-model="filters.oauth_client_id" id="filter[oauth_client_id]" name="filter[oauth_client_id]" :options="oauthClients"/>
            </gov-form-group>
          </template>
        </ck-table-filters>
      </gov-grid-column>
    </gov-grid-row>

    <ck-resource-listing-table
      ref="auditsTable"
      uri="/audits"
      :params="params"
      default-sort="-created_at"
      :columns="[
        { heading: 'Action', sort: 'action', render: (audit) => formatAction(audit.action) },
        { heading: 'Description', sort: 'description', render: (audit) => audit.description },
        { heading: 'User', sort: 'user_full_name', render: (audit) => formatUserName(audit.user) },
        { heading: 'Date / Time', sort: 'created_at', render: (audit) => formatDateTime(audit.created_at) },
      ]"
      :view-route="(audit) => {
        return {
          name: 'audits-show',
          params: { audit: audit.id }
        }
      }"
    />
  </div>
</template>

<script>
import http from "@/http";
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";
import CkTableFilters from "@/components/Ck/CkTableFilters.vue";

export default {
  name: "ListAuditLogs",
  components: { CkResourceListingTable, CkTableFilters },
  data() {
    return {
      loadingUsers: false,
      loadingOauthClients: false,
      filters: {
        action: "",
        description: "",
        user_id: "",
        oauth_client_id: ""
      },
      actions: [
        { value: "", text: "All" },
        { value: "create", text: "Create" },
        { value: "read", text: "Read" },
        { value: "update", text: "Update" },
        { value: "delete", text: "Delete" }
      ],
      users: [],
      oauthClients: []
    };
  },
  computed: {
    params() {
      const params = {
        include: "user"
      };

      if (this.filters.action !== "") {
        params["filter[action]"] = this.filters.action;
      }

      if (this.filters.description !== "") {
        params["filter[description]"] = this.filters.description;
      }

      if (this.filters.user_id !== "") {
        params["filter[user_id]"] = this.filters.user_id;
      }

      if (this.filters.oauth_client_id !== "") {
        params["filter[oauth_client_id]"] = this.filters.oauth_client_id;
      }

      return params;
    }
  },
  methods: {
    async fetchUsers() {
      this.loadingUsers = true;

      let users = await this.fetchAll("/users");
      users = users.map(user => {
        return { value: user.id, text: `${user.first_name} ${user.last_name}` };
      });
      this.users = [{ value: "", text: "All" }, ...users];

      this.loadingUsers = false;
    },
    async fetchOauthClients() {
      this.loadingOauthClients = true;

      let { data: oauthClients } = await http({
        method: "get",
        url: "/oauth/clients",
        baseURL: process.env.VUE_APP_API_URI
      });

      oauthClients = oauthClients.map(oauthClient => ({
        value: oauthClient.id,
        text: oauthClient.name
      }));

      this.oauthClients = [{ value: "", text: "All" }, ...oauthClients];

      this.loadingOauthClients = false;
    },
    onSearch() {
      this.$refs.auditsTable.currentPage = 1;
      this.$refs.auditsTable.fetchResources();
    },
    formatUserName(user) {
      if (user) {
        return `${user.first_name} ${user.last_name}`;
      }

      return "Guest";
    },
    formatAction(action) {
      return action.charAt(0).toUpperCase() + action.substr(1);
    }
  },
  created() {
    this.fetchUsers();
    this.fetchOauthClients();
  }
};
</script>
