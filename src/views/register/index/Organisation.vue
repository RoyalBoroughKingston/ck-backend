<template>
  <div>
    <gov-back-link :to="{ name: 'register-index-user' }">
      Back
    </gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">
            What organisation runs this service?
          </gov-heading>

          <gov-body>
            If you are a smaller group or activity that isn't directly run by an
            organisation, you can enter details about your service/group below.
          </gov-body>

          <ck-text-input
            :value="form.organisation.name"
            @input="onInput('name', $event)"
            id="name"
            label="Organisation name"
            type="text"
            :error="errors.get('organisation.name')"
          />

          <ck-text-input
            :value="form.organisation.slug"
            @input="onInput('slug', $event)"
            id="slug"
            label="Unique slug"
            type="text"
            :error="errors.get('organisation.slug')"
          >
            <gov-hint slot="hint" for="slug">
              This will be used to access the organisation page.<br>
              e.g. example.com/organisations/{{ form.organisation.slug }}
            </gov-hint>
          </ck-text-input>

          <ck-wysiwyg-input
            :value="form.organisation.description"
            @input="onInput('description', $event)"
            id="description"
            label="Please provide a one-line summary of organisation"
            hint="This should be a short line or two that summarises who the organisation is and will appear below the Organisation name on it's page."
            :error="errors.get('organisation.description')"
          />

          <ck-text-input
            :value="form.organisation.url"
            @input="onInput('url', $event)"
            id="url"
            label="Organisation website address"
            hint="This must start with ‘http://’ or ‘https://’."
            type="url"
            :error="errors.get('organisation.url')"
          />

          <ck-text-input
            :value="form.organisation.phone"
            @input="onInput('phone', $event)"
            id="phone"
            label="Public phone"
            type="tel"
            :error="errors.get('organisation.phone')"
          />

          <ck-text-input
            :value="form.organisation.email"
            @input="onInput('email', $event)"
            id="email"
            label="Public email address"
            type="email"
            :error="errors.get('organisation.email')"
          />

          <gov-button start :to="{ name: 'register-index-service' }">
            Next
          </gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  methods: {
    onInput(field, value) {
      this.$emit('input', Object.assign(this.form, {
        organisation: {
          ...this.form.organisation,
          [field]: value
        }
      }));
      this.$emit('clear', `organisation.${field}`);
    }
  }
}
</script>
