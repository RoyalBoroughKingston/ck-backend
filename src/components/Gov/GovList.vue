<template>
  <ul
    v-if="type === 'unordered'"
    class="govuk-list"
    :class="{ 'govuk-list--bullet': bullet }"
  >
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
      default: "unordered",
    },
    bullet: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
};
</script>
