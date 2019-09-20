<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Register" />

    <router-view
      :organisation_types.sync="form.organisation_types"
      :user.sync="form.user"
      :organisation.sync="form.organisation"
      :service.sync="form.service"
      :errors="form.$errors"
      @clear="form.$errors.clear($event)"
    />
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form"

export default {
  data() {
    return {
      form: new Form({
        organisation_types: [],
        user: {
          first_name: '',
          last_name: '',
          email: '',
          phone: ''
        },
        organisation: {
          name: '',
          slug: '',
          description: '',
          url: '',
          email: '',
          phone: ''
        },
        service: {
          name: '',
          slug: '',
          type: 'service',
          intro: '',
          description: '',
          wait_time: null,
          is_free: true,
          fees_text: '',
          fees_url: '',
          testimonial: '',
          video_embed: '',
          url: '',
          contact_name: '',
          contact_phone: '',
          contact_email: '',
          criteria: {
            age_group: '',
            disability: '',
            employment: '',
            gender: '',
            housing: '',
            income: '',
            language: '',
            other: ''
          },
          useful_infos: [],
          offerings: [],
          social_medias: []
        }
      })
    }
  },

  watch: {
    ['form.organisation.name'](newName) {
      this.form.organisation.slug = this.slugify(newName);
    },

    ['form.service.name'](newName) {
      this.form.service.slug = this.slugify(newName);
    },

    ['form.service.is_free'](newIsFree) {
      if (newIsFree) {
        this.form.service.fees_text = '';
        this.form.service.fees_url = '';
      }
    }
  },
}
</script>
