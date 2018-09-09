<template>
  <select
    :value="value"
    @change="$emit('input', $event.target.value)"
    :id="id"
    class="govuk-select"
    :class="computedClasses"
    :name="name"
    :aria-describedby="ariaDescribedBy"
  >
    <slot />
    <template v-if="options">
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.text }}
      </option>
    </template>
  </select>
</template>

<script>
export default {
  name: "GovSelect",
  props: {
    value: {
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
    options: {
      type: Array,
      required: false
    },
    width: {
      type: Number,
      required: false
    }
  },
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`;
    },
    computedClasses() {
      return this.width ? `govuk-input--width-${this.width}` : null;
    }
  }
};
</script>
