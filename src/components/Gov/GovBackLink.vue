<template>
  <router-link v-if="to" :to="to" class="govuk-back-link">
    <slot />
  </router-link>

  <a
    v-else
    href="javascript:void(0);"
    class="govuk-back-link"
    @click="$emit('click')"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "GovBackLink",
  props: {
    to: {
      required: false
    }
  }
};
</script>
