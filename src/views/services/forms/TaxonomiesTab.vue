<template>
  <div>
    <gov-heading size="l">Taxonomies</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>Specify which categories apply to this service. This will make the service more relevant in search results.</gov-body>
        <gov-section-break size="l" />

        <gov-form-group :invalid="errors.has('category_taxonomies')">
          <category-taxonomy-input
            :value="category_taxonomies"
            @input="$emit('update:category_taxonomies', $event)"
            :error="errors.get('category_taxonomies')"
            @clear="$emit('clear', 'category_taxonomies')"
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
    category_taxonomies: {
      required: true,
      type: Array
    }
  }
};
</script>
