<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header top scope="row">First name</gov-table-header>
        <gov-table-cell>{{ user.first_name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Last name</gov-table-header>
        <gov-table-cell>{{ user.last_name }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Email</gov-table-header>
        <gov-table-cell>{{ user.email }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Phone number</gov-table-header>
        <gov-table-cell>{{ user.phone }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header top scope="row">Permissions</gov-table-header>
        <gov-table-cell>
          <gov-body>Super admin: {{ superAdmin ? 'Yes' : 'No' }}</gov-body>
          <gov-body>Global admin: {{ globalAdmin ? 'Yes' : 'No' }}</gov-body>
          <gov-body v-if="organisationAdmin.length === 0">Organisation admin: No</gov-body>
          <gov-details v-else summary="Organisation admin: Yes">
            <div v-for="(role, key) in organisationAdmin" :key="key">
              <gov-link
                :to="{ name: 'organisations-show', params: { organisation: role.organisation_id } }"
                v-text="role.organisation.name"
              />
            </div>
          </gov-details>
          <gov-body v-if="serviceAdmin.length === 0">Service admin: No</gov-body>
          <gov-details v-else summary="Service admin: Yes">
            <div v-for="(role, key) in serviceAdmin" :key="key">
              <gov-link
                :to="{ name: 'services-show', params: { service: role.service_id } }"
                v-text="role.service.name"
              />
            </div>
          </gov-details>
          <gov-body v-if="serviceWorker.length === 0">Service worker: No</gov-body>
          <gov-details v-else summary="Service worker: Yes">
            <div v-for="(role, key) in serviceWorker" :key="key">
              <gov-link
                :to="{ name: 'services-show', params: { service: role.service_id } }"
                v-text="role.service.name"
              />
            </div>
          </gov-details>
        </gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "CkUserDetails",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      superAdmin: false,
      globalAdmin: false,
      organisationAdmin: [],
      serviceAdmin: [],
      serviceWorker: []
    };
  },
  methods: {
    sortRoles() {
      this.superAdmin = false;
      this.globalAdmin = false;
      this.organisationAdmin = [];
      this.serviceAdmin = [];
      this.serviceWorker = [];

      this.user.roles.forEach(role => {
        if (role.role === "Super Admin") {
          this.superAdmin = true;
        } else if (role.role === "Global Admin") {
          this.globalAdmin = true;
        } else if (role.hasOwnProperty("organisation")) {
          this.organisationAdmin.push(role);
        } else if (
          role.hasOwnProperty("service") &&
          role.role === "Service Admin"
        ) {
          this.serviceAdmin.push(role);
        } else if (
          role.hasOwnProperty("service") &&
          role.role === "Service Worker"
        ) {
          this.serviceWorker.push(role);
        }
      });
    }
  },
  created() {
    this.sortRoles();
  }
};
</script>
