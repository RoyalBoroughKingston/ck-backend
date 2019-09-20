<template>
  <div>
    <gov-heading size="l">Taxonomies (Tags)</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          These are a list of ‘tags’ that are applied to a {{ type }}. These tags
          help the {{ type }} be found in categories and keyword searches.
        </gov-body>
        <gov-body>
          On creation of a new {{ type }}, the admin team will select the tags that
          they feel represent the {{ type }} offer.
        </gov-body>

        <gov-section-break size="l" />

        <gov-form-group :invalid="errors.has('category_taxonomies')">
          <category-taxonomy-input
            :value="category_taxonomies"
            @input="$emit('update:category_taxonomies', $event)"
            :error="errors.get('category_taxonomies')"
            @clear="$emit('clear', 'category_taxonomies')"
            :disabled="!isGlobalAdmin"
          />
          <gov-error-message
            v-if="errors.has('category_taxonomies')"
            v-text="errors.get('category_taxonomies')"
            :for="category_taxonomies"
          />
        </gov-form-group>

        <slot />

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>
<script>
import CategoryTaxonomyInput from "@/views/services/inputs/CategoryTaxonomyInput";

export default {
  name: "TaxonomiesTab",
  components: { CategoryTaxonomyInput },
  props: {
    errors: {
      required: true
    },
    isGlobalAdmin: {
      required: true
    },
    type: {
      required: true,
      type: String
    },
    category_taxonomies: {
      required: true,
      type: Array
    }
  },
  computed: {
    contactAdminTeamEmail() {
      const to = "info@connectedkingston.uk";
      const subject = `Incorrect taxonomies applied to ${this.type}`;
      const body =
        `${this.$options.filters.ucfirst(this.type)} Name: XXX\n\nI believe that the tags applied to the above ${this.type} are incorrect. The following changes should be made:`;

      return `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  }
};
</script>
