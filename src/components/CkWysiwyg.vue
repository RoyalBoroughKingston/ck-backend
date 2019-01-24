<template>
  <wysiwyg
    class="ck-wysiwyg"
    :html="initialValue"
    @html="onEdit"
  />
</template>

<script>
export default {
  name: "CkWysiwyg",
  props: {
    value: {
      type: String,
      required: false,
      default: ""
    },
  },
  data() {
    return {
      initialValue: null,
    };
  },
  created() {
    this.initialValue = this.toHtml(this.value);
  },
  methods: {
    onEdit(html) {
      const markdown = this.toMarkdown(html);

      this.$emit("input", markdown);
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/vue-wysiwyg/dist/vueWysiwyg";
@import "@/scss/app.scss";

.ck-wysiwyg {
  @extend .govuk-textarea;
  padding: 0;
  min-height: 10rem;

  p {
    @extend .govuk-body;

    &:last-child {
      margin-bottom: 0;
    }
  }

  b {
    @extend .govuk-\!-font-weight-bold;
  }

  a {
    @extend .govuk-link;
  }

  h1 {
    @extend .govuk-heading-xl;
  }

  h2 {
    @extend .govuk-heading-l;
  }

  h3 {
    @extend .govuk-heading-m;
  }

  ul {
    @extend .govuk-list;
    @extend .govuk-list--bullet;
  }

  ol {
    @extend .govuk-list;
    @extend .govuk-list--number;
  }
}
</style>
