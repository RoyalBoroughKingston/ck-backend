<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">

          <gov-heading size="xl">Log in</gov-heading>

          <gov-body size="l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet est. Suspendisse eget lobortis metus.
          </gov-body>

          <ck-text-input
            v-model="email"
            @input="error = null"
            id="email"
            label="Email"
            type="email"
            :error="error"
          />

          <ck-text-input
            v-model="password"
            @input="error = null"
            id="password"
            label="Password"
            type="password"
            :error="null"
          >
            <gov-link slot="after-input" :to="{ name: 'forgotten-password' }">Forgotten password</gov-link>
          </ck-text-input>

          <gov-button @click="onSendCode">Send code</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import auth from "@/classes/Auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    onSendCode() {
      // TODO: This currently skips the code screen.
      auth
        .login(this.email, this.password)
        .then(() => {
          this.$root.$emit("login");
          this.$router.push({ name: "dashboard" });
        })
        .catch(
          () => (this.error = "A user does not exist with these credentials.")
        );
    }
  }
};
</script>
