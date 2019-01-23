<template>
  <th @click="$emit('click')" class="govuk-table__header" :class="computedClasses">
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
    clickable: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  computed: {
    computedClasses() {
      return {
        "align-top": this.top,
        "text-center": this.center,
        "text-right": this.right,
        "ck-table__header--clickable": this.clickable,
      };
    }
  }
};
</script>

<style lang="scss">
.ck-table__header--clickable {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
