<template>
  <div>
    <gov-heading size="l">Good to know</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          What do people want to know about your {{ service.type }}.
        </gov-body>

        <useful-infos-input
          :useful-infos="service.useful_infos"
          @input="$emit('input', { field: 'useful_infos', value: $event })"
          :errors="errors"
        />

        <slot />
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import UsefulInfosInput from '@/views/services/inputs/UsefulInfosInput'

export default {
  components: {
    UsefulInfosInput,
  },

  props: {
    service: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      required: true,
    },
  },
}
</script>
