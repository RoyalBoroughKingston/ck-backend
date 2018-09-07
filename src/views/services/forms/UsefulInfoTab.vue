<template>
  <div>
    <gov-heading size="l">Useful information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>This is a space to add really useful information about your service. This could be tips on getting there, what you need to bring or anything else. Please select a title from the drop downs and add details below</gov-body>

        <gov-body>If you can't think of anything, or have already included it elsewhere you can <gov-link @click="$emit('next')">skip this section</gov-link></gov-body>

        <gov-section-break size="l" />

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
    useful_infos: {
      type: Array,
      required: true
    }
  }
};
</script>
