<template>
  <th class="govuk-table__header" :class="computedClasses">
    <slot />
  </th>
</template>

<script>
export default {
  name: "GovTableHeader",
  props: {
    top: {
      type: Boolean,
      required: false,
      default: false
    },
    right: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    computedClasses() {
      return {
        "align-top": this.top,
        "text-right": this.right
      };
    }
  }
};
</script>
