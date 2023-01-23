<template>
  <div>
    <ck-text-input
      :value="slug"
      @input="onInput('slug', $event)"
      id="slug"
      label="Unique slug"
      type="text"
      :error="errors.get('slug')"
      v-if="auth.isGlobalAdmin"
    >
      <gov-hint slot="hint" for="slug">
        This will be used to access the category collection.<br />
        e.g. connectedkingston.uk/collections/{{ slug }}
      </gov-hint>
    </ck-text-input>

    <ck-text-input
      :value="name"
      @input="onNameInput"
      id="name"
      label="Name"
      type="text"
      :error="errors.get('name')"
    />

    <ck-textarea-input
      :value="intro"
      @input="onInput('intro', $event)"
      id="intro"
      label="Description of category"
      hint="A short summary detailing what type of services the category contains."
      :maxlength="300"
      :error="errors.get('intro')"
    />

    <ck-image-input
      @input="onInput('image_file_id', $event.file_id)"
      id="image"
      label="Category image"
      accept="image/x-svg"
      :existing-url="
        id
          ? apiUrl(`/collections/categories/${id}/image.svg?v=${now}`)
          : undefined
      "
    >
      <template slot="after-error-message">
        <gov-error-message
          v-if="errors.get('image_file_id')"
          v-text="errors.get('image_file_id')"
          for="image"
        />
      </template>
    </ck-image-input>

    <collection-homepage-input
      :value="homepage"
      @input="onInput('homepage', $event)"
      id="homepage"
      label="Show the Category on the homepage"
      :error="errors.get('homepage')"
    />

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
import CkImageInput from "@/components/Ck/CkImageInput";
import CategoryTaxonomyInput from "@/views/services/inputs/CategoryTaxonomyInput";
import CkSideboxesInput from "@/views/collections/inputs/SideboxesInput";
import CollectionHomepageInput from "@/views/collections/inputs/CollectionHomepageInput";

export default {
  name: "CollectionForm",
  components: {
    CategoryTaxonomyInput,
    CkSideboxesInput,
    CollectionHomepageInput,
    CkImageInput,
  },
  props: {
    errors: {
      required: true,
      type: Object,
    },
    isNew: {
      required: false,
      type: Boolean,
      default: false,
    },
    slug: {
      required: true,
    },
    name: {
      required: true,
    },
    intro: {
      required: true,
    },
    id: {
      required: false,
      type: String,
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
  },

  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
    onNameInput(name) {
      this.$emit("update:name", name);
      this.$emit("clear", "name");

      if (this.auth.isGlobalAdmin || this.isNew) {
        this.$emit("update:slug", this.slugify(name));
        this.$emit("clear", "slug");
      }
    },
  },
};
</script>
