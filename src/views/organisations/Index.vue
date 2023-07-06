<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Organisations" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Organisations</gov-heading>

          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <ck-table-filters @search="onSearch" hide-extra>
                <gov-form-group>
                  <gov-label for="filter[name]">Organisation name</gov-label>
                  <gov-input
                    v-model="filters.name"
                    id="filter[name]"
                    name="filter[name]"
                    type="search"
                  />
                </gov-form-group>
              </ck-table-filters>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
              <gov-button
                @click="onAddOrganisation"
                type="submit"
                success
                expand
                >Add organisation</gov-button
              >
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="organisationsTable"
            uri="/organisations"
            :params="params"
            default-sort="name"
            :columns="[
              {
                heading: 'Organisation name',
                sort: 'name',
                render: organisation => organisation.name,
              },
              {
                heading: 'Web address URL',
                render: organisation => organisation.url,
              },
              {
                heading: 'Phone number',
                render: organisation => organisation.phone || '-',
              },
              {
                heading: 'Email',
                render: organisation => organisation.email || '-',
              },
            ]"
            :view-route="
              organisation => {
                return {
                  name: 'organisations-show',
                  params: { organisation: organisation.id },
                }
              }
            "
          />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CkResourceListingTable from '@/components/Ck/CkResourceListingTable.vue'
import CkTableFilters from '@/components/Ck/CkTableFilters.vue'

export default {
  name: 'ListOrganisations',
  components: { CkResourceListingTable, CkTableFilters },
  data() {
    return {
      filters: {
        name: '',
      },
    }
  },
  computed: {
    params() {
      const params = {
        'filter[has_permission]': true,
      }

      if (this.filters.name !== '') {
        params['filter[name]'] = this.filters.name
      }

      return params
    },
  },
  methods: {
    onSearch() {
      this.$refs.organisationsTable.currentPage = 1
      this.$refs.organisationsTable.fetchResources()
    },
    onAddOrganisation() {
      this.$router.push({ name: 'organisations-create' })
    },
  },
}
</script>
