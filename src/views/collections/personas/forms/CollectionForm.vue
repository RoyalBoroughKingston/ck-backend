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
      :value="subtitle"
      @input="$emit('update:subtitle', $event); $emit('clear', 'subtitle')"
      id="subtitle"
      label="Subtitle"
      hint="A one line summary of the persona (max 150 characters)."
      :maxlength="150"
      :error="errors.get('subtitle')"
    />

    <ck-textarea-input
      :value="intro"
      @input="$emit('update:intro', $event); $emit('clear', 'intro')"
      id="intro"
      label="Description of category"
      hint="A short summary detailing what type of services the persona includes (max 150 characters)."
      :maxlength="150"
      :error="errors.get('intro')"
    />

    <ck-image-input
      @input="onInput('image_file_id', $event)"
      id="image"
      label="Persona image"
      accept="image/x-png"
      :existing-url="id ? apiUrl(`collections/personas/${id}/image.png?v=${now}`) : undefined"
    />

    <ck-text-input
      :value="sidebox_title"
      @input="onInput('sidebox_title', $event)"
      id="sidebox_title"
      label="Sidebox Title"
      type="text"
      :error="errors.get('sidebox_title')"
    />

    <ck-wysiwyg-input
      :value="sidebox_content"
      @input="onInput('sidebox_content', $event)"
      id="sidebox_content"
      label="Sidebox Content"
      :error="errors.get('sidebox_content')"
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
import CkImageInput from "@/components/Ck/CkImageInput";
import CategoryTaxonomyInput from "@/views/services/inputs/CategoryTaxonomyInput";

export default {
  name: "CollectionForm",
  components: { CkImageInput, CategoryTaxonomyInput },
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
    subtitle: {
      required: true
    },
    order: {
      required: true
    },
    sidebox_title: {
      required: true
    },
    sidebox_content: {
      required: true
    },
    category_taxonomies: {
      required: true
    },
    id: {
      required: false,
      type: String
    }
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    }
  }
};
</script>
