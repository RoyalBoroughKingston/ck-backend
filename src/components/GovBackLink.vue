<template>
  <router-link :to="to" class="govuk-back-link">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "GovBackLink",
  props: {
    to: {
      required: true
    }
  }
}
</script>
