<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Taxonomy Organisation" />

    <gov-back-link :to="{ name: 'admin-index-taxonomies-organisations' }">Back to taxonomy organisations</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">
            <gov-caption size="xl">Taxonomies</gov-caption>
            Organisations
          </gov-heading>
          <gov-heading size="m">Add organisation</gov-heading>
          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed, labore accusantium culpa
            praesentium illo assumenda eveniet dignissimos explicabo libero quibusdam ab a quia, vitae
            odio. Laborum delectus quidem voluptatibus.
          </gov-body>

          <taxonomy-form
            :errors="form.$errors"
            :name.sync="form.name"
            :order.sync="form.order"
            @clear="form.$errors.clear($event)"
          />

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import TaxonomyForm from "@/views/taxonomies/organisations/forms/TaxonomyForm";
import Form from "@/classes/Form";

export default {
  name: "CreateTaxonomyOrganisation",
  components: { TaxonomyForm },
  data() {
    return {
      form: new Form({
        name: "",
        order: 1
      })
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/taxonomies/organisations");
      this.$router.push({ name: "admin-index-taxonomies-organisations" });
    }
  }
};
</script>
