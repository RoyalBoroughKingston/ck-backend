<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Collection Category" />

    <gov-back-link :to="{ name: 'admin-index-collections' }">Back to collection categories</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">
            <gov-caption size="xl">Collections</gov-caption>
            Categories
          </gov-heading>
          <gov-heading size="m">Add category</gov-heading>
          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed, labore accusantium culpa
            praesentium illo assumenda eveniet dignissimos explicabo libero quibusdam ab a quia, vitae
            odio. Laborum delectus quidem voluptatibus.
          </gov-body>

          <collection-form
            :errors="form.$errors"
            :name.sync="form.name"
            :intro.sync="form.intro"
            :icon.sync="form.icon"
            :order.sync="form.order"
            :sidebox_title.sync="form.sidebox_title"
            :sidebox_content.sync="form.sidebox_content"
            :category_taxonomies.sync="form.category_taxonomies"
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
import CollectionForm from "@/views/collections/categories/forms/CollectionForm";
import Form from "@/classes/Form";

export default {
  name: "CreateCollectionCategory",
  components: { CollectionForm },
  data() {
    return {
      form: new Form({
        name: "",
        intro: "",
        icon: "",
        order: 1,
        sidebox_title: "",
        sidebox_content: "",
        category_taxonomies: []
      })
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/collections/categories");
      this.$router.push({ name: "admin-index-collections" });
    }
  }
};
</script>
