<template>
  <textarea
    @keyup.enter="onEnter"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="govuk-textarea"
    :id="id"
    :name="name"
    :rows="rows"
    :aria-describedby="ariaDescribedBy"
  ></textarea>
</template>

<script>
export default {
  name: "GovTextarea",
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
    rows: {
      type: Number,
      required: false,
      default: 5
    }
  },
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`;
    }
  },
  methods: {
    onEnter() {
      this.$emit("enter");
    }
  }
};
</script>

<style lang="scss">
.govuk-textarea {
  resize: vertical;
}
</style>
