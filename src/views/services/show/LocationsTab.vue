<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Service locations</gov-heading>
      </gov-grid-column>
      <gov-grid-column width="one-third text-right">
        <gov-button
          :to="{ name: 'services-service-locations-create', params: { service: service.id } }"
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
