<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'referrals-index' }">Back to referrals</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loadingReferral" />
      <template v-else>
        <vue-headful :title="`Connected Kingston - Referral: ${referral.name}`" />

        <gov-grid-row>
          <gov-grid-column width="two-thirds">
            <gov-heading size="m">Referral details</gov-heading>
            <ck-referral-details :referral="referral" />
          </gov-grid-column>
        </gov-grid-row>
        <gov-section-break size="l" />
        <gov-grid-row width="two-thirds">
          <gov-grid-column width="two-thirds">
            <gov-heading size="m">Update case</gov-heading>

            <gov-hint>
              You can change the status of the referral to ‘Complete’,
              ‘Incomplete’ or ‘In progress’ and add a comment.
            </gov-hint>

            <ck-select-input
              v-model="form.status"
              @input="form.$errors.clear('status')"
              id="status"
              label="Status"
              :options="statusOptions"
              :error="form.$errors.get('status')"
            />

            <ck-textarea-input
              v-model="form.comments"
              @input="form.$errors.clear('comments')"
              id="comments"
              label="Comments"
              :error="form.$errors.get('comments')"
            />

            <gov-button v-if="form.$submitting" disabled type="submit">Adding comment...</gov-button>
            <gov-button v-else @click="onSubmit" type="submit">Add comment</gov-button>
            <ck-submit-error v-if="form.$errors.any()" />
          </gov-grid-column>
        </gov-grid-row>
        <gov-section-break size="l" />
        <gov-grid-row>
          <gov-grid-column width="full">
            <gov-heading size="m">Previous comments</gov-heading>
            <ck-loader v-if="loadingStatusUpdates" />
            <template v-else>
              <gov-grid-row v-for="(statusUpdate, key) in statusUpdates" :key="key">
                <gov-grid-column width="full">
                  <gov-grid-row>
                    <gov-grid-column width="two-thirds">
                      <gov-body>{{ statusUpdate.user.first_name }} {{ statusUpdate.user.last_name }}</gov-body>
                      <gov-body>{{ formatDateTime(statusUpdate.created_at) }}</gov-body>
                    </gov-grid-column>
                    <gov-grid-column width="one-third" class="text-right">
                      <gov-tag>{{ humanReadableStatus(statusUpdate.to) }}</gov-tag>
                    </gov-grid-column>
                  </gov-grid-row>
                  <gov-grid-row v-if="statusUpdate.comments">
                    <gov-grid-column width="full">
                      <gov-body>{{ statusUpdate.comments }}</gov-body>
                    </gov-grid-column>
                  </gov-grid-row>
                  <gov-section-break size="l" visible />
                </gov-grid-column>
              </gov-grid-row>
              <gov-body>
                Page {{ currentPage }} of {{ lastPage }}
                <gov-link v-if="currentPage > 1" @click="onPrevious">Back</gov-link>&nbsp;<!--
              --><gov-link v-if="currentPage < lastPage" @click="onNext">Next</gov-link>
              </gov-body>
            </template>
          </gov-grid-column>
        </gov-grid-row>
      </template>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";
import Form from "@/classes/Form";

export default {
  name: "ShowReferral",
  data() {
    return {
      loadingReferral: false,
      loadingStatusUpdates: false,
      referral: null,
      statusUpdates: [],
      currentPage: 1,
      lastPage: 1,
      statusOptions: [
        { text: "New", value: "new" },
        { text: "In progress", value: "in_progress" },
        { text: "Completed", value: "completed" },
        { text: "Incompleted", value: "incompleted" }
      ],
      form: new Form({
        status: null,
        comments: ""
      })
    };
  },
  methods: {
    fetchReferral() {
      this.loadingReferral = true;

      http
        .get(`/referrals/${this.$route.params.referral}`, {
          params: { include: "service" }
        })
        .then(({ data }) => {
          this.referral = data.data;
          this.form.status = this.referral.status;
          this.loadingReferral = false;
        });
    },
    fetchStatusUpdates() {
      this.loadingStatusUpdates = true;

      const config = {
        params: {
          "filter[referral_id]": this.$route.params.referral,
          include: "user"
        }
      };

      http.get("/status-updates", config).then(({ data }) => {
        this.statusUpdates = data.data;
        this.currentPage = data.meta.current_page;
        this.lastPage = data.meta.last_page;
        this.loadingStatusUpdates = false;
      });
    },
    onNext() {
      this.currentPage++;
      this.fetchStatusUpdates();
    },
    onPrevious() {
      this.currentPage--;
      this.fetchStatusUpdates();
    },
    onSubmit() {
      this.form.put(`/referrals/${this.referral.id}`).then(() => {
        this.form.comments = "";
        this.fetchReferral();
        this.fetchStatusUpdates();
      });
    },
    humanReadableStatus(status) {
      const string = status.replace("_", " ");
      return string.charAt(0).toUpperCase() + string.substr(1);
    }
  },
  created() {
    this.fetchReferral();
    this.fetchStatusUpdates();
  }
};
</script>
