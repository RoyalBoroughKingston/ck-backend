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
            From this page, you can add the persona groups that appear on
            the homepage. You can specify which taxonomies they refer to, the
            icon used, and the information provided in the description and
            sidebox.
          </gov-body>

          <collection-form
            :errors="form.$errors"
            :name.sync="form.name"
            :subtitle.sync="form.subtitle"
            :intro.sync="form.intro"
            :order.sync="form.order"
            :sideboxes.sync="form.sideboxes"
            :category_taxonomies.sync="form.category_taxonomies"
            @update:image_file_id="form.image_file_id = $event"
            @clear="form.$errors.clear($event)"
          />

          <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
          <gov-button
            v-else
            @click="onSubmit"
            type="submit"
          >
            Create
          </gov-button>
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
        sideboxes: [],
        category_taxonomies: [],
        image_file_id: null
      })
    };
  },
  methods: {
    async onSubmit() {
      await this.form.post("/collections/personas", (config, data) => {
        // Unset the image field if not provided.
        if (data.image_file_id === null) {
          delete data.image_file_id;
        }
      });
      this.$router.push({ name: "admin-index-collections-personas" });
    }
  }
};
</script>
