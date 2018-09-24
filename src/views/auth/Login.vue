<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Login" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">

          <gov-heading size="xl">Log in</gov-heading>

          <template v-if="!validateRequest">
            <gov-body size="l">
              Failed logging in.<br>
              Please try login again using the link below.
            </gov-body>

            <gov-button :href="loginUrl">Login</gov-button>
          </template>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Auth from "@/classes/Auth";

export default {
  name: "Login",
  data() {
    return {
      accessToken:
        Auth.parseQueryString(window.location.href).access_token || null,
      expiresIn: Auth.parseQueryString(window.location.href).expires_in || null
    };
  },
  computed: {
    loginUrl() {
      return Auth.authorizeUrl;
    },
    validateRequest() {
      if (this.accessToken === null) {
        return false;
      }

      if (this.expiresIn === null) {
        return false;
      }

      return true;
    }
  },
  methods: {
    async login() {
      await Auth.login(this.accessToken, this.expiresIn);
      this.$root.$emit("login");
      this.$router.push({ name: "dashboard" });
    }
  },
  created() {
    if (this.validateRequest) {
      this.login();
    }
  }
};
</script>
