<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Edit Collection Persona: ${collection.name}`" />

      <gov-back-link :to="{ name: 'admin-index-collections-personas' }">Back to collection personas</gov-back-link>
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">
              <gov-caption size="xl">Collections</gov-caption>
              Personas
            </gov-heading>
            <gov-heading size="m">Edit persona</gov-heading>
            <gov-body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis reprehenderit aperiam,
              magnam vitae, perspiciatis veniam necessitatibus pariatur dolore omnis explicabo quisquam
              excepturi iusto. Facere mollitia sapiente fuga possimus repellat!
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

            <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>

            <gov-section-break size="l" />

            <ck-delete-button
              resource="persona"
              :endpoint="`/collections/personas/${this.collection.id}`"
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
import CollectionForm from "@/views/collections/personas/forms/CollectionForm";

export default {
  name: "EditCollectionPersona",
  components: { CollectionForm },
  data() {
    return {
      loading: false,
      collection: null,
      form: null
    };
  },
  methods: {
    async fetchCollection() {
      this.loading = true;

      const response = await http.get(
        `/collections/personas/${this.$route.params.collection}`
      );
      this.collection = response.data.data;
      this.form = new Form({
        name: this.collection.name,
        subtitle: this.collection.subtitle,
        intro: this.collection.intro,
        order: this.collection.order,
        category_taxonomies: this.collection.category_taxonomies.map(
          taxonomy => taxonomy.id
        ),
        image: null
      });

      this.loading = false;
    },
    async onSubmit() {
      await this.form.put(
        `/collections/personas/${this.collection.id}`,
        (config, data) => {
          if (data.image === null) {
            delete data.image;
          }
        }
      );
      this.$router.push({ name: "admin-index-collections-personas" });
    },
    onDelete() {
      this.$router.push({ name: "admin-index-collections-personas" });
    }
  },
  created() {
    this.fetchCollection();
  }
};
</script>
