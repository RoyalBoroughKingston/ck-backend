<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">{{ service.type | ucfirst }} locations</gov-heading>
      </gov-grid-column>
      <gov-grid-column v-if="auth.isServiceAdmin(service)" width="one-third text-right">
        <gov-button
          :to="{ name: 'service-locations-create', params: { service: service.id } }"
          success
          expand
        >
          Add location
        </gov-button>
      </gov-grid-column>
    </gov-grid-row>

    <ck-service-locations-table :service-locations="service.service_locations" />
  </div>
</template>

<script>
export default {
  name: "LocationsTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  }
};
</script>
