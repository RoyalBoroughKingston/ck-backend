<template>
  <div>
    <gov-grid-row>
      <gov-grid-column width="two-thirds">
        <gov-heading size="l">Taxonomy: Categories</gov-heading>

        <gov-body>
          Taxonomies are the 'tags' that we assign to services, in order for
          them to appear within search results and categories. They are pulled
          from the
          <gov-link href="https://about.auntbertha.com/openeligibility"
            >Aunt Bertha Open Eligibility Standard</gov-link
          >.
        </gov-body>

        <gov-body>
          From this page, you can edit the taxonomies available to be applied to
          a service, as well as add new ones.
        </gov-body>
      </gov-grid-column>

      <gov-grid-column v-if="auth.isSuperAdmin" width="one-third">
        <gov-button
          :to="{ name: 'taxonomies-categories-create' }"
          success
          expand
          >Add a new category</gov-button
        >
      </gov-grid-column>
    </gov-grid-row>

    <gov-section-break size="l" />

    <!-- Loop through each taxonomy -->
    <ck-loader v-if="loading" />
    <div v-else v-for="(taxonomy, index) in taxonomies" :key="index">
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <!-- Heading -->
          <gov-heading size="m">
            {{ taxonomy.name }}&nbsp;
            <gov-link
              v-if="auth.isGlobalAdmin"
              :to="{
                name: 'taxonomies-categories-edit',
                params: { taxonomy: taxonomy.id },
              }"
            >
              Edit
            </gov-link>
          </gov-heading>

          <!-- List: Level 1 -->
          <gov-list v-if="taxonomy.children.length > 0" bullet>
            <li v-for="taxonomy in taxonomy.children" :key="taxonomy.id">
              {{ taxonomy.name }}&nbsp;
              <gov-link
                v-if="auth.isGlobalAdmin"
                :to="{
                  name: 'taxonomies-categories-edit',
                  params: { taxonomy: taxonomy.id },
                }"
              >
                Edit
              </gov-link>

              <!-- List: Level 2 -->
              <gov-list v-if="taxonomy.children.length > 0" bullet>
                <li v-for="taxonomy in taxonomy.children" :key="taxonomy.id">
                  {{ taxonomy.name }}&nbsp;
                  <gov-link
                    v-if="auth.isGlobalAdmin"
                    :to="{
                      name: 'taxonomies-categories-edit',
                      params: { taxonomy: taxonomy.id },
                    }"
                  >
                    Edit
                  </gov-link>

                  <!-- List: Level 3 -->
                  <gov-list v-if="taxonomy.children.length > 0" bullet>
                    <li
                      v-for="taxonomy in taxonomy.children"
                      :key="taxonomy.id"
                    >
                      {{ taxonomy.name }}&nbsp;
                      <gov-link
                        v-if="auth.isGlobalAdmin"
                        :to="{
                          name: 'taxonomies-categories-edit',
                          params: { taxonomy: taxonomy.id },
                        }"
                      >
                        Edit
                      </gov-link>

                      <!-- List: Level 4 -->
                      <gov-list v-if="taxonomy.children.length > 0" bullet>
                        <li
                          v-for="taxonomy in taxonomy.children"
                          :key="taxonomy.id"
                        >
                          {{ taxonomy.name }}&nbsp;
                          <gov-link
                            v-if="auth.isGlobalAdmin"
                            :to="{
                              name: 'taxonomies-categories-edit',
                              params: { taxonomy: taxonomy.id },
                            }"
                          >
                            Edit
                          </gov-link>

                          <!-- List: Level 5 -->
                          <gov-list v-if="taxonomy.children.length > 0" bullet>
                            <li
                              v-for="taxonomy in taxonomy.children"
                              :key="taxonomy.id"
                            >
                              {{ taxonomy.name }}&nbsp;
                              <gov-link
                                v-if="auth.isGlobalAdmin"
                                :to="{
                                  name: 'taxonomies-categories-edit',
                                  params: { taxonomy: taxonomy.id },
                                }"
                              >
                                Edit
                              </gov-link>

                              <!-- List: Level 6 -->
                              <gov-list
                                v-if="taxonomy.children.length > 0"
                                bullet
                              >
                                <li
                                  v-for="taxonomy in taxonomy.children"
                                  :key="taxonomy.id"
                                >
                                  {{ taxonomy.name }}&nbsp;
                                  <gov-link
                                    v-if="auth.isGlobalAdmin"
                                    :to="{
                                      name: 'taxonomies-categories-edit',
                                      params: { taxonomy: taxonomy.id },
                                    }"
                                  >
                                    Edit
                                  </gov-link>
                                </li>
                              </gov-list>
                              <!-- List: Level 6 -->
                            </li>
                          </gov-list>
                          <!-- List: Level 5 -->
                        </li>
                      </gov-list>
                      <!-- List: Level 4 -->
                    </li>
                  </gov-list>
                  <!-- List: Level 3 -->
                </li>
              </gov-list>
              <!-- List: Level 2 -->
            </li>
          </gov-list>
          <!-- List: Level 1 -->

          <gov-body v-else>No taxonomies.</gov-body>
        </gov-grid-column>
      </gov-grid-row>

      <!-- Don't render section break for last in loop -->
      <gov-section-break v-if="index < taxonomies.length - 1" size="l" />
    </div>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "ListTaxonomyCategories",
  data() {
    return {
      loading: false,
      taxonomies: [],
    };
  },
  methods: {
    async fetchTaxonomies() {
      this.loading = true;

      const { data } = await http.get("/taxonomies/categories");
      this.taxonomies = data.data;

      this.loading = false;
    },
  },
  created() {
    this.fetchTaxonomies();
  },
};
</script>
