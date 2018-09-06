<template>
  <div>
    <gov-heading size="l">Service details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>General details about the service. (We use service in the broadcast sense, This could be counciling or weekly yoga classes).</gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="form.name"
          @input="$emit('update:name', $event); $emit('clear', 'name'); $emit('clear', 'slug')"
          id="name"
          label="Name of service"
          type="text"
          :error="form.$errors.get('name')"
        />

        <ck-text-input
          :value="form.slug"
          @input="$emit('update:slug', $event); $emit('clear', 'slug')"
          id="slug"
          label="Unique slug"
          type="text"
          :error="form.$errors.get('slug')"
        >
          <gov-hint slot="hint" for="slug">
            This will be used to access the service page.<br>
            e.g. example.com/services/{{ form.slug }}
          </gov-hint>
        </ck-text-input>

        <ck-select-input
          :value="form.organisation_id"
          @input="$emit('update:organisation_id', $event); $emit('clear', 'organisation_id')"
          id="organisation_id"
          label="Organisation"
          hint="Which organisation provides this service?"
          :options="organisations"
          :error="form.$errors.get('organisation_id')"
        />

        <ck-text-input
          :value="form.url"
          @input="$emit('update:url', $event); $emit('clear', 'url')"
          id="url"
          label="Service website address"
          hint="or your organisation if you do not have a seperate service website/page"
          type="url"
          :error="form.$errors.get('url')"
        />

        <ck-file-input
          :value="form.logo"
          @input="$emit('update:logo', $event); $emit('clear', 'logo')"
          id="logo"
          label="Service logo"
          hint="please upload a logo of the service, not the organisation."
          accept="image/x-png"
          :error="form.$errors.get('logo')"
        />

        <ck-textarea-input
          :value="form.intro"
          @input="$emit('update:intro', $event); $emit('clear', 'intro')"
          id="intro"
          label="Please provide a one-line summary of the service"
          hint="This should be a short line or two that summarises what the service offers and will appear below the service name in search results (max 150 characters)."
          :maxlength="150"
          :error="form.$errors.get('intro')"
        />

        <ck-wysiwyg-input
          :value="form.description"
          @input="$emit('update:description', $event); $emit('clear', 'description')"
          id="description"
          label="Service description"
          :error="form.$errors.get('description')"
        >
          <gov-hint slot="hint" for="description">
            Please enter a more detailed description of the service. This will be
            the main body of text on the page - though it shouldn't be too long.
            <br/><br/>
            The description should contain details about accessing the service,
            that sort of activities happen there, and who should get in touch
            (max 1600 characters).
          </gov-hint>
        </ck-wysiwyg-input>

        <gov-button @click="$emit('next')" start>Next</gov-button>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "DetailsTab",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      organisations: [{ text: "Please select", value: null, disabled: true }],
      loading: false
    };
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
    }
  },
  created() {
    this.fetchOrganisations();
  }
};
</script>
