<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Reports" />

    <gov-back-link :to="{ name: 'dashboard' }">Back to dashboard</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">

          <gov-heading size="xl">Reports</gov-heading>

          <gov-section-break size="l" />

          <gov-body>Access information by recieving updates on data such as site usage.</gov-body>

          <section v-for="reportType in reportTypes" :key="reportType.type">
            <gov-heading size="m">{{ reportType.type }}</gov-heading>

            <gov-button v-if="!reportType.submitting" type="submit" @click="onGenerate(reportType)">Generate report</gov-button>
            <gov-button v-else type="submit" disabled>Generating report...</gov-button>

            <gov-section-break size="m"/>
          </section>

          <gov-heading size="m">Report schedule</gov-heading>

          <gov-body>This decides the regularity of when reports are sent to you.</gov-body>

          <ck-select-input
            v-model="form.repeat_type"
            id="repeat_type"
            label="Recieve these"
            :options="options"
            :error="null"
            :width="20"
          />

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";

export default {
  name: "ReportsPage",
  data() {
    return {
      reportTypes: [
        { type: "Audit Logs Export", submitting: false },
        { type: "Feedback Export", submitting: false },
        { type: "Locations Export", submitting: false },
        { type: "Organisations Export", submitting: false },
        { type: "Referrals Export", submitting: false },
        { type: "Search Histories Export", submitting: false },
        { type: "Services Export", submitting: false },
        { type: "Users Export", submitting: false }
      ],

      submitting: false,
      loading: false,
      reportSchedule: null,
      form: new Form({
        report_type: "Commissioners Report",
        repeat_type: null
      }),
      options: [
        { text: "Please select", value: null, disabled: true },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" }
      ]
    };
  },
  watch: {
    "form.repeat_type"(newRepeatType) {
      if (newRepeatType !== null && !this.loading) {
        this.saveReportSchedule();
      }
    }
  },
  methods: {
    async onGenerate(reportType) {
      reportType.submitting = true;

      const response = await http.post("/reports", {
        report_type: reportType.type
      });
      const reportId = response.data.data.id;
      const file = await http.get(`/reports/${reportId}/download`);

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

      reportType.submitting = false;
    },
    async fetchReportSchedule() {
      this.loading = true;

      const { data } = await http.get("/report-schedules");

      if (data.data.length > 0) {
        this.reportSchedule = data.data[0];
        this.form.repeat_type = data.data[0].repeat_type;
      }

      this.loading = false;
    },
    async saveReportSchedule() {
      if (this.reportSchedule) {
        // Update
        await this.form.put(`/report-schedules/${this.reportSchedule.id}`);
      } else {
        // Create.
        await this.form.post("/report-schedules");
        this.fetchReportSchedule();
      }
    }
  },
  created() {
    this.fetchReportSchedule();
  }
};
</script>
