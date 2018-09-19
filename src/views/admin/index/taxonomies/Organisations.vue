<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Taxonomy: Organisations</gov-heading>

        <gov-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac neque sed
          lorem ullamcorper luctus. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus.
        </gov-body>
      </gov-grid-column>

      <gov-grid-column width="one-third">
        <gov-button :to="{ name: 'taxonomies-organisations-create' }" expand>Add a new organisation</gov-button>
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="l" />

    <!-- Loop through each organisation -->
    <gov-grid-row>
      <gov-grid-column width="two-thirds">

        <ck-loader v-if="loading" />
        <gov-list bullet>
          <li v-for="taxonomy in taxonomies" :key="taxonomy.id">
            {{ taxonomy.name }}&nbsp;
            <gov-link :to="{ name: 'taxonomies-organisations-edit', params: { taxonomy: taxonomy.id } }">Edit</gov-link>
          </li>
        </gov-list>

      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "ListTaxonomyOrganisations",
  data() {
    return {
      loading: false,
      taxonomies: []
    };
  },
  methods: {
    async fetchTaxonomies() {
      this.loading = true;

      const { data } = await http.get('/taxonomies/organisations');
      this.taxonomies = data.data;

      this.loading = false;
    }
  },
  created() {
    this.fetchTaxonomies();
  }
};
</script>
