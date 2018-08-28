<template>
  <textarea
    @keyup.enter="onEnter"
    v-model="proxy"
    class="govuk-textarea"
    :id="id"
    :name="name"
    :rows="rows"
    :aria-describedby="ariaDescribedBy"
  ></textarea>
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
    rows: {
      type: Number,
      required: false,
      default: 5
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
  },
  methods: {
    onEnter() {
      this.$emit("enter");
    }
  }
};
</script>
