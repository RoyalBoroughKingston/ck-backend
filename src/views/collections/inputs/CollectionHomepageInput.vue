<template>
  <gov-form-group :invalid="error !== null">
    <gov-label :for="id" class="govuk-!-font-weight-bold">
      <slot name="label">{{ label }}</slot>
    </gov-label>
    <slot name="hint">
      <gov-hint v-if="hint" :for="id" v-text="hint" />
    </slot>
    <gov-radios>
      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${id}_add_to_homepage`"
        :name="id"
        label="Show"
        :value="true"
      />
      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${id}_remove_from_homepage`"
        :name="id"
        label="Hide"
        :value="false"
      />
    </gov-radios>
  </gov-form-group>
</template>

<script>
export default {
  name: "CollectionHomepageInput",

  props: {
    value: {
      required: true,
    },
    error: {
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
