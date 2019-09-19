<template>
  <div>
    <gov-back-link :to="{ name: 'register-index' }">
      Back
    </gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">
            Create an account
          </gov-heading>

          <gov-body>
            First, create an account to login to the Connected Kingston
            administration portal
          </gov-body>

          <ck-text-input
            :value="user.first_name"
            @input="onInput('first_name', $event)"
            id="first_name"
            label="First name"
            type="text"
            :error="errors.get('first_name')"
          />

          <ck-text-input
            :value="user.last_name"
            @input="onInput('last_name', $event)"
            id="last_name"
            label="Last name"
            type="text"
            :error="errors.get('last_name')"
          />

          <ck-text-input
            :value="user.email"
            @input="onInput('email', $event)"
            id="email"
            label="Email"
            type="email"
            :error="errors.get('email')"
          />

          <ck-text-input
            :value="user.phone"
            @input="onInput('phone', $event)"
            id="phone"
            label="Phone"
            type="tel"
            :error="errors.get('phone')"
          />

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
    user: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  methods: {
    onInput(field, value) {
      this.$emit('input', Object.assign(this.user, { [field]: value }));
      this.$emit('clear', `user.${field}`);
    }
  }
}
</script>
