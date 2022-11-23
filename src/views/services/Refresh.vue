<template>
  <gov-width-container>
    <ck-loader v-if="loading" />

    <template v-else>
      <vue-headful
        :title="`Connected Kingston - Refresh Service: ${service.name}`"
      />

      <gov-back-link
        :to="{
          name: 'services-show',
          params: { service: service.id },
        }"
      >
        Back to {{ service.type }}
      </gov-back-link>

      <gov-main-wrapper>
        <gov-grid-row>
          <gov-grid-column width="two-thirds">
            <gov-heading size="m">
              <gov-caption size="m">{{ service.name }}</gov-caption>
              Refresh {{ service.type }}
            </gov-heading>

            <template v-if="!refreshed">
              <gov-error-summary
                v-if="form.$errors.any()"
                title="There was a problem when confirming"
              >
                <gov-list>
                  <li
                    v-for="(error, field) in form.$errors.all()"
                    :key="field"
                    v-text="error[0]"
                  />
                </gov-list>
              </gov-error-summary>

              <gov-body>
                Please confirm that this {{ service.type }} is still up to date?
              </gov-body>

              <gov-button v-if="form.$submitting" disabled>
                Confirming...
              </gov-button>
              <gov-button v-else @click="onRefresh"> Confirm </gov-button>
            </template>

            <template v-else>
              <gov-body>The {{ service.type }} has been freshed!</gov-body>

              <gov-button
                :to="{
                  name: 'services-show',
                  params: { service: service.id },
                }"
              >
                Back to {{ service.type }}
              </gov-button>
            </template>
          </gov-grid-column>
        </gov-grid-row>
      </gov-main-wrapper>
    </template>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import http from "@/http";

export default {
  name: "RefreshService",

  data() {
    return {
      service: null,
      loading: false,
      form: null,
      refreshed: false,
    };
  },

  computed: {
    token() {
      return this.$route.query.token || "";
    },
  },

  created() {
    this.fetchService();
  },

  methods: {
    async fetchService() {
      this.loading = true;

      const response = await http.get(
        `/services/${this.$route.params.service}`
      );
      this.service = response.data.data;
      this.form = new Form({
        token: this.token,
      });

      this.loading = false;
    },

    async onRefresh() {
      await this.form.put(`/services/${this.$route.params.service}/refresh`);
      this.refreshed = true;
    },
  },
};
</script>
