<template>
  <div>
    <gov-heading size="l">Location of the service</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          If this service operates from multiple locations, please add each individually
          by filling in the location below and then select "Add another location".
        </gov-body>
        <gov-section-break size="l" />
        <p>TODO</p>

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "LocationTab",
  props: {
    form: {
      type: Object,
      require: true
    }
  }
};
</script>
