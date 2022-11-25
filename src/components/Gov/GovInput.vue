<template>
  <input
    @keyup.enter="onEnter"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="govuk-input"
    :class="computedClass"
    :id="id"
    :name="name"
    :type="type"
    :aria-describedby="ariaDescribedBy"
  />
</template>

<script>
export default {
  name: "GovInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    width: {
      type: Number,
      required: false,
    },
  },
  computed: {
    computedClass() {
      return this.width ? `govuk-input--width-${this.width}` : null;
    },
    ariaDescribedBy() {
      return `${this.name}-hint`;
    },
  },
  methods: {
    onEnter() {
      this.$emit("enter");
    },
  },
};
</script>
