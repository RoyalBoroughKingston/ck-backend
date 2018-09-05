<template>
  <div class="govuk-checkboxes__item">
    <input
      :checked="value"
      :value="true"
      @input="$emit('input', $event.target.checked)"
      class="govuk-checkboxes__input"
      :id="id"
      :name="name"
      type="checkbox"
      :aria-describedby="ariaDescribedBy"
    >
    <gov-label class="govuk-checkboxes__label" :for="id">{{ label }}</gov-label>
    <slot />
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
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`;
    }
  }
};
</script>

<style lang="scss">
.govuk-checkboxes__item--nested {
  margin-top: 10px;
}
</style>
