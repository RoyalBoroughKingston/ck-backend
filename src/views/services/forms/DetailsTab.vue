<template>
  <div>
    <gov-heading size="l">Service details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>General details about the service. (We use service in the broadcast sense, This could be counciling or weekly yoga classes).</gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="name"
          @input="onNameInput($event)"
          id="name"
          label="What is the name of your service (or activity)?"
          type="text"
          :error="errors.get('name')"
        />

        <ck-text-input
          :value="slug"
          @input="$emit('update:slug', $event); $emit('clear', 'slug')"
          id="slug"
          label="Unique slug"
          type="text"
          :error="errors.get('slug')"
          :disabled="!auth.isGlobalAdmin"
        >
          <gov-hint slot="hint" for="slug">
            This will be used to access the service page.<br>
            e.g. example.com/services/{{ slug }}
          </gov-hint>
        </ck-text-input>

        <ck-select-input
          v-if="isCreateForm"
          :value="organisation_id"
          @input="$emit('update:organisation_id', $event); $emit('clear', 'organisation_id')"
          id="organisation_id"
          label="Organisation"
          hint="Which organisation provides this service?"
          :options="organisations"
          :error="errors.get('organisation_id')"
        />

        <ck-text-input
          :value="url"
          @input="$emit('update:url', $event); $emit('clear', 'url')"
          id="url"
          label="What is the web address of your service?"
          hint="This must start with ‘http://’ or ‘https://’. You can use your organisation’s website address if the service doesn’t have its own."
          type="url"
          :error="errors.get('url')"
        />

        <ck-file-input
          :value="logo"
          @input="$emit('update:logo', $event); $emit('clear', 'logo')"
          id="logo"
          label="Upload your service logo"
          accept="image/x-png"
          :error="errors.get('logo')"
        >
          <template slot="hint">
            <gov-hint for="logo">
              This can be different to the logo of your organisation.
              <gov-link href="mailto:info@connectedkingston.uk?subject=Help%20Uploading%20Service%20Logo">Need help with your logo?</gov-link>
            </gov-hint>
            <gov-hint for="logo">
              If your service doesn't have a logo, the site will use the organisation logo if there is one uploaded.
            </gov-hint>
          </template>
        </ck-file-input>

        <ck-textarea-input
          :value="intro"
          @input="$emit('update:intro', $event); $emit('clear', 'intro')"
          id="intro"
          label="What does your service do?"
          hint="Please give a short summary of what your service offers. This will appear below the service name in search results. Try to use as many specific keywords as possible as this will help people find your service. Maximum 150 characters."
          :maxlength="150"
          :error="errors.get('intro')"
        />

        <ck-radio-input
          :value="status"
          @input="$emit('update:status', $event); $emit('clear', 'status')"
          id="status"
          label="Is the service enabled"
          hint="Indicates if the service is enabled or disabled (disabled services will not be shown in search results)"
          :options="statusOptions"
          :error="errors.get('status')"
          :disabled="!auth.isGlobalAdmin"
        />

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "DetailsTab",
  props: {
    errors: {
      required: true
    },
    isNew: {
      required: false,
      type: Boolean,
      default: false
    },
    name: {
      required: true
    },
    slug: {
      required: true
    },
    organisation_id: {
      required: false
    },
    url: {
      required: true
    },
    logo: {
      required: true
    },
    intro: {
      required: true
    },
    status: {
      required: true
    }
  },
  data() {
    return {
      organisations: [{ text: "Please select", value: null, disabled: true }],
      loading: false,
      statusOptions: [
        { label: "Enabled", value: "active" },
        { label: "Disabled", value: "inactive" }
      ]
    };
  },
  computed: {
    isCreateForm() {
      return this.organisation_id !== undefined;
    }
  },
  methods: {
    async fetchOrganisations() {
      this.loading = true;
      let fetchedOrganisations = await this.fetchAll("/organisations");
      fetchedOrganisations = fetchedOrganisations.map(organisation => {
        return { text: organisation.name, value: organisation.id };
      });
      this.organisations = [...this.organisations, ...fetchedOrganisations];
      this.loading = false;
    },
    onNameInput(name) {
      this.$emit("update:name", name);
      this.$emit("clear", "name");

      if (this.auth.isGlobalAdmin || this.isNew) {
        this.$emit("update:slug", this.slugify(name));
        this.$emit("clear", "slug");
      }
    }
  },
  created() {
    this.fetchOrganisations();
  }
};
</script>
