<template>
  <div>
    <gov-heading size="l">Taxonomies</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>Specify which categories apply to this service. This will make the service more relevant in search results.</gov-body>
        <gov-section-break size="l" />

        <gov-form-group :invalid="form.$errors.has('category_taxonomies')">
          <category-taxonomy-input
            :value="form.category_taxonomies"
            @input="$emit('input', $event)"
          />
        </gov-form-group>

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>
<script>
import CategoryTaxonomyInput from "@/views/services/create/inputs/CategoryTaxonomyInput";

export default {
  name: "TaxonomiesTab",
  components: { CategoryTaxonomyInput },
  props: {
    form: {
      required: true,
      type: Object
    }
  }
};
</script>

