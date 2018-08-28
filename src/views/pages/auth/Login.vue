<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Log in</gov-heading>
          <gov-body size="l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet est. Suspendisse eget lobortis metus.
          </gov-body>
          <gov-form-group>
            <gov-label for="email">Email</gov-label>
            <gov-input v-model="form.email" id="email" name="email" />
          </gov-form-group>
          <gov-form-group>
            <gov-label for="email">Password</gov-label>
            <gov-input v-model="form.password" id="password" name="password" type="password" />
            <gov-link :to="{ name: 'forgotten-password' }">Forgotten password</gov-link>
          </gov-form-group>
          <gov-button @click="onSendCode">Send code</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "Login",
  data() {
    return {
      form: new Form({
        email: "",
        password: ""
      })
    };
  },
  methods: {
    onSendCode() {
      // TODO
      this.$router.push({ name: "login-code" });
    }
  }
};
</script>
