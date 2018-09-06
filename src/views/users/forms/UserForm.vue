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
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    errors: {
      required: true,
      type: Object
    },
    first_name: {
      required: true,
      type: String
    },
    last_name: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    phone: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    }
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
