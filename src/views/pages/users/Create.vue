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
      roleIndex: 0
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
      this.form.roles.push({ role: null, index: this.roleIndex });
      this.roleIndex++;
    },
    onRemovePermission(index) {
      this.$delete(this.form.roles, index);
    }
  }
};
</script>
