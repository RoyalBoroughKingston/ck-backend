<template>
  <select
    v-model="proxy"
    :id="id"
    class="govuk-select"
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
};
</script>
