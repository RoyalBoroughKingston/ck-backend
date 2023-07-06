<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: CMS" />

    <gov-heading size="l">Frontend</gov-heading>

    <ck-loader v-if="loading" />
    <template v-else>
      <gov-error-summary v-if="settings.$errors.any()" title="Check for errors">
        <gov-list>
          <li
            v-for="(error, field) in settings.$errors.all()"
            :key="field"
            v-text="error[0]"
          />
        </gov-list>
      </gov-error-summary>

      <gov-tabs :tabs="tabs">
        <router-view
          v-model="settings.cms.frontend"
          :errors="settings.$errors"
          @clear="settings.$errors.clear(`cms.${$event}`)"
        />
      </gov-tabs>

      <gov-button v-if="settings.$submitting" disabled type="submit"
        >Updating...</gov-button
      >
      <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
      <ck-submit-error v-if="settings.$errors.any()" />
    </template>
  </div>
</template>

<script>
import http from '@/http'
import Form from '@/classes/Form'

export default {
  name: 'Cms',

  data() {
    return {
      tabs: [
        {
          heading: 'Global',
          to: { name: 'admin-index-cms' },
        },
        {
          heading: 'Home',
          to: { name: 'admin-index-cms-frontend-home' },
        },
        {
          heading: 'Terms and Conditions',
          to: { name: 'admin-index-cms-frontend-terms-and-conditions' },
        },
        {
          heading: 'Privacy Policy',
          to: { name: 'admin-index-cms-frontend-privacy-policy' },
        },
        {
          heading: 'About',
          to: { name: 'admin-index-cms-frontend-about' },
        },
        {
          heading: 'Contact',
          to: { name: 'admin-index-cms-frontend-contact' },
        },
        {
          heading: 'Get Involved',
          to: { name: 'admin-index-cms-frontend-get-involved' },
        },
        {
          heading: 'Favourites',
          to: { name: 'admin-index-cms-frontend-favourites' },
        },
        {
          heading: 'Banner',
          to: { name: 'admin-index-cms-frontend-banner' },
        },
      ],
      settings: null,
      loading: false,
    }
  },

  created() {
    this.fetchSettings()
  },

  methods: {
    async fetchSettings() {
      this.loading = true

      const {
        data: { data: settings },
      } = await http.get('/settings')

      delete settings.cms.frontend.banner.has_image
      settings.cms.frontend.banner.enabled =
        settings.cms.frontend.banner.title !== null

      this.settings = new Form(settings)

      this.loading = false
    },

    async onSubmit() {
      await this.settings.put('/settings', (config, data) => {
        // Set banner values if disabled.
        if (data.cms.frontend.banner.enabled === false) {
          data.cms.frontend.banner.title = null
          data.cms.frontend.banner.content = null
          data.cms.frontend.banner.button_text = null
          data.cms.frontend.banner.button_url = null
          data.cms.frontend.banner.image_file_id = null
        }

        // Remove the image from the request if null, or delete if false.
        if (data.cms.frontend.banner.image_file_id === null) {
          delete data.cms.frontend.banner.image_file_id
        } else if (data.cms.frontend.banner.image_file_id === false) {
          data.cms.frontend.banner.image_file_id = null
        }

        // Remove banner enabled field.
        delete data.cms.frontend.banner.enabled
      })
      this.$router.push({ name: 'admin-index-cms-updated' })
    },
  },
}
</script>
