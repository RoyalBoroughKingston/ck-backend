<template>
  <div>

    <ck-text-input
      :value="name"
      @input="onInput('name', $event)"
      id="name"
      label="Name"
      type="text"
      :error="errors.get('name')"
    />

    <ck-textarea-input
      :value="intro"
      @input="$emit('update:intro', $event); $emit('clear', 'intro')"
      id="intro"
      label="Description of category"
      hint="A short summary detailing what type of services the category contains (max 150 characters)."
      :maxlength="150"
      :error="errors.get('intro')"
    />

    <ck-select-input
      :value="icon"
      @input="onInput('icon', $event)"
      id="icon"
      label="Icon"
      :error="errors.get('icon')"
      has-icons
    >
      <gov-hint slot="hint" for="icon">
        If you're having trouble viewing the icons, refer to the <gov-link href="https://fontawesome.com/v4.7.0/icons/" target="_blank">Font Awesome website</gov-link> (the font library used).
      </gov-hint>
      <option
        v-for="(option, key) in icons"
        :key="key"
        :value="option.value"
        :disabled="option.disabled"
        v-html="option.text"
      />
    </ck-select-input>

  </div>
</template>

<script>
import http from "@/http";
import icons from "@/storage/icons";

export default {
  name: "CollectionForm",
  props: {
    errors: {
      required: true,
      type: Object
    },
    name: {
      required: true
    },
    intro: {
      required: true
    },
    icon: {
      required: true
    },
    order: {
      required: true
    },
    category_taxonomies: {
      required: true
    }
  },
  data() {
    return {
      icons: [
        { text: "Please select...", value: null, disabled: true },
        ...icons
      ]
    };
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
