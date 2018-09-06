<template>
  <div>
    <ck-text-input
      :value="name"
      @input="onInput('name', $event)"
      id="name"
      label="Organisation name"
      type="text"
      :error="errors.get('name')"
    />

    <ck-text-input
      :value="slug"
      @input="onInput('slug', $event)"
      id="slug"
      label="Unique slug"
      type="text"
      :error="errors.get('slug')"
    >
      <gov-hint slot="hint" for="slug">
        This will be used to access the organisation page.<br>
        e.g. example.com/organisations/{{ slug }}
      </gov-hint>
    </ck-text-input>

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

    <ck-text-input
      :value="url"
      @input="onInput('url', $event)"
      id="url"
      label="Organisation website address"
      type="url"
      :error="errors.get('url')"
    />

    <ck-text-input
      :value="phone"
      @input="onInput('phone', $event)"
      id="phone"
      label="Public phone"
      type="tel"
      :error="errors.get('phone')"
    />

    <ck-text-input
      :value="email"
      @input="onInput('email', $event)"
      id="email"
      label="Public email address"
      type="email"
      :error="errors.get('email')"
    />

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
