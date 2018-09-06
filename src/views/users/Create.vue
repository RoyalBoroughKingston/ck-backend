<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'users-index' }">Back to users</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">

          <gov-heading size="xl">Users</gov-heading>

          <gov-heading size="m">Add user</gov-heading>

          <gov-body>Create users to be able to acces the back-end of the Connected Kingston service (deciding their permissions in what they have access to)</gov-body>

          <user-form
            :errors="form.$errors"
            :first_name.sync="form.first_name"
            :last_name.sync="form.last_name"
            :email.sync="form.email"
            :phone.sync="form.phone"
            :password.sync="form.password"
            @clear="form.$errors.clear($event)"
          />

          <gov-section-break size="l" />

          <gov-heading size="m">Permissions</gov-heading>

          <gov-inset-text v-for="(role, key) in form.roles" :key="role.index">

            <ck-select-input
              v-model="form.roles[key].role"
              @input="form.$errors.clear(`roles.${key}.role`)"
              :id="`roles_${key}_role`"
              label="User type"
              :options="roleOptions"
              :error="form.$errors.get(`roles.${key}.role`)"
            />

            <!-- Select input for choosing organisation -->
            <template
              v-if="
                form.roles[key].role === 'Organisation Admin' ||
                form.roles[key].role === 'Service Admin' ||
                form.roles[key].role === 'Service Worker'
              "
            >
              <ck-loader v-if="loadingOrganisations" />
              <ck-select-input
                v-else
                v-model="form.roles[key].organisation_id"
                @input="form.$errors.clear(`roles.${key}.organisation_id`)"
                :id="`roles_${key}_organisation_id`"
                label="Organisation"
                :options="organisations"
                :error="form.$errors.get(`roles.${key}.organisation_id`)"
              />

              <!-- Select input for choosing service -->
              <template
                v-if="
                  form.roles[key].role === 'Service Admin' ||
                  form.roles[key].role === 'Service Worker'
                "
              >
                <gov-body v-if="!services.hasOwnProperty(form.roles[key].organisation_id)">Select an organisation</gov-body>
                <ck-loader v-else-if="services[form.roles[key].organisation_id].loading" />
                <ck-select-input
                  v-else
                  v-model="form.roles[key].service_id"
                  @input="form.$errors.clear(`roles.${key}.service_id`)"
                  :id="`roles_${key}_service_id`"
                  label="Service"
                  :options="services[form.roles[key].organisation_id].items"
                  :error="form.$errors.get(`roles.${key}.service_id`)"
                />
              </template>

            </template>

            <gov-button @click="onRemovePermission(key)" error>Remove</gov-button>
          </gov-inset-text>

          <gov-inset-text v-if="form.roles.length === 0">
            <gov-body>No permissions</gov-body>
          </gov-inset-text>

          <gov-button @click="onAddPermission">Add permission</gov-button>

          <gov-section-break size="l" />

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import UserForm from "@/views/users/forms/UserForm";

export default {
  name: "CreateUser",
  components: { UserForm },
  data() {
    return {
      form: new Form({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        roles: []
      }),
      roleOptions: [
        { text: "Please select", value: null, disabled: true },
        { text: "Super admin", value: "Super Admin" },
        { text: "Global admin", value: "Global Admin" },
        { text: "Organisation admin", value: "Organisation Admin" },
        { text: "Service admin", value: "Service Admin" },
        { text: "Service worker", value: "Service Worker" }
      ],
      roleIndex: 0,
      loadingOrganisations: false,
      organisations: [],
      services: {}
    };
  },
  methods: {
    onSubmit() {
      this.form
        .post("/users", (config, data) => {
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
        })
        .then(({ data }) => {
          this.$router.push({
            name: "users-show",
            params: { user: data.id }
          });
        });
    },
    onAddPermission() {
      // The role index is purely used for Vue to keep track when looping.
      this.form.roles.push({
        role: null,
        organisation_id: null,
        service_id: null,
        index: this.roleIndex
      });
      this.roleIndex++;
    },
    onRemovePermission(index) {
      this.form.$errors.clear(`roles.${index}.role`);
      this.form.$errors.clear(`roles.${index}.organisation_id`);
      this.form.$errors.clear(`roles.${index}.service_id`);
      this.$delete(this.form.roles, index);
    },
    async cacheOrganisations() {
      this.loadingOrganisations = true;
      this.organisations = [
        { value: null, text: "Please select", disabled: true }
      ];

      let organisations = await this.fetchAll("/organisations");
      organisations = organisations.map(organisation => {
        return {
          value: organisation.id,
          text: organisation.name
        };
      });
      this.organisations = [...this.organisations, ...organisations];

      this.loadingOrganisations = false;
    },
    async cacheServices(organisationId) {
      // Skip if the services have already been cached.
      if (this.services.hasOwnProperty(organisationId)) {
        return;
      }

      // Set the initial object.
      this.services[organisationId] = {
        items: [{ value: null, text: "Please select", disabled: true }],
        loading: true
      };

      let services = await this.fetchAll("/services", {
        "filter[organisation_id]": organisationId
      });
      services = services.map(service => {
        return {
          value: service.id,
          text: service.name
        };
      });
      this.services[organisationId].items = [
        ...this.services[organisationId].items,
        ...services
      ];

      this.services[organisationId].loading = false;
      this.$forceUpdate();
    }
  },
  watch: {
    "form.roles": {
      handler: function(newRoles) {
        newRoles.forEach(role => {
          // If the role uses a service, then lazy load the services and cache them.
          if (role.role === "Service Admin" || role.role === "Service Worker") {
            if (role.organisation_id !== null) {
              this.cacheServices(role.organisation_id);
            }
          }

          // Reset the organisation adn service ID when no longer applies to role.
          switch (role.role) {
            case "Super Admin":
            case "Global Aadmin":
              role.organisation_id = null;
              role.service_id = null;
              break;
            case "Organisation Admin":
              role.service_id = null;
              break;
          }
        });
      },
      deep: true
    }
  },
  created() {
    this.cacheOrganisations();
  }
};
</script>
