<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful
        :title="`Connected Kingston - Edit Taxonomy Organisation: ${taxonomy.name}`"
      />

      <gov-back-link :to="{ name: 'admin-index-taxonomies-organisations' }"
        >Back to taxonomy organisations</gov-back-link
      >
      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="one-half">
            <gov-heading size="xl">
              <gov-caption size="xl">Taxonomies</gov-caption>
              Organisations
            </gov-heading>
            <gov-heading size="m">Edit organisation</gov-heading>
            <gov-body>
              From this page, you can edit the names of the Organisations
              referrers can select from when completing a referral.
            </gov-body>

            <taxonomy-form
              :errors="form.$errors"
              :name.sync="form.name"
              :order.sync="form.order"
              @clear="form.$errors.clear($event)"
            />

            <gov-button v-if="form.$submitting" disabled type="submit"
              >Updating...</gov-button
            >
            <gov-button v-else @click="onSubmit" type="submit"
              >Update</gov-button
            >
            <ck-submit-error v-if="form.$errors.any()" />

            <gov-section-break size="l" />

            <ck-delete-button
              resource="organisation"
              :endpoint="`/taxonomies/organisations/${this.taxonomy.id}`"
              @deleted="onDelete"
            />
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import http from '@/http'
import Form from '@/classes/Form'
import TaxonomyForm from '@/views/taxonomies/organisations/forms/TaxonomyForm'

export default {
  name: 'EditTaxonomyOrganisation',
  components: { TaxonomyForm },
  data() {
    return {
      loading: false,
      taxonomy: null,
      form: null,
    }
  },
  methods: {
    async fetchTaxonomy() {
      this.loading = true

      const response = await http.get(
        `/taxonomies/organisations/${this.$route.params.taxonomy}`
      )
      this.taxonomy = response.data.data
      this.form = new Form({
        parent_id: this.taxonomy.parent_id,
        name: this.taxonomy.name,
        order: this.taxonomy.order,
      })

      this.loading = false
    },
    async onSubmit() {
      await this.form.put(`/taxonomies/organisations/${this.taxonomy.id}`)
      this.$router.push({ name: 'admin-index-taxonomies-organisations' })
    },
    onDelete() {
      this.$router.push({ name: 'admin-index-taxonomies-organisations' })
    },
  },
  created() {
    this.fetchTaxonomy()
  },
}
</script>
