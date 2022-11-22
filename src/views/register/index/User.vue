<template>
  <div>
    <gov-back-link :to="{ name: 'register-index' }"> Back </gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l"> Create an account </gov-heading>

          <gov-body>
            First, create an account to login to the Connected Kingston
            administration portal
          </gov-body>

          <ck-text-input
            :value="form.user.first_name"
            @input="onInput('first_name', $event)"
            id="first_name"
            label="First name"
            type="text"
            :error="errors.get('user.first_name')"
          />

          <ck-text-input
            :value="form.user.last_name"
            @input="onInput('last_name', $event)"
            id="last_name"
            label="Last name"
            type="text"
            :error="errors.get('user.last_name')"
          />

          <ck-text-input
            :value="form.user.email"
            @input="onInput('email', $event)"
            id="email"
            label="Email"
            type="email"
            :error="errors.get('user.email')"
          />

          <ck-text-input
            :value="form.user.phone"
            @input="onInput('phone', $event)"
            id="phone"
            label="Phone"
            type="tel"
            :error="errors.get('user.phone')"
          />

          <ck-text-input
            :value="form.user.password"
            @input="onInput('password', $event)"
            id="password"
            label="Password"
            type="password"
            :error="errors.get('user.password')"
          />

          <gov-body>
            User account details are held in line with our
            <gov-link
              href="https://www.connectedkingston.uk/privacy-policy"
              target="_blank"
              >privacy policy</gov-link
            >.
          </gov-body>

          <gov-button start :to="{ name: 'register-index-organisation' }">
            Next
          </gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onInput(field, value) {
      this.$emit(
        "input",
        Object.assign(this.form, {
          user: {
            ...this.form.user,
            [field]: value,
          },
        })
      );
      this.$emit("clear", `user.${field}`);
    },
  },
};
</script>
