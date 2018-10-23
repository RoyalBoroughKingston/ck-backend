<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Collection Persona" />

    <gov-back-link :to="{ name: 'admin-index-collections-personas' }">Back to collection personas</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">
            <gov-caption size="xl">Collections</gov-caption>
            Personas
          </gov-heading>
          <gov-heading size="m">Add persona</gov-heading>
          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed, labore accusantium culpa
            praesentium illo assumenda eveniet dignissimos explicabo libero quibusdam ab a quia, vitae
            odio. Laborum delectus quidem voluptatibus.
          </gov-body>

          <collection-form
            :errors="form.$errors"
            :name.sync="form.name"
            :subtitle.sync="form.subtitle"
            :intro.sync="form.intro"
            :order.sync="form.order"
            :category_taxonomies.sync="form.category_taxonomies"
            :image.sync="form.image"
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
import CollectionForm from "@/views/collections/personas/forms/CollectionForm";
import Form from "@/classes/Form";

export default {
  name: "CreateCollectionPersona",
  components: { CollectionForm },
  data() {
    return {
      form: new Form({
        name: "",
        intro: "",
        subtitle: "",
        order: 1,
        category_taxonomies: [],
        image: null
      })
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/collections/personas");
      this.$router.push({ name: "admin-index-collections-personas" });
    }
  }
};
</script>
