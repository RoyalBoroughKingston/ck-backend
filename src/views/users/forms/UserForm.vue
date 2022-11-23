<template>
  <div>
    <ck-text-input
      :value="first_name"
      @input="onInput('first_name', $event)"
      id="first_name"
      label="First name"
      type="text"
      :error="errors.get('first_name')"
    />

    <ck-text-input
      :value="last_name"
      @input="onInput('last_name', $event)"
      id="last_name"
      label="Last name"
      type="text"
      :error="errors.get('last_name')"
    />

    <ck-text-input
      :value="email"
      @input="onInput('email', $event)"
      id="email"
      label="Email"
      type="email"
      :error="errors.get('email')"
    />

    <ck-text-input
      :value="phone"
      @input="onInput('phone', $event)"
      id="phone"
      label="Phone"
      type="tel"
      :error="errors.get('phone')"
    />

    <ck-text-input
      :value="password"
      @input="onInput('password', $event)"
      id="password"
      label="Password"
      type="password"
      :error="errors.get('password')"
    />

    <gov-section-break size="l" />

    <gov-heading size="m">Permissions</gov-heading>

    <gov-list bullet>
      <li>
        <strong>Organisation admins:</strong>
        Add services, add users, edit services, edit users, manage referrals
      </li>
      <li>
        <strong>Service admins:</strong>
        Edit services, manage referrals
      </li>
      <li>
        <strong>Service workers:</strong>
        Manage referrals
      </li>
    </gov-list>

    <user-roles-input
      :roles="roles"
      @input="$emit('update:roles', $event)"
      @clear="$emit('clear', $event)"
      :errors="errors"
    />
  </div>
</template>

<script>
import UserRolesInput from "@/views/users/inputs/UserRolesInput";

export default {
  name: "UserForm",
  components: { UserRolesInput },
  props: {
    errors: {
      required: true,
      type: Object,
    },
    first_name: {
      required: true,
      type: String,
    },
    last_name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    roles: {
      required: true,
      type: Array,
    },
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
  },
};
</script>
