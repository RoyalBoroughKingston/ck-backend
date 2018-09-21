<template>
  <div>

    <ck-text-input
      :value="name"
      @input="onInput('name', $event)"
      id="name"
      label="Name"
      type="text"
      :error="errors.get('name')"
    />

  </div>
</template>

<script>
export default {
  name: "TaxonomyForm",
  props: {
    errors: {
      required: true,
      type: Object
    },
    name: {
      required: true
    },
    order: {
      required: true
    }
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
