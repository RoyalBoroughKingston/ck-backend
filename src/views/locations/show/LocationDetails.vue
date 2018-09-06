<template>
  <gov-table>
    <template slot="body">
      <gov-table-row>
        <gov-table-header scope="row" top>Address line 1</gov-table-header>
        <gov-table-cell>{{ location.address_line_1 }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Address line 2</gov-table-header>
        <gov-table-cell>{{ location.address_line_2 || "-" }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Address line 3</gov-table-header>
        <gov-table-cell>{{ location.address_line_3 || "-" }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>City</gov-table-header>
        <gov-table-cell>{{ location.city }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>County</gov-table-header>
        <gov-table-cell>{{ location.county }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Postcode</gov-table-header>
        <gov-table-cell>{{ location.postcode }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Country</gov-table-header>
        <gov-table-cell>{{ location.country }}</gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Accessibility</gov-table-header>
        <gov-table-cell>
          <gov-list>
            <li>Wheelchair access: {{ location.has_wheelchair_access ? 'Yes' : 'No' }}</li>
            <li>Induction loop system: {{ location.has_induction_loop ? 'Yes' : 'No' }}</li>
          </gov-list>
        </gov-table-cell>
      </gov-table-row>
      <gov-table-row>
        <gov-table-header scope="row" top>Map</gov-table-header>
        <gov-table-cell>
          <gmap-map
            :center="{ lat: location.lat, lng: location.lon }"
            :zoom="13"
            map-type-id="roadmap"
            style="width: 100%; height: 20rem"
          >
            <GmapMarker
              :position="{ lat: location.lat, lng: location.lon }"
              :clickable="false"
              :draggable="false"
            />
          </gmap-map>
        </gov-table-cell>
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "LocationDetails",
  props: {
    location: {
      required: true,
      type: Object
    }
  }
};
</script>
