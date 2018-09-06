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

    <gov-form-group :invalid="errors.has('last_name')">
      <gov-label for="last_name" class="govuk-!-font-weight-bold">Last name</gov-label>
      <gov-input
        :value="last_name"
        @input="onInput('last_name', $event)"
        id="last_name"
        name="last_name"
        type="text"
      />
      <gov-error-message
        v-if="errors.has('last_name')"
        v-text="errors.get('last_name')"
        for="last_name"
      />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('email')">
      <gov-label for="email" class="govuk-!-font-weight-bold">Email</gov-label>
      <gov-input
        :value="email"
        @input="onInput('email', $event)"
        id="email"
        name="email"
        type="email"
      />
      <gov-error-message
        v-if="errors.has('email')"
        v-text="errors.get('email')"
        for="email"
      />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('phone')">
      <gov-label for="phone" class="govuk-!-font-weight-bold">Phone</gov-label>
      <gov-input
        :value="phone"
        @input="onInput('phone', $event)"
        id="phone"
        name="phone"
        type="tel"
      />
      <gov-error-message
        v-if="errors.has('phone')"
        v-text="errors.get('phone')"
        for="phone"
      />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('password')">
      <gov-label for="password" class="govuk-!-font-weight-bold">Password</gov-label>
      <gov-input
        :value="password"
        @input="onInput('password', $event)"
        id="password"
        name="password"
        type="password"
      />
      <gov-error-message
        v-if="errors.has('password')"
        v-text="errors.get('password')"
        for="password"
      />
    </gov-form-group>
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
