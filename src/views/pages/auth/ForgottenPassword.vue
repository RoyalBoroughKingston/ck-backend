<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'login' }">Back to login</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Forgot password</gov-heading>
          <gov-body size="l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet est. Suspendisse eget lobortis metus.
          </gov-body>
          <gov-form-group>
            <gov-label for="email">Email</gov-label>
            <gov-input v-model="form.email" id="email" name="email" type="email" />
          </gov-form-group>
          <gov-button>Send</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "ForgottenPassword",
  data() {
    return {
      form: new Form({
        email: ""
      })
    };
  }
};
</script>
