<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - List Referrals" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Referrals</gov-heading>

          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-heading size="m">Filters</gov-heading>

              <form @submit.prevent="onSearch">

                <gov-form-group>
                  <gov-label for="filter[reference]">Reference no.</gov-label>
                  <gov-input v-model="filters.reference" id="filter[reference]" name="filter[reference]" type="search"/>
                </gov-form-group>

                <template v-if="showAllFilters">
                  <gov-form-group>
                    <gov-label for="filter[service_name]">Service name</gov-label>
                    <gov-input v-model="filters.service_name" id="filter[service_name]" name="filter[service_name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[organisation_name]">Organisation name</gov-label>
                    <gov-input v-model="filters.organisation_name" id="filter[organisation_name]" name="filter[organisation_name]" type="search"/>
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[status]">Status</gov-label>
                    <gov-select v-model="filters.status" id="filter[status]" name="filter[status]" :options="statuses"/>
                  </gov-form-group>
                </template>

                <gov-form-group>
                  <gov-link v-if="!showAllFilters" @click="showAllFilters = true">Show extra filters</gov-link>
                  <gov-link v-else @click="showAllFilters = false">Hide extra filters</gov-link>
                </gov-form-group>

                <gov-form-group>
                  <gov-button type="submit">Search</gov-button>
                </gov-form-group>

              </form>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="referralsTable"
            uri="/referrals"
            :params="params"
            default-sort="-created_at"
            :columns="[
              { heading: 'Reference no.', sort: 'reference', render: (referral) => referral.reference },
              { heading: 'Service', sort: 'service_name', render: (referral) => referral.service.name },
              { heading: 'Organisation', sort: 'organisation_name', render: (referral) => referral.service.organisation.name },
              { heading: 'Status', render: (referral) => displayStatus(referral.status) },
              { heading: 'Date/time', sort: 'created_at', render: (referral) => formatDateTime(referral.created_at) },
            ]"
            :view-route="(referral) => {
              return {
                name: 'referrals-show',
                params: { referral: referral.id }
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

export default {
  name: "ListReferrals",
  components: { CkResourceListingTable },
  data() {
    return {
      showAllFilters: false,
      filters: {
        reference: "",
        service_name: "",
        organisation_name: "",
        status: "",
      },
      statuses: [
        { value: "", text: "All" },
        { value: "new", text: "New" },
        { value: "in_progress", text: "In progress" },
        { value: "completed", text: "Completed" },
        { value: "incompleted", text: "Incompleted" },
      ],
    };
  },
  computed: {
    params() {
      const params = {
        include: "service.organisation"
      };

      if (this.filters.reference !== "") {
        params["filter[reference]"] = this.filters.reference;
      }

      if (this.filters.service_name !== "") {
        params["filter[service_name]"] = this.filters.service_name;
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
      this.$refs.referralsTable.currentPage = 1;
      this.$refs.referralsTable.fetchResources();
    },
    displayStatus(status) {
      const string = status.replace("_", " ");

      return string.charAt(0).toUpperCase() + string.substr(1);
    },
  },
};
</script>
