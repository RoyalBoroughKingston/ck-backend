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
      hint="A short summary detailing what type of services the category contains."
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
        If you're having trouble viewing the icons, refer to the <gov-link href="https://fontawesome.com/icons" target="_blank">Font Awesome website</gov-link> (the font library used).
      </gov-hint>
      <option
        v-for="(option, key) in icons"
        :key="key"
        :value="option.value"
        :disabled="option.disabled"
        v-html="option.text"
      />
    </ck-select-input>

    <gov-heading size="m">Sideboxes</gov-heading>

    <gov-body>
      Create up to three sideboxes that will can be used to display information
      on the category results page.
    </gov-body>

    <ck-sideboxes-input
      :sideboxes="sideboxes"
      @input="onInput('sideboxes', $event)"
      :errors="errors"
    />

    <gov-label class="govuk-!-font-weight-bold">Taxonomies</gov-label>
    <category-taxonomy-input
      :invalid="errors.has('category_taxonomies')"
      :value="category_taxonomies"
      @input="$emit('update:category_taxonomies', $event)"
      :error="errors.get('category_taxonomies')"
      @clear="$emit('clear', 'category_taxonomies')"
      :hierarchy="false"
    />

  </div>
</template>

<script>
import icons from "@/storage/icons";
import CategoryTaxonomyInput from "@/views/services/inputs/CategoryTaxonomyInput";
import CkSideboxesInput from "@/views/collections/inputs/SideboxesInput";

export default {
  name: "CollectionForm",
  components: { CategoryTaxonomyInput, CkSideboxesInput },
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
    sideboxes: {
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
      ],
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
