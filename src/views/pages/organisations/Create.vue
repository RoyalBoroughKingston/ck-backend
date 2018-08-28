<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">Organisations</gov-heading>
          <gov-heading size="m">Add organisation</gov-heading>
          <gov-body>General details about the organisation. To be found when searching or linked from a service page.</gov-body>
          <gov-form-group :invalid="form.$errors.has('name')">
            <gov-label for="name" class="govuk-!-font-weight-bold">Organisation name</gov-label>
            <gov-input v-model="form.name" @input="form.$errors.clear('name')" id="name" name="name" type="text" />
            <gov-error-message v-if="form.$errors.has('name')" v-text="form.$errors.get('name')" for="name" />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('description')">
            <gov-label for="description" class="govuk-!-font-weight-bold">Please provide a one-line summary of organisation</gov-label>
            <gov-hint for="description">This should be a short line or two that summarises who the organisation is and will appear below the Organisation name on it's page (max 150 characters).</gov-hint>
            <gov-textarea v-model="form.description" @input="form.$errors.clear('description')" id="description" name="description" />
            <gov-error-message v-if="form.$errors.has('description')" v-text="form.$errors.get('description')" for="description" />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('url')">
            <gov-label for="url" class="govuk-!-font-weight-bold">Organisation website address</gov-label>
            <gov-input v-model="form.url" @input="form.$errors.clear('url')" id="url" name="url" type="url" />
            <gov-error-message v-if="form.$errors.has('url')" v-text="form.$errors.get('url')" for="url" />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('phone')">
            <gov-label for="phone" class="govuk-!-font-weight-bold">Public phone</gov-label>
            <gov-input v-model="form.phone" @input="form.$errors.clear('phone')" id="phone" name="phone" type="tel" />
            <gov-error-message v-if="form.$errors.has('phone')" v-text="form.$errors.get('phone')" for="phone" />
          </gov-form-group>
          <gov-form-group :invalid="form.$errors.has('phone')">
            <gov-label for="email" class="govuk-!-font-weight-bold">Public email address</gov-label>
            <gov-input v-model="form.email" @input="form.$errors.clear('email')" id="email" name="email" type="email" />
            <gov-error-message v-if="form.$errors.has('email')" v-text="form.$errors.get('email')" for="email" />
          </gov-form-group>
          <gov-form-group :invalid="logoForm.$errors.has('file')">
            <gov-label for="file" class="govuk-!-font-weight-bold">Organisation logo</gov-label>
            <gov-file-upload @change="onLogoChange" id="file" name="file" accept="image/x-png" />
            <gov-error-message v-if="logoForm.$errors.has('file')" v-text="logoForm.$errors.get('file')" for="file" />
          </gov-form-group>
          <gov-section-break size="l" />
          <gov-button v-if="submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
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
        name: "",
        slug: "",
        description: "",
        url: "",
        email: "",
        phone: ""
      }),
      logoForm: new Form({
        file: null
      })
    };
  },
  watch: {
    ["form.name"](newName) {
      this.form.slug = this.slugify(newName);
    }
  },
  computed: {
    submitting() {
      return this.form.$submitting || this.logoForm.$submitting;
    }
  },
  methods: {
    onLogoChange(fileContents) {
      this.logoForm.$errors.clear('file');
      this.logoForm.file = fileContents;
    },
    onSubmit() {
      this.form.post("/organisations").then(({ data }) => {
        const organisationId = data.id;

        if (this.logoForm.file === null) {
          this.$router.push({
            name: "organisations-show",
            params: { organisation: organisationId }
          });
          return;
        }

        this.logoForm.post(`/organisations/${organisationId}/logo`).then(() =>
          this.$router.push({
            name: "organisations-show",
            params: { organisation: organisationId }
          })
        );
      });
    }
  }
};
</script>
