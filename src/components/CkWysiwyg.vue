<template>
  <wysiwyg
    class="govuk-body ck-wysiwyg"
    :text="text"
    :options="options"
    @edit="onEdit"
  />
</template>

<script>
import Wysiwyg from "vue2-medium-editor";

export default {
  name: "CkWysiwyg",
  components: { Wysiwyg },
  props: {
    text: {
      type: String,
      required: false,
      default: ""
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  methods: {
    onEdit(payload) {
      console.log(payload.api);
    }
  }
};
</script>

<style lang="scss">
.ck-wysiwyg {
  padding: 5px;
  border: 2px solid #0b0c0c;
}
</style>
