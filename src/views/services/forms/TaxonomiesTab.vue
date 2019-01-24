<template>
  <div>
    <gov-heading size="l">Taxonomies (Tags)</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          These are a list of ‘tags’ that are applied to a service. These tags
          help the service be found in categories and keyword searches.
        </gov-body>
        <gov-body>
          On creation of a new service, the admin team will select the tags that
          they feel represent the service offer. If you believe the some of the
          tags are incorrectly applied or missing -
          <gov-link href="mailto:info@connectedkingston.uk?subject=Incorrect%20Taxonomies%20applied%20to%20Service&body=Service%20Name%3A%20XXX%0A%0AI%20believe%20that%20the%20tags%20applied%20to%20the%20above%20service%20are%20incorrect.%20The%20following%20changes%20should%20be%20made%3A">please contact the team</gov-link>.
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
    category_taxonomies: {
      required: true,
      type: Array
    }
  }
};
</script>
