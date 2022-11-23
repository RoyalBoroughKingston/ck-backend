<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful
        :title="`Connected Kingston - Edit Collection Category: ${collection.name}`"
      />

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
            <gov-heading size="m">Edit category</gov-heading>
            <gov-body>
              From this page, you can edit the categories that appear on the
              homepage. You can change which taxonomies they refer to, the icon
              used, and the information provided in the description and sidebox.
            </gov-body>

            <collection-form
              :errors="form.$errors"
              :id="collection.id"
              :name.sync="form.name"
              :intro.sync="form.intro"
              :order.sync="form.order"
              :sideboxes.sync="form.sideboxes"
              :category_taxonomies.sync="form.category_taxonomies"
              @update:image_file_id="form.image_file_id = $event"
              @clear="form.$errors.clear($event)"
            />

            <gov-button v-if="form.$submitting" disabled type="submit"
              >Updating...</gov-button
            >
            <gov-button v-else @click="onSubmit" type="submit"
              >Update</gov-button
            >
            <ck-submit-error v-if="form.$errors.any()" />

            <gov-section-break size="l" />

            <ck-delete-button
              resource="category"
              :endpoint="`/collections/categories/${this.collection.id}`"
              @deleted="onDelete"
            />
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";
import CollectionForm from "@/views/collections/categories/forms/CollectionForm";

export default {
  name: "EditCollectionCategory",
  components: { CollectionForm },
  data() {
    return {
      loading: false,
      collection: null,
      form: null,
    };
  },
  methods: {
    async fetchCollection() {
      this.loading = true;

      const response = await http.get(
        `/collections/categories/${this.$route.params.collection}`
      );
      this.collection = response.data.data;
      this.form = new Form({
        name: this.collection.name,
        intro: this.collection.intro,
        image_file_id: this.collection.image_file_id,
        order: this.collection.order,
        sideboxes: this.collection.sideboxes,
        category_taxonomies: this.collection.category_taxonomies.map(
          (taxonomy) => taxonomy.id
        ),
      });

      this.loading = false;
    },
    async onSubmit() {
      await this.form.put(`/collections/categories/${this.collection.id}`);
      this.$router.push({ name: "admin-index-collections" });
    },
    onDelete() {
      this.$router.push({ name: "admin-index-collections" });
    },
  },
  created() {
    this.fetchCollection();
  },
};
</script>
