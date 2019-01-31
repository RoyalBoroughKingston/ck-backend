<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Users" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">

          <gov-heading size="xl">Users</gov-heading>

          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-heading size="m">Filters</gov-heading>

              <form @submit.prevent="onSearch">

                <gov-form-group>
                  <gov-label for="filter[first_name]">First name</gov-label>
                  <gov-input v-model="filters.first_name" id="filter[first_name]" name="filter[first_name]" type="search"/>
                </gov-form-group>

                <template v-if="showAllFilters">
                  <gov-form-group>
                    <gov-label for="filter[last_name]">Last name</gov-label>
                    <gov-input v-model="filters.last_name" id="filter[last_name]" name="filter[last_name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[email]">Email</gov-label>
                    <gov-input v-model="filters.email" id="filter[email]" name="filter[email]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[phone]">Phone number</gov-label>
                    <gov-input v-model="filters.phone" id="filter[phone]" name="filter[phone]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[highest_role]">Highest permission level</gov-label>
                    <gov-select v-model="filters.highest_role" id="filter[highest_role]" name="filter[highest_role]" :options="roles"/>
                  </gov-form-group>
                </template>

                <gov-form-group>
                  <gov-link v-if="!showAllFilters" @click="showAllFilters = true">Show extra filters</gov-link>
                  <gov-link v-else @click="showAllFilters = false">Hide extra filters</gov-link>
                </gov-form-group>

                <gov-form-group>
                  <gov-button type="submit">Search</gov-button>
                </gov-form-group>

              </form>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isServiceAdmin()" width="one-third">
              <gov-button @click="onAddUser" type="submit" expand>Add user</gov-button>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="usersTable"
            uri="/users"
            :params="params"
            default-sort="first_name"
            :columns="[
              { heading: 'First name', sort: 'first_name', render: (user) => user.first_name },
              { heading: 'Last name', sort: 'last_name', render: (user) => user.last_name },
              { heading: 'Highest permission level', sort: 'highest_role', render: (user) => displayHighestRole(user.roles) },
              { heading: 'Phone number', render: (user) => user.phone },
            ]"
            :view-route="(user) => {
              return {
                name: 'users-show',
                params: { user: user.id }
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
  name: "ListUsers",
  components: { CkResourceListingTable },
  data() {
    return {
      showAllFilters: false,
      filters: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        highest_role: "",
      },
      roles: [
        { value: "", text: "All" },
        { value: "Super Admin", text: "Super Admin" },
        { value: "Global Admin", text: "Global Admin" },
        { value: "Organisation Admin", text: "Organisation Admin" },
        { value: "Service Admin", text: "Service Admin" },
        { value: "Service Worker", text: "Service Worker" },
      ],
    };
  },
  computed: {
    params() {
      const params = {
        include: "user-roles",
        "filter[has_permission]": true,
      };

      if (this.filters.first_name !== "") {
        params["filter[first_name]"] = this.filters.first_name;
      }

      if (this.filters.last_name !== "") {
        params["filter[last_name]"] = this.filters.last_name;
      }

      if (this.filters.email !== "") {
        params["filter[email]"] = this.filters.email;
      }

      if (this.filters.phone !== "") {
        params["filter[phone]"] = this.filters.phone;
      }

      if (this.filters.highest_role !== "") {
        params["filter[highest_role]"] = this.filters.highest_role;
      }

      return params;
    }
  },
  methods: {
    onSearch() {
      this.$refs.usersTable.currentPage = 1;
      this.$refs.usersTable.fetchResources();
    },
    onAddUser() {
      this.$router.push({ name: "users-create" });
    },
    displayHighestRole(roles) {
      const isSuperAdmin = roles.find((role) => role.role === "Super Admin") !== undefined;
      if (isSuperAdmin) {
        return "Super Admin";
      }

      const isGlobalAdmin = roles.find((role) => role.role === "Global Admin") !== undefined;
      if (isGlobalAdmin) {
        return "Global Admin";
      }

      const isOrganisationAdmin = roles.find((role) => role.role === "Organisation Admin") !== undefined;
      if (isOrganisationAdmin) {
        return "Organisation Admin";
      }

      const isServiceAdmin = roles.find((role) => role.role === "Service Admin") !== undefined;
      if (isServiceAdmin) {
        return "Service Admin";
      }

      const isServiceWorker = roles.find((role) => role.role === "Service Worker") !== undefined;
      if (isServiceWorker) {
        return "Service Worker";
      }

      return "None";
    },
  },
};
</script>
