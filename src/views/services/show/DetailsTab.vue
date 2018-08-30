<template>
  <ck-service-details :service="service" />
</template>

<script>
export default {
  name: "ServiceDetailsTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  }
};
</script>
