<template>
  <div>

    <ck-text-input
      :value="name"
      @input="onInput('name', $event)"
      id="name"
      label="Name"
      type="text"
      :error="errors.get('name')"
    />

    <ck-loader v-if="loading" />
    <ck-select-input
      v-else
      :value="parent_id"
      @input="onInput('parent_id', $event)"
      id="parent_id"
      label="Parent"
      :options="taxonomyOptions"
      :error="errors.get('parent_id')"
    />

  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "TaxonomyForm",
  props: {
    errors: {
      required: true,
      type: Object
    },
    parent_id: {
      required: true
    },
    name: {
      required: true
    },
    order: {
      required: true
    }
  },
  data() {
    return {
      loading: false,
      taxonomies: [],
      taxonomyOptions: []
    };
  },
  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
      this.$emit("clear", field);
    },
    async fetchTaxonomies() {
      this.loading = true;

      const { data } = await http.get("/taxonomies/categories");
      this.taxonomies = data.data;
      this.taxonomyOptions = [
        { text: "No parent (top level)", value: null },
        ...this.parseTaxonomies(this.taxonomies)
      ];

      this.loading = false;
    },
    parseTaxonomies(taxonomies, parsed = [], depth = 0) {
      taxonomies.forEach(taxonomy => {
        const text = "-".repeat(depth) + " " + taxonomy.name;
        parsed.push({ text, value: taxonomy.id });

        if (taxonomy.children.length > 0 && depth < 4) {
          parsed = this.parseTaxonomies(taxonomy.children, parsed, depth + 1);
        }
      });

      return parsed;
    }
  },
  created() {
    this.fetchTaxonomies();
  }
};
</script>
