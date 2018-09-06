<template>
  <div>
    <gov-heading size="l">Contact details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>A place to put in the public facing contact details of your service. These will be displayed on the service page on the website.</gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="form.contact_name"
          @input="$emit('update:contact_name', $event); $emit('clear', 'contact_name')"
          id="contact_name"
          label="Contact name"
          hint="Please provide the contact name eg. Jane Bloggs or a function e.g. Enquiries"
          type="text"
          :error="form.$errors.get('contact_name')"
        />

        <ck-text-input
          :value="form.contact_phone"
          @input="$emit('update:contact_phone', $event); $emit('clear', 'contact_phone')"
          id="contact_phone"
          label="Contact phone number"
          hint="Please provide a public facing phone number"
          type="tel"
          :error="form.$errors.get('contact_phone')"
        />

        <ck-text-input
          :value="form.contact_email"
          @input="$emit('update:contact_email', $event); $emit('clear', 'contact_email')"
          id="contact_email"
          label="Public email address"
          hint="Please provide a public facing email address"
          type="email"
          :error="form.$errors.get('contact_email')"
        />

        <gov-section-break size="l" />

        <gov-heading size="m">Social media links</gov-heading>

        <!-- Social medias -->
        <gov-inset-text v-for="(socialMedia, index) in form.social_medias" :key="socialMedia.index">
          <ck-select-input
            :value="form.social_medias[index].type"
            @input="$emit('update:social_medias_type', { index, value: $event }); $emit('clear', `social_media.${index}.type`)"
            :id="`social_media.${index}.type`"
            label="Social media platform"
            :options="socialMediaTypeOptions"
            :error="form.$errors.get(`social_media.${index}.type`)"
          />

          <ck-text-input
            :value="form.social_medias[index].url"
            @input="$emit('update:social_medias_url', { index, value: $event }); $emit('clear', `social_medias.${index}.url`)"
            :id="`social_medias.${index}.url`"
            label="Enter url of your social page"
            type="url"
            :error="form.$errors.get(`social_medias.${index}.url`)"
          />

          <gov-button @click="onDeleteSocialMedia(index)" error>Delete</gov-button>
        </gov-inset-text>
        <!-- /Social midias -->

        <div>
          <gov-button @click="onAddSocialMedia">
            <template v-if="form.social_medias.length === 0">Add social media</template>
            <template v-else>Add another</template>
          </gov-button>
        </div>

        <gov-button @click="$emit('next')" start>Next</gov-button>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "ContactDetailsTab",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      socialMediaTypeOptions: [
        { text: "Please select", value: null, disabled: true },
        { text: "Twitter", value: "twitter" },
        { text: "Facebook", value: "facebook" },
        { text: "Instagram", value: "instagram" },
        { text: "YouTube", value: "youtube" },
        { text: "Other", value: "other" }
      ],
      socialMediasIndex: 1
    };
  },
  methods: {
    onAddSocialMedia() {
      this.$emit("add", {
        type: null,
        url: "",
        index: this.socialMediasIndex
      });

      this.socialMediasIndex++;
    },
    onDeleteSocialMedia(deleteIndex) {
      this.$emit("clear", `social_medias.${deleteIndex}.type`);
      this.$emit("clear", `social_medias.${deleteIndex}.url`);
      this.$emit("delete", deleteIndex);
    }
  }
};
</script>
