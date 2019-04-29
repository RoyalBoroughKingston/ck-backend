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
              <ck-table-filters @search="onSearch">
                <gov-form-group>
                  <gov-label for="filter[name]">Service name</gov-label>
                  <gov-input v-model="filters.name" id="filter[name]" name="filter[name]" type="search"/>
                </gov-form-group>

                <template slot="extra-filters">
                  <gov-form-group>
                    <gov-label for="filter[organisation_name]">Organisation name</gov-label>
                    <gov-input v-model="filters.organisation_name" id="filter[organisation_name]" name="filter[organisation_name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[status]">Status</gov-label>
                    <gov-select v-model="filters.status" id="filter[status]" name="filter[status]" :options="statuses"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[referral_method]">Referral method</gov-label>
                    <gov-select v-model="filters.referral_method" id="filter[referral_method]" name="filter[referral_method]" :options="referralMethods"/>
                  </gov-form-group>
                </template>
              </ck-table-filters>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isOrganisationAdmin()" width="one-third">
              <gov-button @click="onAddService" type="submit" expand>Add service</gov-button>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="servicesTable"
            uri="/services"
            :params="params"
            default-sort="name"
            :columns="[
              { heading: 'Service name', sort: 'name', render: (service) => service.name },
              { heading: 'Organisation', sort: 'organisation_name', render: (service) => service.organisation.name },
              { heading: 'Status', render: (service) => displayStatus(service.status) },
              { heading: 'Referral method', render: (service) => displayReferralMethod(service.referral_method) },
            ]"
            :view-route="(service) => {
              return {
                name: 'services-show',
                params: { service: service.id }
              }
            }"
          />

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";
import CkTableFilters from "@/components/Ck/CkTableFilters.vue";

export default {
  name: "ListServices",
  components: { CkResourceListingTable, CkTableFilters },
  data() {
    return {
      filters: {
        name: "",
        organisation_name: "",
        status: "",
        referral_method: ""
      },
      statuses: [
        { value: "", text: "All" },
        { value: "active", text: "Enabled" },
        { value: "inactive", text: "Disabled" }
      ],
      referralMethods: [
        { value: "", text: "All" },
        { value: "internal", text: "Internal" },
        { value: "external", text: "External" },
        { value: "none", text: "None" }
      ]
    };
  },
  computed: {
    params() {
      const params = {
        include: "organisation",
        "filter[has_permission]": true
      };

      if (this.filters.name !== "") {
        params["filter[name]"] = this.filters.name;
      }

      if (this.filters.organisation_name !== "") {
        params["filter[organisation_name]"] = this.filters.organisation_name;
      }

      if (this.filters.status !== "") {
        params["filter[status]"] = this.filters.status;
      }

      if (this.filters.referral_method !== "") {
        params["filter[referral_method]"] = this.filters.referral_method;
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
      this.$router.push({ name: "services-pre-create" });
    },
    displayStatus(status) {
      switch (status) {
        case "active":
          return "Enabled";
        case "inactive":
          return "Disabled";
        default:
          return status;
      }
    },
    displayReferralMethod(referralMethod) {
      return referralMethod.charAt(0).toUpperCase() + referralMethod.substr(1);
    }
  }
};
</script>
