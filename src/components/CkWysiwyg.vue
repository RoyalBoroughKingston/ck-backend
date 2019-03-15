<template>
  <wysiwyg
    class="ck-wysiwyg"
    :class="{ 'ck-wysiwyg--lg': large }"
    :html="initialValue"
    @html="onEdit"
    ref="wysiwyg"
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
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      initialValue: null
    };
  },
  created() {
    this.initialValue = this.toHtml(this.value);
  },
  methods: {
    onEdit(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      this.$emit("count", div.textContent.length);

      const markdown = this.toMarkdown(html);
      this.$emit("input", markdown);
    }
  },
  mounted() {
    this.$emit("count", this.$refs.wysiwyg.$refs.content.textContent.length);
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

  &--lg {
    min-height: 30rem;
  }

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
