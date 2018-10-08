<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Logout" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">

          <gov-heading size="xl">Log out</gov-heading>

          <gov-body size="l">You are currently logged out.</gov-body>

          <gov-body size="l">Please login to access the system.</gov-body>

          <gov-button :href="loginUri">Login</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Auth from "@/classes/Auth";

export default {
  data() {
    return {
      loginUri: Auth.authorizeUrl
    };
  },
  created() {
    Auth.clearSessions();
    Auth.logout();

    this.$root.$emit("logout");
  }
};
</script>
