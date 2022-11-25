<template>
  <div class="ck-character-count">{{ count }}/{{ maxLength }}</div>
</template>

<script>
export default {
  name: "CkCharacterCount",

  props: {
    count: {
      type: Number,
      required: true,
    },

    maxLength: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/app.scss";

.ck-character-count {
  @extend .govuk-body;

  position: absolute;
  bottom: -1.6rem;
  right: 0;
  color: $govuk-secondary-text-colour;
  margin: 0;
}
</style>
