<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'organisations-index' }">Back to organisations</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Organisations</gov-heading>
          <gov-heading size="m">Add organisation</gov-heading>
          <gov-body>General details about the organisation. To be found when searching or linked from a service page.</gov-body>

          <organisation-form
            :errors="form.$errors"
            :name.sync="form.name"
            :slug.sync="form.slug"
            :description.sync="form.description"
            :url.sync="form.url"
            :email.sync="form.email"
            :phone.sync="form.phone"
            :logo.sync="form.logo"
            @clear="form.$errors.clear($event)"
          />

          <gov-section-break size="l" />

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import OrganisationForm from "@/views/organisations/forms/OrganisationForm";

export default {
  name: "CreateOrganisation",
  components: { OrganisationForm },
  data() {
    return {
      form: new Form({
        name: "",
        slug: "",
        description: "",
        url: "",
        email: "",
        phone: "",
        logo: null
      })
    };
  },
  watch: {
    ["form.name"](newName) {
      this.form.slug = this.slugify(newName);
    }
  },
  methods: {
    async onSubmit() {
      const response = await this.form.post("/organisations");
      const organisationId = response.data.id;
      this.$router.push({
        name: "organisations-show",
        params: { organisation: organisationId }
      });
    }
  }
};
</script>
