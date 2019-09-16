<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Edit User: ${user.first_name} ${user.last_name}`" />

      <gov-back-link :to="{ name: 'users-show', params: { user: user.id } }">Back to user</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Users</gov-heading>
            <gov-heading size="m">Edit user</gov-heading>
            <gov-body>Edit users who can acces the back-end of the Connected Kingston service (deciding their permissions in what they have access to)</gov-body>

            <user-form
              :errors="form.$errors"
              :first_name.sync="form.first_name"
              :last_name.sync="form.last_name"
              :email.sync="form.email"
              :phone.sync="form.phone"
              :password.sync="form.password"
              :roles.sync="form.roles"
              @clear="form.$errors.clear($event)"
            />

            <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
            <ck-submit-error v-if="form.$errors.any()" />
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";
import UserForm from "@/views/users/forms/UserForm";

export default {
  name: "EditUser",
  components: { UserForm },
  data() {
    return {
      loading: false,
      user: null,
      form: null
    };
  },
  methods: {
    async fetchUser() {
      this.loading = true;

      const response = await http.get(`/users/${this.$route.params.user}`, {
        params: { include: "user-roles" }
      });
      this.user = response.data.data;
      this.form = new Form({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone,
        password: "",
        roles: this.user.roles
      });

      // Filter down the roles.
      if (this.form.roles.find(role => role.role === "Super Admin")) {
        // If the user is a super admin.
        this.form.roles = this.form.roles.filter(
          role => role.role === "Super Admin"
        );
      } else if (this.form.roles.find(role => role.role === "Global Admin")) {
        // Else if, the user is a global admin.
        this.form.roles = this.form.roles.filter(
          role => role.role === "Global Admin"
        );
      } else {
        // Else, fetch the services for each role and embed them.
        let serviceIds = [];
        this.form.roles.forEach(role => {
          if (role.hasOwnProperty("service_id")) {
            serviceIds.push(role.service_id);
          }
        });
        let services = await this.fetchAll(
          "/services/index",
          { "filter[id]": serviceIds.join(",") },
          "POST"
        );
        this.form.roles.forEach(role => {
          if (role.hasOwnProperty("service_id")) {
            const service = services.find(
              service => service.id === role.service_id
            );
            role.organisation_id = service.organisation_id;
          }
        });

        // Filter down the roles for organisation admins.
        const organisationIds = [];
        this.form.roles.forEach(role => {
          if (role.role === "Organisation Admin") {
            organisationIds.push(role.organisation_id);
          }
        });
        this.form.roles = this.form.roles.filter(role => {
          return (
            role.role === "Organisation Admin" ||
            !organisationIds.includes(role.organisation_id)
          );
        });

        // Filter down the roles for service admins.
        const serviceAdminIds = [];
        this.form.roles.forEach(role => {
          if (role.role === "Service Admin") {
            serviceAdminIds.push(role.service_id);
          }
        });
        this.form.roles = this.form.roles.filter(role => {
          return (
            role.role === "Service Admin" ||
            !serviceAdminIds.includes(role.service_id)
          );
        });
      }

      this.loading = false;
    },
    async onSubmit() {
      await this.form.put(`/users/${this.user.id}`, (config, data) => {
        // Strip spaces from the phone number.
        data.phone = data.phone.replace(/\s/g, '')

        if (data.password.length === 0) {
          delete data.password;
        }

        data.roles.forEach(role => {
          switch (role.role) {
            // Delete the organisation and service IDs instead of sending null values.
            case "Super Admin":
            case "Global Admin":
              delete role.organisation_id;
              delete role.service_id;
              break;
            case "Organisation Admin":
              delete role.service_id;
              break;
          }
        });
      });
      this.$router.push({
        name: "users-show",
        params: { user: this.user.id }
      });
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>
