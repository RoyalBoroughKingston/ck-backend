<template>
  <ck-loader v-if="loading" />

  <!-- Level: 1 -->
  <gov-form-group v-else>
    <gov-checkboxes :invalid="error">
      <gov-checkbox
        v-for="taxonomy in taxonomies"
        :key="taxonomy.id"
        :value="value.includes(taxonomy.id)"
        @input="onInput({ taxonomy, enabled: $event })"
        :id="taxonomy.id"
        :name="taxonomy.id"
        :label="taxonomy.name"
        :disabled="disabled"
      >
        <!-- Level: 2 -->
        <gov-checkbox
          class="govuk-checkboxes__item--nested"
          v-for="taxonomy in taxonomy.children"
          :key="taxonomy.id"
          :value="value.includes(taxonomy.id)"
          @input="onInput({ taxonomy, enabled: $event })"
          :id="taxonomy.id"
          :name="taxonomy.id"
          :label="taxonomy.name"
          :disabled="disabled"
        >
          <!-- Level: 3 -->
          <gov-checkbox
            class="govuk-checkboxes__item--nested"
            v-for="taxonomy in taxonomy.children"
            :key="taxonomy.id"
            :value="value.includes(taxonomy.id)"
            @input="onInput({ taxonomy, enabled: $event })"
            :id="taxonomy.id"
            :name="taxonomy.id"
            :label="taxonomy.name"
            :disabled="disabled"
          >
            <!-- Level: 4 -->
            <gov-checkbox
              class="govuk-checkboxes__item--nested"
              v-for="taxonomy in taxonomy.children"
              :key="taxonomy.id"
              :value="value.includes(taxonomy.id)"
              @input="onInput({ taxonomy, enabled: $event })"
              :id="taxonomy.id"
              :name="taxonomy.id"
              :label="taxonomy.name"
              :disabled="disabled"
            >
              <!-- Level: 5 -->
              <gov-checkbox
                class="govuk-checkboxes__item--nested"
                v-for="taxonomy in taxonomy.children"
                :key="taxonomy.id"
                :value="value.includes(taxonomy.id)"
                @input="onInput({ taxonomy, enabled: $event })"
                :id="taxonomy.id"
                :name="taxonomy.id"
                :label="taxonomy.name"
                :disabled="disabled"
              >
                <!-- Level: 6 -->
                <gov-checkbox
                  class="govuk-checkboxes__item--nested"
                  v-for="taxonomy in taxonomy.children"
                  :key="taxonomy.id"
                  :value="value.includes(taxonomy.id)"
                  @input="onInput({ taxonomy, enabled: $event })"
                  :id="taxonomy.id"
                  :name="taxonomy.id"
                  :label="taxonomy.name"
                  :disabled="disabled"
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

    <gov-error-message v-if="error" v-text="error" for="category_taxonomies" />
  </gov-form-group>
  <!-- /Level: 1 -->
</template>

<script>
import http from "@/http";

export default {
  name: "CategoryTaxonomyInput",
  props: {
    value: {
      required: true,
      type: Array,
    },
    error: {
      required: true,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    hierarchy: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      taxonomies: [],
      flattenedTaxonomies: [],
      loading: false,
      enabledTaxonomies: [],
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

      taxonomies.forEach((taxonomy) => {
        this.flattenedTaxonomies.push(taxonomy);

        if (taxonomy.children.length > 0) {
          this.setFlattenedTaxonomies(taxonomy.children);
        }
      });
    },
    onInput({ taxonomy, enabled }) {
      if (enabled) {
        this.onChecked(taxonomy);
      } else {
        this.onUnchecked(taxonomy);
      }

      this.$emit("input", this.enabledTaxonomies);
      this.$emit("clear");
    },
    onChecked(taxonomy) {
      if (!this.enabledTaxonomies.includes(taxonomy.id)) {
        this.enabledTaxonomies.push(taxonomy.id);

        if (this.hierarchy) {
          if (taxonomy.parent_id !== null) {
            const parent = this.flattenedTaxonomies.find(
              (flattenedTaxonomy) => {
                return flattenedTaxonomy.id === taxonomy.parent_id;
              }
            );
            this.onInput({ taxonomy: parent, enabled: true });
          }
        }
      }
    },
    onUnchecked(taxonomy) {
      if (this.enabledTaxonomies.includes(taxonomy.id)) {
        const index = this.enabledTaxonomies.indexOf(taxonomy.id);
        this.enabledTaxonomies.splice(index, 1);

        if (this.hierarchy) {
          if (taxonomy.children.length > 0) {
            taxonomy.children.forEach((taxonomy) =>
              this.onInput({ taxonomy, enabled: false })
            );
          }
        }
      }
    },
  },
  created() {
    this.fetchTaxonomies();
    this.enabledTaxonomies = this.value;
  },
};
</script>
