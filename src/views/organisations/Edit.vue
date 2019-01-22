<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Edit Organisation: ${organisation.name}`" />

      <gov-back-link :to="{ name: 'organisations-show', params: { organisation: organisation.id } }">Back to organisation</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">Organisations</gov-heading>
            <gov-heading size="m">Edit organisation</gov-heading>
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

            <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
            <ck-submit-error v-if="form.$errors.any()" />
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";
import OrganisationForm from "@/views/organisations/forms/OrganisationForm";

export default {
  name: "EditOrganisation",
  components: { OrganisationForm },
  data() {
    return {
      loading: false,
      organisation: null,
      form: null
    };
  },
  methods: {
    async fetchOrganisation() {
      this.loading = true;

      const response = await http.get(
        `/organisations/${this.$route.params.organisation}`
      );
      this.organisation = response.data.data;
      this.form = new Form({
        name: this.organisation.name,
        slug: this.organisation.slug,
        description: this.organisation.description,
        url: this.organisation.url,
        email: this.organisation.email,
        phone: this.organisation.phone,
        logo: null
      });

      this.loading = false;
    },
    async onSubmit() {
      await this.form.put(
        `/organisations/${this.organisation.id}`,
        (config, data) => {
          // Remove any unchagned values.
          if (data.name === this.organisation.name) {
            delete data.name;
          }
          if (data.slug === this.organisation.slug) {
            delete data.slug;
          }
          if (data.description === this.organisation.description) {
            delete data.description;
          }
          if (data.url === this.organisation.url) {
            delete data.url;
          }
          if (data.email === this.organisation.email) {
            delete data.email;
          }
          if (data.phone === this.organisation.phone) {
            delete data.phone;
          }

          // Remove the logo from the request if null.
          if (data.logo === null) {
            delete data.logo;
          }
        }
      );
      this.$router.push({
        name: "organisations-updated",
        params: { organisation: this.organisation.id }
      });
    }
  },
  created() {
    this.fetchOrganisation();
  }
};
</script>
