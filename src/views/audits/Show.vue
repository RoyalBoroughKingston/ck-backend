<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'admin-index' }">Back to audits</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful
          :title="`Connected Kingston - Audit: ${audit.description.substr(
            0,
            10
          )}...`"
        />

        <gov-grid-column width="two-thirds">
          <gov-heading size="m">View audit</gov-heading>

          <ck-audit-details :audit="audit" />
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import CkAuditDetails from "@/components/CkAuditDetails";

export default {
  name: "ShowAudit",
  components: { CkAuditDetails },
  data() {
    return {
      loading: false,
      audit: null,
    };
  },
  methods: {
    async fetchAudit() {
      this.loading = true;
      const { data } = await http.get(
        `/audits/${this.$route.params.audit}?include=user`
      );
      this.audit = data.data;
      this.loading = false;
    },
  },
  created() {
    this.fetchAudit();
  },
};
</script>
