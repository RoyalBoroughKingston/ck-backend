<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Taxonomy Category" />

    <gov-back-link :to="{ name: 'admin-index-taxonomies' }">Back to taxonomy categories</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">
            <gov-caption size="xl">Taxonomies</gov-caption>
            Categories
          </gov-heading>
          <gov-heading size="m">Add category</gov-heading>
          <gov-body>
            From this page you can add the name of the taxonomy 'tags' on
            the site and how they relate to each other. These should not be
            added without reviewing wider impact on the site
          </gov-body>

          <taxonomy-form
            :errors="form.$errors"
            :parent_id.sync="form.parent_id"
            :name.sync="form.name"
            :order.sync="form.order"
            @clear="form.$errors.clear($event)"
          />

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
          <ck-submit-error v-if="form.$errors.any()" />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import TaxonomyForm from "@/views/taxonomies/categories/forms/TaxonomyForm";
import Form from "@/classes/Form";

export default {
  name: "CreateTaxonomyCategory",
  components: { TaxonomyForm },
  data() {
    return {
      form: new Form({
        parent_id: null,
        name: "",
        order: 1
      })
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/taxonomies/categories");
      this.$router.push({ name: "admin-index-taxonomies" });
    }
  }
};
</script>
