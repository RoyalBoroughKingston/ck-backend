<template>
  <!-- For links to internal pages -->
  <router-link v-if="to" :to="to" class="govuk-link govuk-link--no-visited-state">
    <slot />
  </router-link>

  <!-- For dummy links that are handled by JavaScript -->
  <a v-else href="javascript:;" class="govuk-link govuk-link--no-visited-state" @click="onClick">
    <slot />
  </a>
</template>

<script>
export default {
  name: "GovLink",
  props: {
    to: {
      required: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
