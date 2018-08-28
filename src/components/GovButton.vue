<template>
  <button @click="onClick" :type="type" class="govuk-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "GovButton",
  props: {
    type: {
      type: String,
      required: false,
      default: "submit"
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
