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
    <template v-else>
      <ck-select-input
        :value="parent_id"
        @input="onInput('parent_id', $event)"
        id="parent_id"
        label="Parent"
        :options="taxonomyOptions"
        :error="errors.get('parent_id')"
      />
    </template>

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
        { text: "Please select...", value: null, disabled: true },
        ...this.parseTaxonomies(this.taxonomies)
      ];

      this.loading = false;
    },
    parseTaxonomies(taxonomies) {
      return taxonomies.map(taxonomy => {
        let parsed = { text: taxonomy.name, value: taxonomy.id };
        if (taxonomy.children.length > 0) {
          parsed.options = this.parseTaxonomies(taxonomy.children);
        }
        return parsed;
      });
    }
  },
  created() {
    this.fetchTaxonomies();
  }
};
</script>
