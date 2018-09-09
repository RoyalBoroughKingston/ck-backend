<template>
  <hr class="govuk-section-break" :class="computedClasses">
</template>

<script>
export default {
  name: "GovSectionBreak",
  props: {
    size: {
      type: String,
      required: false
    },
    visible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    computedClasses() {
      let classes = {
        "govuk-section-break--visible": this.visible
      };

      if (this.size) {
        classes[`govuk-section-break--${this.size}`] = true;
      }

      return classes;
    }
  }
};
</script>
