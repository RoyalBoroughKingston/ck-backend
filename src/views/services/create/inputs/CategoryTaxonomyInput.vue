<template>
  <ck-loader v-if="loading" />

  <!-- Level: 1 -->
  <gov-checkboxes v-else>
    <gov-checkbox
      v-for="taxonomy in taxonomies" :key="taxonomy.id"
      :value="value.includes(taxonomy.id)"
      @input="onInput({ taxonomy, enabled: $event })"
      :id="taxonomy.id"
      :name="taxonomy.id"
      :label="taxonomy.name"
    >

      <!-- Level: 2 -->
      <gov-checkbox
        class="govuk-checkboxes__item--nested"
        v-for="taxonomy in taxonomy.children" :key="taxonomy.id"
        :value="value.includes(taxonomy.id)"
        @input="onInput({ taxonomy, enabled: $event })"
        :id="taxonomy.id"
        :name="taxonomy.id"
        :label="taxonomy.name"
      >

        <!-- Level: 3 -->
        <gov-checkbox
          class="govuk-checkboxes__item--nested"
          v-for="taxonomy in taxonomy.children" :key="taxonomy.id"
          :value="value.includes(taxonomy.id)"
          @input="onInput({ taxonomy, enabled: $event })"
          :id="taxonomy.id"
          :name="taxonomy.id"
          :label="taxonomy.name"
        >

          <!-- Level: 4 -->
          <gov-checkbox
            class="govuk-checkboxes__item--nested"
            v-for="taxonomy in taxonomy.children" :key="taxonomy.id"
            :value="value.includes(taxonomy.id)"
            @input="onInput({ taxonomy, enabled: $event })"
            :id="taxonomy.id"
            :name="taxonomy.id"
            :label="taxonomy.name"
          >

            <!-- Level: 5 -->
            <gov-checkbox
              class="govuk-checkboxes__item--nested"
              v-for="taxonomy in taxonomy.children" :key="taxonomy.id"
              :value="value.includes(taxonomy.id)"
              @input="onInput({ taxonomy, enabled: $event })"
              :id="taxonomy.id"
              :name="taxonomy.id"
              :label="taxonomy.name"
            >

              <!-- Level: 6 -->
              <gov-checkbox
                class="govuk-checkboxes__item--nested"
                v-for="taxonomy in taxonomy.children" :key="taxonomy.id"
                :value="value.includes(taxonomy.id)"
                @input="onInput({ taxonomy, enabled: $event })"
                :id="taxonomy.id"
                :name="taxonomy.id"
                :label="taxonomy.name"
              />
              <!-- /Level: 6 -->

            </gov-checkbox>
            <!-- /Level: 5 -->

          </gov-checkbox>
          <!-- /Level: 4 -->

        </gov-checkbox>
        <!-- /Level: 3 -->

      </gov-checkbox>
      <!-- /Level: 2 -->

    </gov-checkbox>
  </gov-checkboxes>
  <!-- /Level: 1 -->
</template>

<script>
import http from "@/http";

export default {
  name: "CategoryTaxonomyInput",
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      taxonomies: [],
      flattenedTaxonomies: [],
      loading: false,
      enabledTaxonomies: []
    };
  },
  methods: {
    async fetchTaxonomies() {
      this.loading = true;
      const { data } = await http.get("/taxonomies/categories");
      this.taxonomies = data.data;
      this.setFlattenedTaxonomies();
      this.loading = false;
    },
    setFlattenedTaxonomies(taxonomies = null) {
      if (taxonomies === null) {
        this.flattenedTaxonomies = [];
        taxonomies = this.taxonomies;
      }

      taxonomies.forEach(taxonomy => {
        this.flattenedTaxonomies.push(taxonomy);

        if (taxonomy.children.length > 0) {
          this.setFlattenedTaxonomies(taxonomy.children);
        }
      });
    },
    onInput({ taxonomy, enabled }) {
      if (enabled) {
        if (!this.enabledTaxonomies.includes(taxonomy.id)) {
          this.enabledTaxonomies.push(taxonomy.id);

          if (taxonomy.parent_id !== null) {
            const parent = this.flattenedTaxonomies.find(flattenedTaxonomy => {
              return (flattenedTaxonomy.id === taxonomy.parent_id);
            });
            this.onInput({ taxonomy: parent, enabled: true });
          }
        }
      } else {
        if (this.enabledTaxonomies.includes(taxonomy.id)) {
          const index = this.enabledTaxonomies.indexOf(taxonomy.id);
          this.enabledTaxonomies.splice(index, 1);

          if (taxonomy.children.length > 0) {
            taxonomy.children.forEach(taxonomy => this.onInput({ taxonomy, enabled: false }));
          }
        }
      }

      this.$emit("input", this.enabledTaxonomies);
    }
  },
  created() {
    this.fetchTaxonomies();
  }
};
</script>
