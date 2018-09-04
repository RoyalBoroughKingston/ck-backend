<template>
  <gov-form-group :invalid="form.$errors.has(path)">

    <gov-radios>
      <gov-label :for="path">
        Is this service open or closed during these holiday hours?
      </gov-label>
      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${path}_open`"
        :name="path"
        label="Open"
        :value="false"
      />
      <gov-radio
        :bind-to="value"
        @input="$emit('input', $event)"
        :id="`${path}_closed`"
        :name="path"
        label="Closed"
        :value="true"
      />
    </gov-radios>

    <gov-error-message
      v-if="form.location.$errors.has(path)"
      v-text="form.location.$errors.get(path)"
      :for="path"
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
    form: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
};
</script>
