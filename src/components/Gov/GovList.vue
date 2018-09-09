<template>
  <ul v-if="type === 'unordered'" class="govuk-list">
    <slot />
  </ul>
  <ol v-else-if="type === 'unordered'" class="govuk-list">
    <slot />
  </ol>
</template>

<script>
export default {
  name: "GovList",
  props: {
    type: {
      type: String,
      required: false,
      default: "unordered"
    }
  }
};
</script>
