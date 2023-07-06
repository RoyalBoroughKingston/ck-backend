<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - View Update Request" />

    <gov-back-link :to="{ name: 'update-requests-index' }"
      >Back to update requests</gov-back-link
    >
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="full">
          <gov-error-summary title="Check this page">
            The update request needs to be confirmed. Check the page for
            inconsistencies, errors that would be problematic to a user.
          </gov-error-summary>

          <gov-heading size="m">View update request</gov-heading>

          <organisation-details
            v-if="updateRequest.updateable_type === 'organisations'"
            :update-request-id="updateRequest.id"
            :requested-at="updateRequest.created_at"
            :organisation="updateRequest.data"
          />

          <organisation-sign-up-form-details
            v-if="updateRequest.updateable_type === 'organisation_sign_up_form'"
            :update-request-id="updateRequest.id"
            :requested-at="updateRequest.created_at"
            :user="updateRequest.data.user"
            :organisation="updateRequest.data.organisation"
            :service="updateRequest.data.service"
          />

          <service-details
            v-else-if="updateRequest.updateable_type === 'services'"
            :update-request-id="updateRequest.id"
            :requested-at="updateRequest.created_at"
            :service="updateRequest.data"
          />

          <location-details
            v-else-if="updateRequest.updateable_type === 'locations'"
            :update-request-id="updateRequest.id"
            :requested-at="updateRequest.created_at"
            :location="updateRequest.data"
          />

          <service-location-details
            v-else-if="updateRequest.updateable_type === 'service_locations'"
            :update-request-id="updateRequest.id"
            :requested-at="updateRequest.created_at"
            :service-location="updateRequest.data"
          />

          <gov-body v-else>Update request is invalid</gov-body>

          <gov-section-break size="xl" />

          <gov-heading size="m">Do you approve these changes?</gov-heading>

          <gov-radios inline>
            <gov-radio
              v-model="approve"
              id="approve"
              name="approve"
              label="Approve"
              :value="true"
            />
            <gov-radio
              v-model="approve"
              id="reject"
              name="approve"
              label="Reject"
              :value="false"
            />
          </gov-radios>

          <gov-section-break size="l" />

          <gov-button v-if="submitting" disabled type="submit"
            >Submitting...</gov-button
          >
          <gov-button
            v-else
            @click="onSubmit"
            :disabled="approve === null"
            type="submit"
            >Submit</gov-button
          >
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from '@/http'
import OrganisationDetails from '@/views/update-requests/show/OrganisationDetails'
import OrganisationSignUpFormDetails from '@/views/update-requests/show/OrganisationSignUpFormDetails'
import ServiceDetails from '@/views/update-requests/show/ServiceDetails'
import LocationDetails from '@/views/update-requests/show/LocationDetails'
import ServiceLocationDetails from '@/views/update-requests/show/ServiceLocationDetails'

export default {
  name: 'ShowUpdateRequest',
  components: {
    OrganisationDetails,
    OrganisationSignUpFormDetails,
    ServiceDetails,
    LocationDetails,
    ServiceLocationDetails,
  },
  data() {
    return {
      loading: false,
      updateRequest: null,
      approve: null,
      submitting: false,
    }
  },
  methods: {
    async fetchUpdateRequests() {
      this.loading = true

      const { data } = await http.get(
        `/update-requests/${this.$route.params.updateRequest}`
      )
      this.updateRequest = data
      this.updateRequest.data.id = data.updateable_id

      // If the update request is for a service, and the organisation has been
      // updated, then eager load the organisation and append to the data.
      if (
        this.updateRequest.updateable_type === 'services' &&
        this.updateRequest.data.hasOwnProperty('organisation_id')
      ) {
        const {
          data: { data: organisation },
        } = await http.get(
          `/organisations/${this.updateRequest.data.organisation_id}`
        )
        this.updateRequest.data.organisation = organisation
      }

      this.loading = false
    },
    async onSubmit() {
      try {
        this.submitting = true

        if (this.approve) {
          await http.put(`/update-requests/${this.updateRequest.id}/approve`)

          switch (this.updateRequest.updateable_type) {
            case 'services':
              this.$router.push({
                name: 'services-show',
                params: { service: this.updateRequest.updateable_id },
              })
              break
            case 'organisations':
              this.$router.push({
                name: 'organisations-show',
                params: { organisation: this.updateRequest.updateable_id },
              })
              break
            case 'locations':
              this.$router.push({
                name: 'locations-show',
                params: { location: this.updateRequest.updateable_id },
              })
              break
            case 'service_locations':
              this.$router.push({
                name: 'service-locations-show',
                params: { serviceLocation: this.updateRequest.updateable_id },
              })
              break
            default:
              this.$router.push({ name: 'update-requests-index' })
              break
          }
        } else {
          await http.delete(`/update-requests/${this.updateRequest.id}`)
          this.$router.push({ name: 'update-requests-index' })
        }
      } catch (error) {
        this.submitting = false
      }
    },
  },
  created() {
    this.fetchUpdateRequests()
  },
}
</script>
