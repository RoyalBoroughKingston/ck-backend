<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Collection: Personas</gov-heading>

        <gov-body>
          On this page, you can select which taxonomies apply for each persona group on the
          front page. You can also add persona groups using the button above.
        </gov-body>

        <gov-body>
          You can move persona groups up and down. This denotes the order in which the
          categories appear on the home page. The category at the top of the list will
          appear on the upper-leftmost corner.
        </gov-body>
      </gov-grid-column>

      <gov-grid-column v-if="auth.isSuperAdmin" width="one-third">
        <gov-button :to="{ name: 'collections-personas-create' }" success expand>Add a new persona</gov-button>
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="l" />

    <!-- Loop through each persona -->
    <gov-grid-row>
      <gov-grid-column width="two-thirds">

        <ck-loader v-if="loading" />
        <gov-list v-else bullet>
          <li v-for="collection in collections" :key="collection.id">
            {{ collection.name }}&nbsp;
            <gov-link
              v-if="auth.isSuperAdmin"
              :to="{ name: 'collections-personas-edit', params: { collection: collection.id } }"
            >
              Edit
            </gov-link>
            <br>
            <gov-link @click="onMoveUp(collection)" v-if="collection.order > 1">(Move up)</gov-link>
            <gov-link @click="onMoveDown(collection)" v-if="collection.order < collections.length">(Move down)</gov-link>
          </li>
        </gov-list>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "ListCollectionPersonas",
  data() {
    return {
      loading: false,
      collections: []
    };
  },
  methods: {
    async fetchCollections() {
      this.loading = true;
      this.collections = await this.fetchAll("/collections/personas");
      this.loading = false;
    },
    async onMoveUp(collection) {
      this.loading = true;

      await http.put(`/collections/personas/${collection.id}`, {
        ...this.parseCollectionForUpdate(collection),
        order: collection.order - 1
      });

      this.fetchCollections();
    },
    async onMoveDown(collection) {
      this.loading = true;

      await http.put(`/collections/personas/${collection.id}`, {
        ...this.parseCollectionForUpdate(collection),
        order: collection.order + 1
      });

      this.fetchCollections();
    },
    parseCollectionForUpdate(collection) {
      return {
        name: collection.name,
        intro: collection.intro,
        subtitle: collection.subtitle,
        order: collection.order,
        sidebox_title: collection.sidebox_title,
        sidebox_content: collection.sidebox_content,
        category_taxonomies: collection.category_taxonomies.map(
          taxonomy => taxonomy.id
        )
      };
    }
  },
  created() {
    this.fetchCollections();
  }
};
</script>
