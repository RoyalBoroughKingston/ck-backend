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
                <form @submit.prevent="onSearch">

                  <gov-form-group>
                    <gov-label for="filter[name]">Filter services by name</gov-label>
                    <gov-input v-model="filters.name" id="filter[name]" name="filter[name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[organisation_name]">Filter services by organisation name</gov-label>
                    <gov-input v-model="filters.organisation_name" id="filter[organisation_name]" name="filter[organisation_name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[status]">Filter services by status</gov-label>
                    <gov-select v-model="filters.status" id="filter[status]" name="filter[status]" :options="statuses"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-button type="submit">Search</gov-button>
                  </gov-form-group>

                </form>
              </gov-form-group>
            </gov-grid-column>
            <gov-grid-column v-if="auth.isOrganisationAdmin()" width="one-third">
              <gov-label for="empty">&nbsp;</gov-label>
              <gov-button @click="onAddService" type="submit" expand>Add service</gov-button>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="servicesTable"
            uri="/services"
            :params="params"
            :columns="[
              { heading: 'Service name', render: (service) => service.name },
              { heading: 'Organisation', render: (service) => service.organisation.name },
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
import http from "@/http";
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";

export default {
  name: "ListServices",
  components: {
    CkResourceListingTable,
  },
  data() {
    return {
      filters: {
        name: "",
        organisation_name: "",
        status: "",
      },
      statuses: [
        { value: "", text: "All" },
        { value: "active", text: "Enabled" },
        { value: "inactive", text: "Disabled" },
      ],
    };
  },
  computed: {
    params() {
      const params = {
        "include": "organisation",
        "filter[has_permission]": true,
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
  },
};
</script>
