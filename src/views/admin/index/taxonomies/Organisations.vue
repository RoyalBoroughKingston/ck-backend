<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Taxonomy: Organisations</gov-heading>

        <gov-body>
          This page shows the list of organisations a user can select from when referring a client to another service.
          Essentially, these are the organisations a champion can refer 'from'.
        </gov-body>

        <gov-body>
          From this page, you can edit, delete, and add the organisations that appear on the list.
        </gov-body>
      </gov-grid-column>

      <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
        <gov-button :to="{ name: 'taxonomies-organisations-create' }" success expand>Add a new organisation</gov-button>
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="l" />

    <!-- Loop through each organisation -->
    <gov-grid-row>
      <gov-grid-column width="two-thirds">

        <ck-loader v-if="loading" />
        <template v-else>
          <gov-list v-if="taxonomies.length > 0" bullet>
            <li v-for="taxonomy in taxonomies" :key="taxonomy.id">
              {{ taxonomy.name }}&nbsp;
              <gov-link
                v-if="auth.isGlobalAdmin"
                :to="{ name: 'taxonomies-organisations-edit', params: { taxonomy: taxonomy.id } }"
              >
                Edit
              </gov-link>
            </li>
          </gov-list>
          <gov-body v-else>No taxonomies.</gov-body>
        </template>

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

      const { data } = await http.get("/taxonomies/organisations");
      this.taxonomies = data.data;

      this.loading = false;
    }
  },
  created() {
    this.fetchTaxonomies();
  }
};
</script>
