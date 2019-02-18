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
      action-text="Download"
      @action="onDownload"
    />
  </div>
</template>

<script>
import http from "@/http";
import CkResourceListingTable from "@/components/Ck/CkResourceListingTable.vue";

export default {
  name: "ViewReportsPage",
  components: { CkResourceListingTable },
  methods: {
    async onDownload(report) {
      const file = await http.get(`/reports/${report.id}/download`);

      const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
      const filename = regex.exec(
        file.request.getResponseHeader("Content-Disposition")
      )[2];
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>
