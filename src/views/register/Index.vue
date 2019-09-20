<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Register" />

    <gov-error-summary v-if="form.$errors.any()" title="Check for errors">
      <gov-list>
        <li
          v-for="(error, field) in form.$errors.all()"
          :key="field"
          v-text="error[0]"
        />
      </gov-list>
    </gov-error-summary>

    <router-view
      :form="form"
      :errors="form.$errors"
      @input="onInput($event)"
      @clear="$delete(form.$errors.errors, $event.replace(/\./g, '_'))"
      @submit="onSubmit"
    />
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form"
import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_API_URI}/core/v1`
});
http.defaults.headers.post["Content-Type"] = "application/json";

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
      }, {}, http)
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

  methods: {
    onInput(data) {
      for (const field in data) {
        this.$set(this.form, field, data[field]);
      }
    },

    async onSubmit() {
      try {
        await this.form.post('/organisation-sign-up-forms');
        this.$router.push({ name: 'register-index-success' });
      } catch (exception) {
        //
        console.log('error occured bruh');
      }
    }
  }
}
</script>
