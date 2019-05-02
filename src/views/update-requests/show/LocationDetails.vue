<template>
  <ck-loader v-if="loading"/>
  <div v-else>
    <gov-body>
      For location <gov-link :to="{ name: 'locations-show', params: { location: original.id } }" v-text="original.address_line_1"/>.
    </gov-body>

    <gov-table>
      <template slot="body">

        <gov-table-row>
          <gov-table-header scope="column"></gov-table-header>
          <gov-table-header scope="column">From</gov-table-header>
          <gov-table-header scope="column">To</gov-table-header>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('address_line_1')">
          <gov-table-header top scope="row">Address line 1</gov-table-header>
          <gov-table-cell>{{ original.address_line_1 }}</gov-table-cell>
          <gov-table-cell>{{ location.address_line_1 }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('address_line_2')">
          <gov-table-header top scope="row">Address line 2</gov-table-header>
          <gov-table-cell>{{ original.address_line_2 }}</gov-table-cell>
          <gov-table-cell>{{ location.address_line_2 }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('address_line_3')">
          <gov-table-header top scope="row">Address line 3</gov-table-header>
          <gov-table-cell>{{ original.address_line_3 }}</gov-table-cell>
          <gov-table-cell>{{ location.address_line_3 }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('city')">
          <gov-table-header top scope="row">City</gov-table-header>
          <gov-table-cell>{{ original.city }}</gov-table-cell>
          <gov-table-cell>{{ location.city }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('county')">
          <gov-table-header top scope="row">County</gov-table-header>
          <gov-table-cell>{{ original.county }}</gov-table-cell>
          <gov-table-cell>{{ location.county }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('postcode')">
          <gov-table-header top scope="row">Postcode</gov-table-header>
          <gov-table-cell>{{ original.postcode }}</gov-table-cell>
          <gov-table-cell>{{ location.postcode }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('country')">
          <gov-table-header top scope="row">Country</gov-table-header>
          <gov-table-cell>{{ original.country }}</gov-table-cell>
          <gov-table-cell>{{ location.country }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('accessibility_info')">
          <gov-table-header top scope="row">Accessibility info</gov-table-header>
          <gov-table-cell>{{ original.accessibility_info }}</gov-table-cell>
          <gov-table-cell>{{ location.accessibility_info }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('has_induction_loop')">
          <gov-table-header top scope="row">Has induction loop</gov-table-header>
          <gov-table-cell>{{ original.has_induction_loop ? "Yes" : "No" }}</gov-table-cell>
          <gov-table-cell>{{ location.has_induction_loop ? "Yes" : "No" }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('has_wheelchair_access')">
          <gov-table-header top scope="row">Has wheelchair access</gov-table-header>
          <gov-table-cell>{{ original.has_wheelchair_access ? "Yes" : "No" }}</gov-table-cell>
          <gov-table-cell>{{ location.has_wheelchair_access ? "Yes" : "No" }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="location.hasOwnProperty('image_file_id')">
          <gov-table-header top scope="row">Logo</gov-table-header>
          <gov-table-cell>
            <img :src="apiUrl(`/locations/${location.id}/image.png?v=${requestedAt}`)" alt="Location image" class="ck-logo">
          </gov-table-cell>
          <gov-table-cell>
            <img :src="apiUrl(`/locations/${location.id}/image.png?update_request_id=${updateRequestId}`)" alt="Location image" class="ck-logo">
          </gov-table-cell>
        </gov-table-row>

      </template>
    </gov-table>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "LocationDetails",
  props: {
    updateRequestId: {
      required: true,
      type: String
    },

    requestedAt: {
      required: true,
      type: String
    },

    location: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      original: null
    };
  },
  methods: {
    async fetchOriginal() {
      this.loading = true;
      const {
        data: { data: original }
      } = await http.get(`/locations/${this.location.id}`);
      this.original = original;
      this.loading = false;
    }
  },
  created() {
    this.fetchOriginal();
  }
};
</script>
