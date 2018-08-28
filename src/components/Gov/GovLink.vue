<template>
  <!-- For links to internal pages -->
  <router-link v-if="to" :to="to" class="govuk-link">
    <slot />
  </router-link>

  <!-- For dummy links that are handled by JavaScript -->
  <a v-else href="#" class="govuk-link" @click="onClick">
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
