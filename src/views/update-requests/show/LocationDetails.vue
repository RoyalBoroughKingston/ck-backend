<template>
  <gov-table>
    <template slot="body">

      <gov-table-row v-if="location.hasOwnProperty('address_line_1')">
        <gov-table-header top scope="row">Address line 1</gov-table-header>
        <gov-table-cell>{{ location.address_line_1 }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('address_line_2')">
        <gov-table-header top scope="row">Address line 2</gov-table-header>
        <gov-table-cell>{{ location.address_line_2 }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('address_line_3')">
        <gov-table-header top scope="row">Address line 3</gov-table-header>
        <gov-table-cell>{{ location.address_line_3 }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('city')">
        <gov-table-header top scope="row">City</gov-table-header>
        <gov-table-cell>{{ location.city }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('county')">
        <gov-table-header top scope="row">County</gov-table-header>
        <gov-table-cell>{{ location.county }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('postcode')">
        <gov-table-header top scope="row">Postcode</gov-table-header>
        <gov-table-cell>{{ location.postcode }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('country')">
        <gov-table-header top scope="row">Country</gov-table-header>
        <gov-table-cell>{{ location.country }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('accessibility_info')">
        <gov-table-header top scope="row">Accessibility info</gov-table-header>
        <gov-table-cell>{{ location.accessibility_info }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('has_induction_loop')">
        <gov-table-header top scope="row">Has induction loop</gov-table-header>
        <gov-table-cell>{{ location.has_induction_loop ? "Yes" : "No" }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="location.hasOwnProperty('has_wheelchair_access')">
        <gov-table-header top scope="row">Has wheelchair access</gov-table-header>
        <gov-table-cell>{{ location.has_wheelchair_access ? "Yes" : "No" }}</gov-table-cell>
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
