<template>
  <div class="govuk-checkboxes__item">
    <input
      v-model="proxy"
      class="govuk-checkboxes__input"
      :id="id"
      :name="name"
      type="checkbox"
      :aria-describedby="ariaDescribedBy"
    >
    <gov-label class="govuk-checkboxes__label" :for="id">{{ label }}</gov-label>
  </div>
</template>

<script>
export default {
  name: "GovCheckboxInput",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      proxy: this.value
    };
  },
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`;
    }
  },
  watch: {
    proxy(newValue) {
      this.$emit("input", newValue);
    }
  }
}
</script>
