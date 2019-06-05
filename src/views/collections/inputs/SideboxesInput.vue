<template>
  <div>
    <gov-inset-text v-for="(sidebox, index) in sideboxes" :key="sidebox.index">
      <ck-text-input
        :value="sidebox.title"
        @input="onTitleInput({ index, title: $event })"
        :id="`sideboxes.${index}.title`"
        label="Title"
        :error="errors.get(`sideboxes.${index}.title`)"
      />

      <ck-wysiwyg-input
        :value="sidebox.content"
        @input="onContentInput({ index, content: $event })"
        :id="`sideboxes.${index}.content`"
        label="Sidebox Content"
        :error="errors.get(`sideboxes.${index}.content`)"
        :extensions="extensions"
      />

      <gov-button @click="onDelete(index)" error>Delete</gov-button>
    </gov-inset-text>

    <div>
      <gov-button @click="onAdd" :disabled="sideboxes.length >= 3">
        <template v-if="sideboxes.length === 0">Add sidebox</template>
        <template v-else>Add another</template>
      </gov-button>
    </div>
  </div>
</template>

<script>
import { Link } from "tiptap-extensions";

export default {
  name: "SideboxesInput",

  model: {
    prop: "sideboxes",
    event: "input"
  },

  props: {
    sideboxes: {
      required: true,
      type: Array
    },

    errors: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      index: 1,
      extensions: [new Link()]
    };
  },

  methods: {
    clone() {
      return this.sideboxes.map(sidebox => ({ ...sidebox }));
    },

    onAdd() {
      let sideboxes = this.clone();
      sideboxes.push({
        title: "",
        content: "",
        index: this.index
      });

      this.index++;
      this.$emit("input", sideboxes);
    },

    onDelete(index) {
      this.$emit("clear", `sideboxes.${index}.title`);
      this.$emit("clear", `sideboxes.${index}.content`);

      // Also decrement the order for the other offerings.
      let sideboxes = this.clone();
      this.$delete(sideboxes, index);

      this.$emit("input", sideboxes);
    },

    onTitleInput({ index, title }) {
      let sideboxes = this.clone();
      sideboxes[index].title = title;

      this.$emit("input", sideboxes);
      this.$emit("clear", `sideboxes.${index}.title`);
    },

    onContentInput({ index, content }) {
      let sideboxes = this.clone();
      sideboxes[index].content = content;

      this.$emit("input", sideboxes);
      this.$emit("clear", `sideboxes.${index}.content`);
    }
  }
};
</script>
