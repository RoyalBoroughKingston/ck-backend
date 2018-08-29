<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Users</gov-heading>
          <gov-heading size="m">Add user</gov-heading>
          <gov-body>Create users to be able to acces the back-end of the Connected Kingston service (deciding their permissions in what they have access to)</gov-body>
          <gov-form-group :invalid="form.$errors.has('first_name')">
            <gov-label for="first_name" class="govuk-!-font-weight-bold">First name</gov-label>
            <gov-input
              v-model="form.first_name"
              @input="form.$errors.clear('first_name')"
              id="first_name"
              name="first_name"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('first_name')"
              v-text="form.$errors.get('first_name')"
              for="first_name"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('last_name')">
            <gov-label for="last_name" class="govuk-!-font-weight-bold">Last name</gov-label>
            <gov-input
              v-model="form.last_name"
              @input="form.$errors.clear('last_name')"
              id="last_name"
              name="last_name"
              type="text"
            />
            <gov-error-message
              v-if="form.$errors.has('last_name')"
              v-text="form.$errors.get('last_name')"
              for="last_name"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('email')">
            <gov-label for="email" class="govuk-!-font-weight-bold">Email</gov-label>
            <gov-input
              v-model="form.email"
              @input="form.$errors.clear('email')"
              id="email"
              name="email"
              type="email"
            />
            <gov-error-message
              v-if="form.$errors.has('email')"
              v-text="form.$errors.get('email')"
              for="email"
            />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('phone')">
            <gov-label for="phone" class="govuk-!-font-weight-bold">Phone</gov-label>
            <gov-input
              v-model="form.phone"
              @input="form.$errors.clear('phone')"
              id="phone"
              name="phone"
              type="tel"
            />
            <gov-error-message
              v-if="form.$errors.has('phone')"
              v-text="form.$errors.get('phone')"
              for="phone"
            />
          </gov-form-group>
          <gov-section-break size="l" />
          <gov-heading size="m">Permissions</gov-heading>
          <gov-inset-text v-for="(role, key) in form.roles" :key="role.index">
            <gov-form-group :invalid="form.$errors.has(`roles.${key}.role`)">
              <gov-label :for="`roles_${key}_role`">User type</gov-label>
              <gov-select
                v-model="form.roles[key].role"
                @input="form.$errors.clear(`roles.${key}.role`)"
                :id="`roles_${key}_role`"
                :name="`roles_${key}_role`"
                :options="roleOptions"
              />
              <gov-error-message
                v-if="form.$errors.has(`roles.${key}.role`)"
                v-text="form.$errors.get(`roles.${key}.role`)"
                :for="`roles_${key}_role`"
              />
            </gov-form-group>

            <!-- Select input for choosing organisation -->
            <template
              v-if="
                form.roles[key].role === 'Organisation Admin' ||
                form.roles[key].role === 'Service Admin' ||
                form.roles[key].role === 'Service Worker'
              "
            >
              <ck-loader v-if="loadingOrganisations" />
              <gov-form-group
                v-else
                :invalid="form.$errors.has(`roles.${key}.organisation_id`)"
              >
                <gov-label :for="`roles_${key}_organisation_id`">Organisation</gov-label>
                <gov-select
                  v-model="form.roles[key].organisation_id"
                  @input="form.$errors.clear(`roles.${key}.organisation_id`)"
                  :id="`roles_${key}_organisation_id`"
                  :name="`roles_${key}_organisation_id`"
                  :options="organisations"
                />
                <gov-error-message
                  v-if="form.$errors.has(`roles.${key}.organisation_id`)"
                  v-text="form.$errors.get(`roles.${key}.organisation_id`)"
                  :for="`roles_${key}_organisation_id`"
                />
              </gov-form-group>

              <!-- Select input for choosing service -->
              <template
                v-if="
                  form.roles[key].role === 'Service Admin' ||
                  form.roles[key].role === 'Service Worker'
                "
              >
                <ck-loader
                  v-if="
                    !services.hasOwnProperty(form.roles[key].organisation_id) ||
                    services[form.roles[key].organisation_id].loading
                  "
                />
                <gov-form-group
                  v-else
                  :invalid="form.$errors.has(`roles.${key}.service_id`)"
                >
                  <gov-label :for="`roles_${key}_service_id`">Service</gov-label>
                  <gov-select
                    v-model="form.roles[key].service_id"
                    @input="form.$errors.clear(`roles.${key}.service_id`)"
                    :id="`roles_${key}_service_id`"
                    :name="`roles_${key}_service_id`"
                    :options="services[form.roles[key].organisation_id].items"
                  />
                  <gov-error-message
                    v-if="form.$errors.has(`roles.${key}.service_id`)"
                    v-text="form.$errors.get(`roles.${key}.service_id`)"
                    :for="`roles_${key}_service_id`"
                  />
                </gov-form-group>
              </template>

            </template>

            <gov-button @click="onRemovePermission(key)" class="bg-error">Remove</gov-button>
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
import http from "@/http";

export default {
  name: "CreateUser",
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
      this.form.post("/users").then(({ data }) => {
        this.$router.push({
          name: "users-show",
          params: { user: data.data.id }
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
      this.organisations = [{ value: null, text: "Please select", disabled: true}];

      let allFetched = false;
      let page = 1;

      do {
        const { data } = await http.get('/organisations', { params: { page } });
        const fetchedOrganisations = data.data.map(organisation => {
          return {
            value: organisation.id,
            text: organisation.name
          };
        });
        this.organisations = [...this.organisations, ...fetchedOrganisations];
        allFetched = data.meta.current_page === data.meta.last_page;
        page++;
      } while (!allFetched);

      this.loadingOrganisations = false;
    },
    async cacheServices(organisationId) {
      // Skip if the services have already been cached.
      if (this.services.hasOwnProperty(organisationId)) {
        return;
      }

      // Set the initial object.
      this.services[organisationId] = {
        items: [{ value: null, text: "Please select", disabled: true}],
        loading: true
      };

      let allFetched = false;
      let page = 1;

      do {
        const { data } = await http.get('/services', { params: {
          page,
          "filter[organisation_id]": organisationId
        } });
        const fetchedServices = data.data.map(service => {
          return {
            value: service.id,
            text: service.name
          };
        });
        this.services[organisationId].items = [...this.services[organisationId].items, ...fetchedServices];
        allFetched = data.meta.current_page === data.meta.last_page;
        page++;
      } while (!allFetched);

      this.services[organisationId].loading = false;
      this.$forceUpdate();
    }
  },
  watch: {
    "form.roles": {
      handler: function (newRoles) {
        newRoles.forEach(role => {
          if (role.role === "Service Admin" || role.role === "Service Worker") {
            if (role.organisation_id !== null) {
              this.cacheServices(role.organisation_id);
            }
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
