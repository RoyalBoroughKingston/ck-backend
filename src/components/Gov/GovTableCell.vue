<template>
  <td class="govuk-table__cell" :class="computedClasses">
    <slot />
  </td>
</template>

<script>
export default {
  name: "GovTableCell",
  props: {
    center: {
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
        "text-center": this.center,
        "text-right": this.right
      };
    }
  }
};
</script>
