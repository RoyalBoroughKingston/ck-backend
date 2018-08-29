<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loadingReferral" />
      <template v-else>
        <gov-grid-row>
          <gov-grid-column width="two-thirds">
            <gov-heading size="m">Referral details</gov-heading>
            <ck-referral-details :referral="referral" />
          </gov-grid-column>
        </gov-grid-row>
        <gov-section-break size="l" />
        <ck-loader v-if="loadingStatusUpdates" />
        <gov-grid-row v-else width="two-thirds">
          <gov-grid-column width="two-thirds">
            <gov-heading size="m">Add new comment</gov-heading>
            <gov-form-group :invalid="form.$errors.has('status')">
              <gov-label for="status">Status</gov-label>
              <gov-select
                v-model="form.status"
                @input="form.$errors.clear('status')"
                id="status"
                name="status"
                :options="statusOptions"
              />
              <gov-error-message
                v-if="form.$errors.has('status')"
                v-text="form.$errors.get('status')"
                for="status"
              />
            </gov-form-group>
            <gov-form-group :invalid="form.$errors.has('comments')">
              <gov-label for="comments">Notes</gov-label>
              <gov-textarea
                v-model="form.comments"
                @input="form.$errors.clear('comments')"
                id="comments"
                name="comments"
              />
              <gov-error-message
                v-if="form.$errors.has('comments')"
                v-text="form.$errors.get('comments')"
                for="comments"
              />
            </gov-form-group>
            <gov-button v-if="form.$submitting" disabled type="submit">Adding notes...</gov-button>
          <gov-button v-else @click="onSubmit" type="submit">Add note</gov-button>
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

      http.get(`/referrals/${this.$route.params.referral}`)
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
          include: "service"
        }
      };

      http.get("/status-updates", config)
        .then(({ data }) => {
          this.statusUpdates = data.data;
          this.loadingStatusUpdates = false;
        });
    },
    onSubmit() {
      this.form.put(`/referrals/${this.referral.id}`)
        .then(() => {
          this.fetchReferral();
          this.fetchStatusUpdates();
        })
    }
  },
  created() {
    this.fetchReferral();
    this.fetchStatusUpdates();
  }
};
</script>
