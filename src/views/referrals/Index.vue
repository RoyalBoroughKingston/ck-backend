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
              <ck-table-filters @search="onSearch">
                <gov-form-group>
                  <gov-label for="filter[reference]">Reference no.</gov-label>
                  <gov-input
                    v-model="filters.reference"
                    id="filter[reference]"
                    name="filter[reference]"
                    type="search"
                  />
                </gov-form-group>

                <template slot="extra-filters">
                  <gov-form-group>
                    <gov-label for="filter[service_name]"
                      >Service name</gov-label
                    >
                    <gov-input
                      v-model="filters.service_name"
                      id="filter[service_name]"
                      name="filter[service_name]"
                      type="search"
                    />
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[organisation_name]"
                      >Organisation name</gov-label
                    >
                    <gov-input
                      v-model="filters.organisation_name"
                      id="filter[organisation_name]"
                      name="filter[organisation_name]"
                      type="search"
                    />
                  </gov-form-group>

                  <gov-form-group>
                    <gov-label for="filter[status]">Status</gov-label>
                    <gov-checkboxes>
                      <gov-checkbox
                        v-for="status in filters.status"
                        :key="`Referrals::Index::Filters::Status::${status.text}`"
                        v-model="status.enabled"
                        :id="`filter[status][${status.value}]`"
                        :name="`filter[status][${status.value}]`"
                        :label="status.text"
                      />
                    </gov-checkboxes>
                  </gov-form-group>
                </template>
              </ck-table-filters>
            </gov-grid-column>
          </gov-grid-row>

          <ck-resource-listing-table
            ref="referralsTable"
            uri="/referrals"
            :params="params"
            default-sort="-created_at"
            :columns="[
              {
                heading: 'Reference no.',
                sort: 'reference',
                render: (referral) => referral.reference,
              },
              {
                heading: 'Service',
                sort: 'service_name',
                render: (referral) => referral.service.name,
              },
              {
                heading: 'Referred by',
                render: (referral) => referral.referee_name || '-',
              },
              {
                heading: 'Status',
                render: (referral) => $options.filters.status(referral.status),
              },
              {
                heading: 'Date submitted',
                sort: 'created_at',
                render: (referral) => {
                  return `
                    ${formatDateTime(referral.created_at)}
                    <br>
                    ${statusLastUpdated(referral)} days remaining
                  `;
                },
              },
            ]"
            :view-route="
              (referral) => {
                return {
                  name: 'referrals-confirmation',
                  params: { referral: referral.id },
                };
              }
            "
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
  name: "ListReferrals",
  components: { CkResourceListingTable, CkTableFilters },
  data() {
    return {
      filters: {
        reference: "",
        service_name: "",
        organisation_name: "",
        status: [
          { value: "new", text: "New", enabled: true },
          { value: "in_progress", text: "In progress", enabled: true },
          { value: "completed", text: "Completed", enabled: true },
          { value: "incompleted", text: "Incomplete", enabled: true },
        ],
      },
    };
  },
  computed: {
    params() {
      const params = {
        include: "service.organisation",
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

      const status = this.filters.status
        .filter((status) => status.enabled)
        .map((status) => status.value)
        .join(",");

      if (status !== "") {
        params["filter[status]"] = status;
      }

      return params;
    },
  },
  methods: {
    onSearch() {
      this.$refs.referralsTable.currentPage = 1;
      this.$refs.referralsTable.fetchResources();
    },
    diffInBusinessDays(date) {
      const start = this.moment(date, this.moment.ISO_8601);
      const end = this.moment();
      const duration = end.diff(start, "days");

      let businessDays = 0;
      for (var i = 0; i < duration; i++) {
        const day = start.clone().add(i, "days").isoWeekday();

        if (day < 6) {
          businessDays += 1;
        }
      }

      return businessDays;
    },
    statusLastUpdated(referral) {
      if (!["new", "in_progress"].includes(referral.status)) {
        return "N/A";
      }

      const workingDays = this.diffInBusinessDays(referral.created_at);

      return workingDays >= 10 ? "Due" : 10 - workingDays;
    },
  },
  filters: {
    status(status) {
      switch (status) {
        case "new":
          return "New";
        case "in_progress":
          return "In progress";
        case "completed":
          return "Completed";
        case "incompleted":
          return "Incomplete";
        default:
          return "Invalid status";
      }
    },
  },
};
</script>
