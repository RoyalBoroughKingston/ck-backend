<template>
  <div>
    <gov-heading size="l">Contact details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>A place to put in the public facing contact details of your service. These will be displayed on the service page on the website.</gov-body>
        <gov-section-break size="l" />

        <!-- Contact name -->
        <gov-form-group :invalid="form.$errors.has('contact_name')">
          <gov-label class="govuk-!-font-weight-bold" for="contact_name">
            Contact name
          </gov-label>
          <gov-hint for="contact_name">
            Please provide the contact name eg. Jane Bloggs or a function e.g. Enquiries
          </gov-hint>
          <gov-input
            :value="form.contact_name"
            @input="$emit('update:contact_name', $event)"
            id="contact_name"
            name="contact_name"
            type="text"
          />
          <gov-error-message
            v-if="form.$errors.has('contact_name')"
            v-text="form.$errors.get('contact_name')"
            for="contact_name"
          />
        </gov-form-group>
        <!-- /Contact name -->

        <!-- Contact phone -->
        <gov-form-group :invalid="form.$errors.has('contact_phone')">
          <gov-label class="govuk-!-font-weight-bold" for="contact_phone">
            Contact phone number
          </gov-label>
          <gov-hint for="contact_phone">
            Please provide a public facing phone number
          </gov-hint>
          <gov-input
            :value="form.contact_phone"
            @input="$emit('update:contact_phone', $event)"
            id="contact_phone"
            name="contact_phone"
            type="tel"
          />
          <gov-error-message
            v-if="form.$errors.has('contact_phone')"
            v-text="form.$errors.get('contact_phone')"
            for="contact_phone"
          />
        </gov-form-group>
        <!-- /Contact phone -->

        <!-- Contact email -->
        <gov-form-group :invalid="form.$errors.has('contact_email')">
          <gov-label class="govuk-!-font-weight-bold" for="contact_email">
            Public email address
          </gov-label>
          <gov-hint for="contact_email">
            Please provide a public facing email address
          </gov-hint>
          <gov-input
            :value="form.contact_email"
            @input="$emit('update:contact_email', $event)"
            id="contact_email"
            name="contact_email"
            type="email"
          />
          <gov-error-message
            v-if="form.$errors.has('contact_email')"
            v-text="form.$errors.get('contact_email')"
            for="contact_email"
          />
        </gov-form-group>
        <!-- /Contact email -->

        <gov-section-break size="l" />

        <gov-heading size="m">Social media links</gov-heading>

        <!-- Social medias -->
        <gov-inset-text v-for="(socialMedia, index) in form.social_medias" :key="socialMedia.index">
          <!-- Social media type -->
          <gov-form-group :invalid="form.$errors.has(`social_media.${index}.type`)">
            <gov-label class="govuk-!-font-weight-bold" :for="`social_medias.${index}.type`">
              Social media platform
            </gov-label>
            <gov-select
              :value="form.social_medias[index].type"
              @input="$emit('update:social_medias_type', { index, value: $event })"
              :id="`social_medias.${index}.type`"
              :name="`social_medias.${index}.type`"
              :options="socialMediaTypeOptions"
            />
            <gov-error-message
              v-if="form.$errors.has(`social_medias.${index}.type`)"
              v-text="form.$errors.get(`social_medias.${index}.type`)"
              :for="`social_medias.${index}.type`"
            />
          </gov-form-group>
          <!-- /Social media type -->

          <!-- Social media URL -->
          <gov-form-group :invalid="form.$errors.has(`social_medias.${index}.url`)">
            <gov-label class="govuk-!-font-weight-bold" :for="`social_medias.${index}.url`">
              Enter url of your social page
            </gov-label>
            <gov-input
              :value="form.social_medias[index].url"
              @input="$emit('update:social_medias_url', { index, value: $event })"
              :id="`social_medias.${index}.url`"
              :name="`social_medias.${index}.url`"
              type="url"
            />
            <gov-error-message
              v-if="form.$errors.has(`social_medias.${index}.url`)"
              v-text="form.$errors.get(`social_medias.${index}.url`)"
              :for="`social_medias.${index}.url`"
            />
          </gov-form-group>
          <!-- /Social media URL -->

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
