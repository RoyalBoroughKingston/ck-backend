<template>
  <medium-editor
    class="govuk-body ck-wysiwyg"
    :text="text"
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
  data() {
    return {
      defaultOptions: {
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
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
    mergedOptions() {
      return {...this.defaultOptions, ...this.options};
    }
  },
  methods: {
    onEdit(payload) {
      console.log(payload.api.getContent());
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/medium-editor/src/sass/medium-editor";

.ck-wysiwyg {
  padding: 5px;
  border: 2px solid #0b0c0c;
}

/* Taken from the flat theme */
$medium-editor-bgcolor: #000;
$medium-editor-active-bgcolor: #ffbf47;
$medium-editor-border-color: #fff;
$medium-editor-button-size: 60px;
$medium-editor-button-active-text-color: #000;
$medium-editor-link-color: #fff;
$medium-editor-placeholder-color: #fff;

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
