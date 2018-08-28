<template>
  <gov-width-container>
    <gov-back-link to="/">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="xl">Log in</gov-heading>
          <gov-body size="l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt aliquet est. Suspendisse eget lobortis metus.
          </gov-body>
          <gov-form-group>
            <gov-label for="code-1">Enter 4 digit code</gov-label>
            <gov-input v-model="form.code1" id="code-1" name="code-1" :width="2" type="number" />&nbsp;<!--
         --><gov-input v-model="form.code2" id="code-2" name="code-2" :width="2" type="number" />&nbsp;<!--
         --><gov-input v-model="form.code3" id="code-3" name="code-3" :width="2" type="number" />&nbsp;<!--
         --><gov-input v-model="form.code4" id="code-4" name="code-4" :width="2" type="number" />
            <div>
              <gov-link to="#">Resend code</gov-link>
            </div>
          </gov-form-group>
          <gov-button>Log in</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "LoginCode",
  data() {
    return {
      form: new Form({
        code1: "",
        code2: "",
        code3: "",
        code4: ""
      })
    };
  },
  computed: {
    code() {
      return (
        this.form.code1 + this.form.code2 + this.form.code3 + this.form.code4
      );
    }
  }
};
</script>
