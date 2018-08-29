<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Users</gov-heading>
          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-form-group>
                <gov-label for="search">Search for a user by first name</gov-label>
                <gov-input @enter="onSearch" v-model="query" id="search" name="search" type="search" class="govuk-!-width-three-quarters" />&nbsp;<!--
             --><gov-button @click="onSearch" type="submit">Search</gov-button>
              </gov-form-group>
            </gov-grid-column>
            <gov-grid-column width="one-third">
              <gov-label for="empty">&nbsp;</gov-label>
              <gov-button @click="onAddUser" type="submit" expand>Add user</gov-button>
            </gov-grid-column>
          </gov-grid-row>
          <ck-loader v-if="loading" />
          <template v-else>
            <ck-users-table :users="users" />
            <gov-body>
              Page {{ currentPage }} of {{ lastPage }}
              <gov-link v-if="currentPage > 1" @click="onPrevious">Back</gov-link>&nbsp;<!--
           --><gov-link v-if="currentPage < lastPage" @click="onNext">Next</gov-link>
            </gov-body>
          </template>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ListUsers",
  data() {
    return {
      loading: false,
      query: "",
      users: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  computed: {
    params() {
      let params = { page: this.currentPage };

      if (this.query.length > 0) {
        params["filter[first_name]"] = this.query;
      }

      return params;
    }
  },
  methods: {
    fetchUsers() {
      this.loading = true;

      http.get("/users", { params: this.params }).then(({ data }) => {
        this.users = data.data;
        this.currentPage = data.meta.current_page;
        this.lastPage = data.meta.last_page;
        this.loading = false;
      });
    },
    onNext() {
      this.currentPage++;
      this.fetchUsers();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchUsers();
    },
    onSearch() {
      this.currentPage = 1;
      this.fetchUsers();
    },
    onAddUser() {
      this.$router.push({ name: "users-create" });
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
