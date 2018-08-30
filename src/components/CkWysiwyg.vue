<template>
  <medium-editor
    class="ck-wysiwyg"
    :text="initialText"
    :options="mergedOptions"
    @edit="onEdit"
  />
</template>

<script>
import MediumEditor from "vue2-medium-editor";

export default {
  name: "CkWysiwyg",
  components: { MediumEditor },
  props: {
    value: {
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
  data() {
    return {
      initialValue: null,
      defaultOptions: {
        placeholder: {
          text: ""
        },
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ["bold", "anchor", "h2", "h3"],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false
        }
      }
    };
  },
  computed: {
    initialText() {
      if (this.initialValue === null) {
        this.initialValue = this.toHtml(this.value);
      }

      return this.initialValue;
    },
    mergedOptions() {
      return {...this.defaultOptions, ...this.options};
    }
  },
  methods: {
    onEdit(payload) {
      const html = payload.api.getContent();
      const markdown = this.toMarkdown(html);

      this.$emit("input", markdown);
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/medium-editor/src/sass/medium-editor";
@import "@/scss/app.scss";

.ck-wysiwyg {
  @extend .govuk-textarea;
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

  h2 {
    @extend .govuk-heading-l;
  }

  h3 {
    @extend .govuk-heading-m;
  }
}

/* Taken from the flat theme */
$medium-editor-bgcolor: govuk-colour("black");
$medium-editor-active-bgcolor: $govuk-focus-colour;
$medium-editor-border-color: govuk-colour("white");
$medium-editor-button-size: 3rem;
$medium-editor-button-active-text-color: govuk-colour("white");
$medium-editor-link-color: govuk-colour("white");
$medium-editor-placeholder-color: $govuk-secondary-text-colour;

// theme rules
.medium-toolbar-arrow-under:after {
    top: $medium-editor-button-size;
    border-color: $medium-editor-bgcolor transparent transparent transparent;
}

.medium-toolbar-arrow-over:before {
    top: -8px;
    border-color: transparent transparent $medium-editor-bgcolor transparent;
}

.medium-editor-toolbar {
  background-color: $medium-editor-bgcolor;

  li {
    padding: 0;

    button {
      min-width: $medium-editor-button-size;
      height: $medium-editor-button-size;
      border: none;
      border-right: 1px solid lighten($medium-editor-bgcolor, 20);
      background-color: transparent;
      color: $medium-editor-link-color;
      &:hover {
        text-decoration: underline;
      }
    }

    .medium-editor-button-active {
      background-color: $medium-editor-active-bgcolor;
      color: $medium-editor-button-active-text-color;
    }

    .medium-editor-button-last {
      border-right: none;
    }
  }
}

.medium-editor-toolbar-form {
  .medium-editor-toolbar-input {
    height: $medium-editor-button-size;
    background: $medium-editor-bgcolor;
    color: $medium-editor-link-color;

    &::-webkit-input-placeholder {
      color: $medium-editor-placeholder-color;
      color: rgba($medium-editor-placeholder-color, .8);
    }

    &:-moz-placeholder { /* Firefox 18- */
      color: $medium-editor-placeholder-color;
      color: rgba($medium-editor-placeholder-color, .8);
    }

    &::-moz-placeholder {  /* Firefox 19+ */
      color: $medium-editor-placeholder-color;
      color: rgba($medium-editor-placeholder-color, .8);
    }

    &:-ms-input-placeholder {
      color: $medium-editor-placeholder-color;
      color: rgba($medium-editor-placeholder-color, .8);
    }
  }

  a {
    color: $medium-editor-link-color;
  }
}

.medium-editor-toolbar-anchor-preview {
  background: $medium-editor-bgcolor;
  color: $medium-editor-link-color;
}

.medium-editor-placeholder:after {
  color: lighten($medium-editor-bgcolor, 20);
}
</style>
