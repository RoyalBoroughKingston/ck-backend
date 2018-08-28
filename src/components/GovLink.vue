<template>
  <router-link :to="to" class="govuk-link">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "GovLink",
  props: {
    to: {
      required: true
    }
  }
};
</script>
