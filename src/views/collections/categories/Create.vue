<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Collection Category" />

    <gov-back-link :to="{ name: 'admin-index-collections' }"
      >Back to collection categories</gov-back-link
    >
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">
            <gov-caption size="xl">Collections</gov-caption>
            Categories
          </gov-heading>
          <gov-heading size="m">Add category</gov-heading>
          <gov-body>
            From this page, you can add the categories that appear on the
            homepage. You can specify which taxonomies they refer to, the icon
            used, and the information provided in the description and sidebox.
          </gov-body>

          <collection-form
            :errors="form.$errors"
            :is-new="true"
            :slug.sync="form.slug"
            :name.sync="form.name"
            :intro.sync="form.intro"
            :order.sync="form.order"
            :homepage.sync="form.homepage"
            :sideboxes.sync="form.sideboxes"
            :category_taxonomies.sync="form.category_taxonomies"
            @update:image_file_id="form.image_file_id = $event"
            @clear="form.$errors.clear($event)"
          />

          <gov-button v-if="form.$submitting" disabled type="submit"
            >Creating...</gov-button
          >
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
        slug: "",
        name: "",
        intro: "",
        image_file_id: null,
        order: 1,
        homepage: true,
        sideboxes: [],
        category_taxonomies: [],
      }),
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/collections/categories");
      this.$router.push({ name: "admin-index-collections" });
    },
  },
};
</script>
