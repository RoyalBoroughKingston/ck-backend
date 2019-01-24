<template>
  <div>
    <gov-heading size="l">Useful information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          This section allows you to add information specifically related to your
          service. Pick a title from the drop down and add detail below.
        </gov-body>
        <gov-body>
          These tips will standout on your service page, so make sure key
          information goes in here.
        </gov-body>

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
