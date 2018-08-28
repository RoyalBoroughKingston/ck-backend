<template>
  <input v-model="proxy" class="govuk-input" :class="computedClass" :id="id" :name="name" :type="type" :aria-describedby="ariaDescribedBy">
</template>

<script>
export default {
  name: "GovInput",
  props: {
    value: {
      type: String,
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
    type: {
      type: String,
      required: false,
      default: "text"
    },
    width: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      proxy: this.value
    };
  },
  computed: {
    computedClass() {
      return this.width ? `govuk-input--width-${this.width}` : null;
    },
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
