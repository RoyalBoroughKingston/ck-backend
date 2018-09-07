<template>
  <gov-form-group :invalid="error !== null">

    <gov-radios>

      <gov-label :for="id">
        Is this service open or closed during these holiday hours?
      </gov-label>

      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${id}_open`"
        :name="id"
        label="Open"
        :value="false"
      />

      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${id}_closed`"
        :name="id"
        label="Closed"
        :value="true"
      />

    </gov-radios>

    <gov-error-message
      v-if="error"
      v-text="error"
      :for="id"
    />

  </gov-form-group>
</template>

<script>
export default {
  name: "IsClosedInput",
  props: {
    value: {
      required: true
    },
    error: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>
