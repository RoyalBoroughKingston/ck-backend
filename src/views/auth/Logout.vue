<template>
  <gov-width-container>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">

          <gov-heading size="xl">Log out</gov-heading>

          <gov-body size="l">
            You have successfully been logged out.
          </gov-body>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Auth from "@/classes/Auth";

export default {
  created() {
    Auth.logout();
  }
};
</script>
