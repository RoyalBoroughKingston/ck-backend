<template>
  <div>
    <gov-heading size="l">{{ type | ucfirst }} details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>General details about the {{ type }}. (We use {{ type }} in the broadcast sense, This could be counciling or weekly yoga classes).</gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="type"
          @input="$emit('update:type', $event); $emit('clear', 'type')"
          id="type"
          label="What is it?"
          hint="This option changes how your page is described on Connected Kingston"
          :options="typeOptions"
          :error="errors.get('type')"
        />

        <ck-text-input
          :value="name"
          @input="onNameInput($event)"
          id="name"
          :label="`What is the name of your ${type}?`"
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
            This will be used to access the {{ type }} page.<br>
            e.g. example.com/services/{{ slug }}
          </gov-hint>
        </ck-text-input>

        <template v-if="isNew || auth.isGlobalAdmin">
          <ck-loader v-if="loading" />
          <ck-select-input
            v-else
            :value="organisation_id"
            @input="$emit('update:organisation_id', $event); $emit('clear', 'organisation_id')"
            id="organisation_id"
            label="Organisation"
            :hint="`Which organisation hosts this ${type}?`"
            :options="organisations"
            :error="errors.get('organisation_id')"
          />
        </template>

        <ck-text-input
          :value="url"
          @input="$emit('update:url', $event); $emit('clear', 'url')"
          id="url"
          :label="`What is the web address of your ${type}?`"
          :hint="`This must start with ‘http://’ or ‘https://’. You can use your organisation’s website address if the ${type} doesn’t have its own.`"
          type="url"
          :error="errors.get('url')"
        />

        <ck-image-input
          @input="$emit('update:logo_file_id', $event.file_id)"
          id="logo"
          :label="`Upload your ${type} logo`"
          accept="image/x-png"
          :existing-url="id ? apiUrl(`/services/${id}/logo.png?v=${now}`) : undefined"
        >
          <template slot="hint">
            <gov-hint for="logo">
              This can be different to the logo of your organisation.
              <gov-link :href="logoHelpHref">Need help with your logo?</gov-link>
            </gov-hint>
            <gov-hint for="logo">
              If your {{ type }} doesn't have a logo, the site will use the organisation logo if there is one uploaded.
            </gov-hint>
          </template>
        </ck-image-input>

        <ck-textarea-input
          :value="intro"
          @input="$emit('update:intro', $event); $emit('clear', 'intro')"
          id="intro"
          :label="`What does your ${type} do?`"
          :hint="`Please give a short summary of what your ${type} offers. This will appear below the ${type} name in search results. Try to use as many specific keywords as possible as this will help people find your ${type}. Maximum 150 characters.`"
          :maxlength="300"
          :error="errors.get('intro')"
        />

        <ck-radio-input
          :value="status"
          @input="$emit('update:status', $event); $emit('clear', 'status')"
          id="status"
          :label="`Is the ${type} enabled`"
          :hint="`Indicates if the ${type} is enabled or disabled (disabled ${$options.filters.plural(type)} will not be shown in search results)`"
          :options="statusOptions"
          :error="errors.get('status')"
          :disabled="!auth.isGlobalAdmin"
        />

        <template v-if="false">
          <gov-heading size="m">Gallery items</gov-heading>

          <gov-body>Upload images of the {{ type }} to the {{ type }}'s gallery.</gov-body>

          <ck-gallery-items-input
            :gallery-items="gallery_items"
            @input="$emit('update:gallery_items', $event)"
            @clear="$emit('clear', $event)"
            :errors="errors"
          />
        </template>

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import CkImageInput from "@/components/Ck/CkImageInput";
import CkGalleryItemsInput from "@/views/services/inputs/GalleryItemsInput";

export default {
  name: "DetailsTab",
  components: { CkImageInput, CkGalleryItemsInput },
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
    type: {
      required: true
    },
    organisation_id: {
      required: false
    },
    url: {
      required: true
    },
    intro: {
      required: true
    },
    status: {
      required: true
    },
    gallery_items: {
      required: true
    },
    id: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      organisations: [{ text: "Please select", value: null, disabled: true }],
      loading: false,
      typeOptions: [
        { text: "It is a Service", value: "service" },
        { text: "It is an Activity", value: "activity" },
        { text: "It is a Club", value: "club" },
        { text: "It is a Group", value: "group" }
      ],
      statusOptions: [
        { label: "Enabled", value: "active" },
        { label: "Disabled", value: "inactive" }
      ]
    };
  },
  computed: {
    logoHelpHref() {
      const to = "info@connectedkingston.uk";
      const subject = "Help uploading service logo";

      return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
    }
  },
  methods: {
    async fetchOrganisations() {
      this.loading = true;
      let fetchedOrganisations = await this.fetchAll("/organisations", {
        'filter[has_permission]': true
      });
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
    },
  },
  created() {
    this.fetchOrganisations();
  }
};
</script>
