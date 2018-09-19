<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'admin-index-notifications' }">Back to notifications</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <vue-headful :title="`Connected Kingston - Notification: ${notification.message.substr(0, 10)}...`" />

        <gov-grid-column width="two-thirds">

          <gov-heading size="m">View notification</gov-heading>

          <ck-notification-details :notification="notification" />

        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import CkNotificationDetails from "@/components/CkNotificationDetails";

export default {
  name: "ShowNotification",
  components: { CkNotificationDetails },
  data() {
    return {
      loading: false,
      notification: null
    };
  },
  methods: {
    async fetchNotification() {
      this.loading = true;
      const { data } = await http.get(`/notifications/${this.$route.params.notification}`);
      this.notification = data.data;
      this.loading = false;
    }
  },
  created() {
    this.fetchNotification();
  }
};
</script>
