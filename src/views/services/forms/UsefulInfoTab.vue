<template>
  <div>
    <gov-heading size="l">Good to know</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>What do people want to know about your {{ type }}.</gov-body>

        <useful-infos-input
          :useful-infos="useful_infos"
          @input="$emit('update:useful_infos', $event)"
          @clear="$emit('clear', $event)"
          :errors="errors"
        />

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import UsefulInfosInput from "@/views/services/inputs/UsefulInfosInput";

export default {
  name: "UsefulInfoTab",
  components: { UsefulInfosInput },
  props: {
    errors: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: String
    },
    useful_infos: {
      type: Array,
      required: true
    }
  }
};
</script>
