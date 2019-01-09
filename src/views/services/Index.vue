<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Services" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>
          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-form-group>
                <gov-label for="search">Search for a service by name</gov-label>
                <gov-input @enter="onSearch" v-model="query" id="search" name="search" type="search" class="govuk-!-width-three-quarters" />&nbsp;<!--
             --><gov-button @click="onSearch" type="submit">Search</gov-button>
              </gov-form-group>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isOrganisationAdmin()" width="one-third">
              <gov-label for="empty">&nbsp;</gov-label>
              <gov-button @click="onAddService" type="submit" expand>Add service</gov-button>
            </gov-grid-column>
          </gov-grid-row>
          <ck-loader v-if="loading" />
          <template v-else>
            <ck-resource-listing-table
              ref="servicesTable"
              uri="/services"
              :params="params"
              :columns="[
                { heading: 'Service name', render: (service) => service.name },
                { heading: 'Organisation', render: (service) => service.organisation.name },
                { heading: 'Status', render: (service) => humanReadableStatus(service.status) },
              ]"
              :view-route="(service) => {
                return {
                  name: 'services-show',
                  params: { service: service.id }
                }
              }"
            />
          </template>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";

export default {
  name: "ListServices",
  components: {
    CkResourceListingTable,
  },
  data() {
    return {
      loading: false,
      query: "",
      services: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  computed: {
    params() {
      let params = {
        "page": this.currentPage,
        "include": "organisation",
        "filter[has_permission]": true,
      };

      if (this.query.length > 0) {
        params["filter[name]"] = this.query;
      }

      return params;
    }
  },
  methods: {
    onSearch() {
      this.$refs.servicesTable.currentPage = 1;
      this.$refs.servicesTable.fetchResources();
    },
    onAddService() {
      this.$router.push({ name: "services-create" });
    },
    humanReadableStatus(status) {
      switch (status) {
        case "active":
          return "Enabled";
        case "inactive":
          return "Disabled";
        default:
          return status;
      }
    },
  },
};
</script>
