<template>
  <div>
    <gov-heading size="l">Audit logs</gov-heading>
    <ck-loader v-if="loading" />
    <template v-else>
      <ck-audits-table :audits="audits" />
      <gov-body>
        Page {{ currentPage }} of {{ lastPage }}
        <gov-link v-if="currentPage > 1" @click="onPrevious">Back</gov-link>&nbsp;<!--
      --><gov-link v-if="currentPage < lastPage" @click="onNext">Next</gov-link>
      </gov-body>
    </template>
  </div>
</template>

<script>
import http from "@/http";
import CkAuditsTable from "@/components/CkAuditsTable";

export default {
  name: "ListAuditLogs",
  components: { CkAuditsTable },
  data() {
    return {
      loading: false,
      audits: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  methods: {
    async fetchAudits() {
      this.loading = true;

      const response = await http.get("/audits", { params: { page: this.currentPage } });
      const audits = await this.fetchUsers(response.data.data);

      this.audits = audits;
      this.currentPage = response.data.meta.current_page;
      this.lastPage = response.data.meta.last_page;

      this.loading = false;
    },
    async fetchUsers(audits) {
      let userIds = audits
        .map(audit => (audit.user_id))
        .filter(userId => (userId !== null));
      userIds = userIds
        .filter((userId, index) => (userIds.indexOf(userId) === index))
        .join(",");

      const users = await this.fetchAll("/users", { "filter[id]": userIds });
      users.forEach(user => {
        audits.map(audit => {
          if (audit.user_id === user.id) {
            audit.user = user;
          }

          return audit;
        });
      });

      return audits;
    },
    onNext() {
      this.currentPage++;
      this.fetchAudits();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchAudits();
    }
  },
  created() {
    this.fetchAudits();
  }
};
</script>
