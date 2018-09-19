<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Notifications" />

    <gov-heading size="l">Notifications</gov-heading>
    <ck-loader v-if="loading" />
    <template v-else>
      <ck-notifications-table :notifications="notifications" />
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
import CkNotificationsTable from "@/components/CkNotificationsTable";

export default {
  name: "ListNotification",
  components: { CkNotificationsTable },
  data() {
    return {
      loading: false,
      notifications: [],
      currentPage: 1,
      lastPage: 1
    };
  },
  methods: {
    async fetchNotifications() {
      this.loading = true;

      const { data } = await http.get("/notifications", { params: { page: this.currentPage } });
      this.notifications = data.data;
      this.currentPage = data.meta.current_page;
      this.lastPage = data.meta.last_page;

      this.loading = false;
    },
    onNext() {
      this.currentPage++;
      this.fetchNotifications();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchNotifications();
    }
  },
  created() {
    this.fetchNotifications();
  }
};
</script>
