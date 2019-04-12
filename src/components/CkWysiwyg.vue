<template>
  <div
    class="ck-wysiwyg"
    :class="{ 'ck-wysiwyg--lg': large }"
  >
    <editor-menu-bar class="ck-wysiwyg__toolbar" :editor="editor">
      <div class="ck-wysiwyg__toolbar-buttons-wrapper" slot-scope="{ commands, isActive }">
        <gov-button
          v-if="isActive.bold"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          title="Bold"
        >
          <i class="fas fa-bold"></i>
        </gov-button>

        <gov-button
          v-if="isActive.italic"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          title="Italic"
        >
          <i class="fas fa-italic"></i>
        </gov-button>

        <gov-button
          v-if="isActive.heading"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          title="Heading 1"
        >
          H1
        </gov-button>

        <gov-button
          v-if="isActive.heading"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          title="Heading 2"
        >
          H2
        </gov-button>

        <gov-button
          v-if="isActive.heading"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          title="Heading 3"
        >
          H3
        </gov-button>

        <gov-button
          v-if="isActive.bullet_list"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          title="Bullet list"
        >
          <i class="fas fa-list-ul"></i>
        </gov-button>

        <gov-button
          v-if="isActive.ordered_list"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          title="Ordered list"
        >
          <i class="fas fa-list-ol"></i>
        </gov-button>

        <gov-button
          v-if="isActive.link"
          class="ck-wysiwyg__toolbar-button"
          :class="{ 'is-active': isActive.link() }"
          @click="commands.link({ href: promptUrl() })"
          title="Link"
        >
          <i class="fas fa-link"></i>
        </gov-button>
      </div>
    </editor-menu-bar>
    <editor-content class="ck-wysiwyg__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  Heading,
  BulletList,
  OrderedList,
  ListItem,
  Bold,
  Italic,
  Link,
} from "tiptap-extensions";

export default {
  name: "CkWysiwyg",

  components: {
    EditorMenuBar,
    EditorContent,
  },

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
    },

    extensions: {
      type: Array,
      required: false,
      default() {
        return [
          new Blockquote(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new Bold(),
          new Italic(),
          new Link(),
        ];
      }
    }
  },

  data() {
    return {
      editor: null,
    };
  },

  created() {
    this.editor = new Editor({
      extensions: this.extensions,
      content: this.toHtml(this.value),
      onUpdate: ({ getHTML }) => {
        this.onEdit(getHTML());
      },
    });
  },

  methods: {
    onEdit(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      this.$emit("count", div.textContent.length);

      const markdown = this.toMarkdown(html);
      this.$emit("input", markdown);
    },

    promptUrl() {
      return window.prompt('Please enter a URL');
    },
  },

  mounted() {
    const element = document.createElement('div');
    element.innerHTML = this.editor.getHTML();
    this.$emit("count", element.textContent.length);
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.ck-wysiwyg {
  @extend .govuk-textarea;
  padding: 0;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  width: 100%;

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
    @extend .govuk-link--no-visited-state;
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

  &__toolbar {
    background-color: #000;
    padding-bottom: 2px;
  }

  &__toolbar-buttons-wrapper {
    display: flex;
  }

  &__toolbar-button {
    margin-bottom: 0 !important;
    width: 3rem !important;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;

    .ProseMirror {
      flex: 1;
      width: 100%;
      outline: none;
    }
  }
}
</style>
