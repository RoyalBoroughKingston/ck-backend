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
      @input="
        $emit('update:subtitle', $event);
        $emit('clear', 'subtitle');
      "
      id="subtitle"
      label="Subtitle"
      hint="A one line summary of the persona."
      :maxlength="150"
      :error="errors.get('subtitle')"
    />

    <ck-textarea-input
      :value="intro"
      @input="
        $emit('update:intro', $event);
        $emit('clear', 'intro');
      "
      id="intro"
      label="Description of category"
      hint="A short summary detailing what type of services the persona includes."
      :maxlength="300"
      :error="errors.get('intro')"
    />

    <ck-image-input
      @input="onInput('image_file_id', $event.file_id)"
      id="image"
      label="Persona image"
      accept="image/x-png"
      :existing-url="
        id
          ? apiUrl(`/collections/personas/${id}/image.png?v=${now}`)
          : undefined
      "
    />

    <collection-homepage-input
      :value="homepage"
      @input="onInput('homepage', $event)"
      id="homepage"
      label="Show the Persona on the homepage"
      :error="errors.get('homepage')"
    />

    <gov-heading size="m">Sideboxes</gov-heading>

    <gov-body>
      Create up to three sideboxes that will can be used to display information
      on the persona results page.
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
import CkImageInput from "@/components/Ck/CkImageInput";
import CategoryTaxonomyInput from "@/views/services/inputs/CategoryTaxonomyInput";
import CkSideboxesInput from "@/views/collections/inputs/SideboxesInput";
import CollectionHomepageInput from "@/views/collections/inputs/CollectionHomepageInput";

export default {
  name: "CollectionForm",
  components: {
    CkImageInput,
    CategoryTaxonomyInput,
    CkSideboxesInput,
    CollectionHomepageInput,
  },
  props: {
    errors: {
      required: true,
      type: Object,
    },
    name: {
      required: true,
    },
    intro: {
      required: true,
    },
    subtitle: {
      required: true,
    },
    order: {
      required: true,
    },
    homepage: {
      required: true,
    },
    sideboxes: {
      required: true,
    },
    category_taxonomies: {
      required: true,
    },
    id: {
      required: false,
      type: String,
    },
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
  },
};
</script>
