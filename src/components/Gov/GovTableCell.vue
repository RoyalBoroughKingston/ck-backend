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
    },
    break: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    computedClasses() {
      return {
        "text-center": this.center,
        "text-right": this.right,
        "govuk-table__cell--break-word": this.break
      };
    }
  }
};
</script>

<style lang="scss">
.govuk-table__cell--break-word {
  word-break: break-all;
}
</style>
