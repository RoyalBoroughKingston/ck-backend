<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Organisations</gov-heading>
          <gov-heading size="m">Add organisation</gov-heading>
          <gov-body>General details about the organisation. To be found when searching or linked from a service page.</gov-body>
          <gov-form-group>
            <gov-label for="name" class="govuk-!-font-weight-bold">Organisation name</gov-label>
            <gov-input v-model="form.name" id="name" name="name" />
          </gov-form-group>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "CreateOrganisation",
  data() {
    return {
      form: new Form({
        name: ""
      })
    };
  }
}
</script>
