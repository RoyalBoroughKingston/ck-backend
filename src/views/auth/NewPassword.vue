<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Enter new password</gov-heading>
          <gov-body size="l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet est. Suspendisse eget lobortis metus.
          </gov-body>
          <gov-form-group>
            <gov-label for="password">New password</gov-label>
            <gov-input v-model="form.password" id="password" name="password" type="password" />
          </gov-form-group>
          <gov-form-group>
            <gov-label for="password-confirmation">Repeat new password</gov-label>
            <gov-input v-model="form.password_confirmation" id="password-confirmation" name="password-confirmation" type="password" />
          </gov-form-group>
          <gov-button>Submit</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "NewPassword",
  data() {
    return {
      form: new Form({
        password: "",
        password_confirmation: ""
      })
    };
  }
};
</script>
