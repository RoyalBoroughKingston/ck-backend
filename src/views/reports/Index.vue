<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">

          <gov-heading size="xl">Reports</gov-heading>

          <gov-section-break size="l" />

          <gov-body>Access information by recieving updates on data such as site usage.</gov-body>

          <gov-heading size="m">Comissioner report</gov-heading>

          <gov-button v-if="!submitting" type="submit" @click="onGenerate">Generate report</gov-button>
          <gov-button v-else type="submit" disabled>Generating report...</gov-button>

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ReportsPage",
  data() {
    return {
      submitting: false
    };
  },
  methods: {
    async onGenerate() {
      this.submitting = true;

      const response = await http.post("/reports", { report_type: "Commissioners Report" });
      const reportId = response.data.data.id;
      const file = await http.get(`/reports/${reportId}/download`);

      const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/
      const filename = regex.exec(file.request.getResponseHeader("Content-Disposition"))[2];
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      this.submitting = false;
    }
  }
};
</script>
