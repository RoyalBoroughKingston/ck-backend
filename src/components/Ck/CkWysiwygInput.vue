<template>
  <gov-form-group :invalid="error !== null">
    <gov-label :for="id" class="govuk-!-font-weight-bold">
      <slot name="label">{{ label }}</slot>
    </gov-label>

    <slot name="hint">
      <gov-hint v-if="hint" :for="id" v-text="hint" />
    </slot>

    <ck-character-count-group>
      <ck-wysiwyg
        :value="value"
        @input="$emit('input', $event)"
        @count="onCount"
        :id="id"
        :large="large"
        :extensions="extensions"
      />
      <ck-character-count
        v-if="maxlength"
        :count="count"
        :max-length="maxlength"
      />
    </ck-character-count-group>

    <slot name="after-input" />

    <gov-error-message v-if="error !== null" v-text="error" :for="id" />
  </gov-form-group>
</template>

<script>
import CkCharacterCount from '@/components/Ck/CkCharacterCount.vue'
import CkCharacterCountGroup from '@/components/Ck/CkCharacterCountGroup.vue'
import {
  Blockquote,
  Heading,
  BulletList,
  OrderedList,
  ListItem,
  Bold,
  Italic,
  Link,
} from 'tiptap-extensions'

export default {
  name: 'CkWysiwygInput',
  components: { CkCharacterCount, CkCharacterCountGroup },
  props: {
    value: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
    error: {
      required: true,
    },
    id: {
      required: true,
      type: String,
    },
    large: {
      required: false,
      type: Boolean,
      deafult: false,
    },
    maxlength: {
      required: false,
      type: Number,
    },
    extensions: {
      required: false,
      type: Array,
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
        ]
      },
    },
  },
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    onCount(count) {
      this.count = count
    },
  },
}
</script>
