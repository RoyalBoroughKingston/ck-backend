<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Collection: Categories</gov-heading>

        <gov-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac neque sed
          lorem ullamcorper luctus. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus.
        </gov-body>
      </gov-grid-column>

      <gov-grid-column width="one-third">
        <gov-button :to="{ name: 'collections-categories-create' }" expand>Add a new category</gov-button>
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="l" />

    <!-- Loop through each category -->
    <gov-grid-row>
      <gov-grid-column width="two-thirds">

        <ck-loader v-if="loading" />
        <gov-list bullet>
          <li v-for="collection in collections" :key="collection.id">
            {{ collection.name }}&nbsp;
            <gov-link :to="{ name: 'collections-categories-edit', params: { collection: collection.id } }">Edit</gov-link>
          </li>
        </gov-list>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "ListCollectionCategories",
  data() {
    return {
      loading: false,
      collections: []
    };
  },
  methods: {
    async fetchCollections() {
      this.loading = true;
      this.collections = await this.fetchAll('/collections/categories');
      this.loading = false;
    }
  },
  created() {
    this.fetchCollections();
  }
};
</script>
