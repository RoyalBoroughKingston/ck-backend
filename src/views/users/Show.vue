<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'users-index' }">Back to users</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful :title="`Connected Kingston - User: ${user.first_name} ${user.last_name}`" />

        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View user</gov-heading>

          <ck-user-details :user="user" />

          <gov-body>Please be certain of the action before deleting a user</gov-body>

          <gov-section-break size="l" />

          <ck-delete-button
            resource="user"
            :endpoint="`/users/${this.user.id}`"
            @deleted="onDelete"
          />

        </gov-grid-column>
        <gov-grid-column width="one-third" class="text-right">

          <gov-button :to="{ name: 'users-edit', params: { user: $route.params.user } }">Edit user</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ShowUser",
  data() {
    return {
      loading: false,
      user: null
    };
  },
  methods: {
    fetchUser() {
      this.loading = true;
      http
        .get(`/users/${this.$route.params.user}`, {
          params: {
            include: "user-roles.organisation,user-roles.service"
          }
        })
        .then(({ data }) => {
          this.user = data.data;
          this.loading = false;
        });
    },
    onEdit() {
      alert("Edit");
    },
    onDelete() {
      this.$router.push({ name: "users-index" });
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>
