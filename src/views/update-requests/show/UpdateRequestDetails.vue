<template>
  <gov-table>
    <template slot="body">
      <gov-table-row v-for="(value, key) in updateRequest.data" :key="key">
        <gov-table-header top scope="row" v-text="key" />
        <gov-table-cell v-text="value" />
      </gov-table-row>
    </template>
  </gov-table>
</template>

<script>
export default {
  name: "UpdateRequestDetails",
  props: {
    updateRequest: {
      required: true,
      type: Object
    }
  }
};
</script>
