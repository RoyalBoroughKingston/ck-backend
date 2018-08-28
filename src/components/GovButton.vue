<template>
  <button :type="type" class="govuk-button">
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
  }
}
</script>

