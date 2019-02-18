<template>
  <div>
    <gov-heading size="l">View all reports</gov-heading>

    <ck-resource-listing-table
      ref="reportsTable"
      uri="/reports"
      :columns="[
        { heading: 'Type', render: (report) => report.report_type },
        { heading: 'From', render: (report) => report.starts_at ? formatDate(report.starts_at) : 'N/A' },
        { heading: 'To', render: (report) => report.ends_at ? formatDate(report.ends_at) : 'N/A' },
      ]"
      :view-route="(report) => {
        return {
          name: 'reports-show',
          params: { report: report.id }
        }
      }"
    />
  </div>
</template>

<script>
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";

export default {
  name: "ViewReportsPage",
  components: {CkResourceListingTable},
}
</script>
