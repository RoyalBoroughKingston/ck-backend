<template>
  <div>
    <gov-heading size="l">Contact details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>A place to put in the public facing contact details of your service. These will be displayed on the service page on the website.</gov-body>

        <gov-section-break size="l" />

        <ck-text-input
          :value="contact_name"
          @input="$emit('update:contact_name', $event); $emit('clear', 'contact_name')"
          id="contact_name"
          label="Contact name"
          hint="Please provide the contact name eg. Jane Bloggs or a function e.g. Enquiries"
          type="text"
          :error="errors.get('contact_name')"
        />

        <ck-text-input
          :value="contact_phone"
          @input="$emit('update:contact_phone', $event); $emit('clear', 'contact_phone')"
          id="contact_phone"
          label="Contact phone number"
          hint="Please provide a public facing phone number"
          type="tel"
          :error="errors.get('contact_phone')"
        />

        <ck-text-input
          :value="contact_email"
          @input="$emit('update:contact_email', $event); $emit('clear', 'contact_email')"
          id="contact_email"
          label="Public email address"
          hint="Please provide a public facing email address"
          type="email"
          :error="errors.get('contact_email')"
        />

        <gov-section-break size="l" />

        <gov-heading size="m">Social media links</gov-heading>

        <social-medias-input
          :social-medias="social_medias"
          @input="$emit('update:social_medias', $event)"
          :errors="errors"
        />

        <gov-button @click="$emit('next')" start>Next</gov-button>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import SocialMediasInput from "@/views/services/inputs/SocialMediasInput";

export default {
  name: "ContactDetailsTab",
  components: { SocialMediasInput },
  props: {
    errors: {
      required: true
    },
    contact_name: {
      required: true
    },
    contact_phone: {
      required: true
    },
    contact_email: {
      required: true
    },
    social_medias: {
      required: true
    }
  }
};
</script>
