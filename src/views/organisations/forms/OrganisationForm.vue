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

    <ck-wysiwyg-input
      :value="description"
      @input="onInput('description', $event)"
      id="description"
      label="Please provide a one-line summary of organisation"
      hint="This should be a short line or two that summarises who the organisation is and will appear below the Organisation name on it's page (max 150 characters)."
      :error="errors.get('description')"
    />

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

    <ck-image-input
      @input="onInput('logo_file_id', $event)"
      id="logo"
      label="Organisation logo"
      accept="image/x-png"
      :existing-url="id ? apiUrl(`/organisations/${id}/logo.png?v=${now}`) : undefined"
    />

  </div>
</template>

<script>
import CkImageInput from "@/components/Ck/CkImageInput";

export default {
  name: "OrganisationForm",
  components: { CkImageInput },
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
    id: {
      required: false,
      type: String
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
