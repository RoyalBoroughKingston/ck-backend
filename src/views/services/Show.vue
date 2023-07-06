<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'services-index' }"
      >Back to services</gov-back-link
    >
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful :title="`Connected Kingston - Service: ${service.name}`" />

        <gov-grid-column width="full">
          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-heading size="m">
                <gov-caption size="m">{{ service.name }}</gov-caption>
                View {{ service.type }}
              </gov-heading>
            </gov-grid-column>
            <gov-grid-column
              v-if="auth.isServiceAdmin(service)"
              width="one-third"
              class="text-right"
            >
              <gov-button
                :to="{ name: 'services-edit', params: { service: service.id } }"
                >Edit {{ service.type }}</gov-button
              >
            </gov-grid-column>
          </gov-grid-row>

          <gov-tabs :tabs="tabs">
            <router-view :service="service" />
          </gov-tabs>

          <gov-body
            >Please be certain of the action before deleting a
            {{ service.type }}</gov-body
          >

          <template v-if="auth.isGlobalAdmin">
            <gov-section-break size="l" />

            <ck-delete-button
              :resource="service.type"
              :endpoint="`/services/${this.service.id}`"
              @deleted="onDelete"
            />
          </template>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from '@/http'

export default {
  name: 'ShowService',
  data() {
    return {
      loading: false,
      service: null,
      tabs: [
        { heading: 'Details', to: { name: 'services-show' } },
        {
          heading: 'Additional info',
          to: { name: 'services-show-additional-info' },
        },
        { heading: 'Good to know', to: { name: 'services-show-useful-info' } },
        { heading: 'Contact info', to: { name: 'services-show-contact-info' } },
        { heading: 'Who is it for?', to: { name: 'services-show-who-for' } },
        { heading: 'Locations', to: { name: 'services-show-locations' } },
        { heading: 'Referral', to: { name: 'services-show-referral' } },
      ],
    }
  },
  methods: {
    async fetchService() {
      this.loading = true

      // Fetch the services.
      const servicesResponse = await http.get(
        `/services/${this.$route.params.service}`,
        { params: { include: 'organisation' } }
      )
      this.service = servicesResponse.data.data

      // Fetch the service locations.
      const serviceLocations = await this.fetchAll('/service-locations', {
        'filter[service_id]': this.$route.params.service,
        include: 'location',
      })
      this.service.service_locations = serviceLocations

      this.loading = false
    },
    onEdit() {
      alert('Edit')
    },
    onDelete() {
      this.$router.push({ name: 'services-index' })
    },
  },
  created() {
    this.fetchService()
  },
}
</script>
