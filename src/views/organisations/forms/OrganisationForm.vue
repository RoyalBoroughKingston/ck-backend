<template>
  <div>
    <gov-form-group :invalid="errors.has('name')">
      <gov-label for="name" class="govuk-!-font-weight-bold">Organisation name</gov-label>
      <gov-input
        :value="name"
        @input="onInput('name', $event)"
        id="name"
        name="name"
        type="text"
      />
      <gov-error-message v-if="errors.has('name')" v-text="errors.get('name')" for="name" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('slug')">
      <gov-label for="slug" class="govuk-!-font-weight-bold">Unique slug</gov-label>
      <gov-hint for="slug">
        This will be used to access the organisation page.<br>
        e.g. example.com/organisations/{{ slug }}
      </gov-hint>
      <gov-input
        :value="slug"
        @input="onInput('slug', $event)"
        id="slug"
        name="slug"
        type="text"
      />
      <gov-error-message v-if="errors.has('slug')" v-text="errors.get('slug')" for="slug" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('description')">
      <gov-label for="description" class="govuk-!-font-weight-bold">Please provide a one-line summary of organisation</gov-label>
      <gov-hint for="description">This should be a short line or two that summarises who the organisation is and will appear below the Organisation name on it's page (max 150 characters).</gov-hint>
      <ck-wysiwyg
        :value="description"
        @input="onInput('description', $event)"
        id="description"
      />
      <gov-error-message v-if="errors.has('description')" v-text="errors.get('description')" for="description" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('url')">
      <gov-label for="url" class="govuk-!-font-weight-bold">Organisation website address</gov-label>
      <gov-input
        :value="url"
        @input="onInput('url', $event)"
        id="url"
        name="url"
        type="url"
      />
      <gov-error-message v-if="errors.has('url')" v-text="errors.get('url')" for="url" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('phone')">
      <gov-label for="phone" class="govuk-!-font-weight-bold">Public phone</gov-label>
      <gov-input
        :value="phone"
        @input="onInput('phone', $event)"
        id="phone"
        name="phone"
        type="tel"
      />
      <gov-error-message v-if="errors.has('phone')" v-text="errors.get('phone')" for="phone" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('phone')">
      <gov-label for="email" class="govuk-!-font-weight-bold">Public email address</gov-label>
      <gov-input
        :value="email"
        @input="onInput('email', $event)"
        id="email"
        name="email"
        type="email"
      />
      <gov-error-message v-if="errors.has('email')" v-text="errors.get('email')" for="email" />
    </gov-form-group>

    <gov-form-group :invalid="errors.has('logo')">
      <gov-label for="logo" class="govuk-!-font-weight-bold">Organisation logo</gov-label>
      <gov-file-upload
        :value="logo"
        @change="onInput('logo', $event)"
        id="logo"
        name="logo"
        accept="image/x-png"
      />
      <gov-error-message v-if="errors.has('logo')" v-text="errors.get('logo')" for="logo" />
    </gov-form-group>
  </div>
</template>

<script>
export default {
  name: "OrganisationForm",
  props: {
    errors: {
      required: true,
      type: Object
    },
    name: {
      required: true,
      type: String
    },
    slug: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    url: {
      required: true,
      type: String
    },
    phone: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    logo: {
      required: true
    }
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
