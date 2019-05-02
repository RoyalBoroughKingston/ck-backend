<template>
  <gov-width-container>
    <ck-loader v-if="loading" />
    <template v-else>
      <vue-headful :title="`Connected Kingston - Edit Service: ${service.name}`" />

      <!-- Edit form -->
      <div v-show="updateRequest === null">
        <gov-back-link :to="{ name: 'services-show', params: { service: service.id } }">Back to {{ service.type }}</gov-back-link>
        <gov-main-wrapper>
          <gov-grid-row>
            <gov-grid-column width="full">
              <gov-heading size="xl">Services</gov-heading>

              <gov-heading size="m">Edit {{ form.type }}</gov-heading>

              <gov-error-summary v-if="form.$errors.any()" title="Check for errors">
                <gov-list>
                  <li v-for="(error, field) in form.$errors.all()" :key="field" v-text="error[0]" />
                </gov-list>
              </gov-error-summary>

              <gov-tabs @tab-changed="onTabChange" :tabs="allowedTabs" no-router>

                <details-tab
                  v-show="isTabActive('details')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :organisation_id.sync="form.organisation_id"
                  :name.sync="form.name"
                  :slug.sync="form.slug"
                  :type.sync="form.type"
                  :url.sync="form.url"
                  @update:logo_file_id="form.logo_file_id = $event"
                  @update:logo="form.logo = $event"
                  :intro.sync="form.intro"
                  :status.sync="form.status"
                  :gallery_items.sync="form.gallery_items"
                  :id="service.id"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </details-tab>

                <description-tab
                  v-if="isTabActive('description')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :type="form.type"
                  :description.sync="form.description"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </description-tab>

                <additional-info-tab
                  v-if="isTabActive('additional-info')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :type="form.type"
                  :wait_time.sync="form.wait_time"
                  :is_free.sync="form.is_free"
                  :fees_text.sync="form.fees_text"
                  :fees_url.sync="form.fees_url"
                  :testimonial.sync="form.testimonial"
                  :video_embed.sync="form.video_embed"
                  :contact_name.sync="form.contact_name"
                  :contact_phone.sync="form.contact_phone"
                  :contact_email.sync="form.contact_email"
                  :social_medias.sync="form.social_medias"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </additional-info-tab>

                <useful-info-tab
                  v-if="isTabActive('useful-info')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :type="form.type"
                  :useful_infos.sync="form.useful_infos"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </useful-info-tab>

                <who-for-tab
                  v-if="isTabActive('who-for')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :type="form.type"
                  :age_group.sync="form.criteria.age_group"
                  :disability.sync="form.criteria.disability"
                  :employment.sync="form.criteria.employment"
                  :gender.sync="form.criteria.gender"
                  :housing.sync="form.criteria.housing"
                  :income.sync="form.criteria.income"
                  :language.sync="form.criteria.language"
                  :other.sync="form.criteria.other"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </who-for-tab>

                <taxonomies-tab
                  v-if="isTabActive('taxonomies')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :is-global-admin="auth.isGlobalAdmin"
                  :type="form.type"
                  :category_taxonomies.sync="form.category_taxonomies"
                >
                  <gov-button @click="onNext" start>Next</gov-button>
                </taxonomies-tab>

                <referral-tab
                  v-if="isTabActive('referral')"
                  @clear="form.$errors.clear($event); errors = {}"
                  :errors="form.$errors"
                  :is-global-admin="auth.isGlobalAdmin"
                  :is-super-admin="auth.isSuperAdmin"
                  :original-data="form.$originalData"
                  :type="form.type"
                  :show_referral_disclaimer.sync="form.show_referral_disclaimer"
                  :referral_method.sync="form.referral_method"
                  :referral_button_text.sync="form.referral_button_text"
                  :referral_email.sync="form.referral_email"
                  :referral_url.sync="form.referral_url"
                />

              </gov-tabs>

            </gov-grid-column>
          </gov-grid-row>

          <gov-grid-row>
            <gov-grid-column width="two-thirds">
              <gov-warning-text>
                You will be able to preview your changes before you submit them
                as an update request.
              </gov-warning-text>

              <gov-button v-if="form.$submitting" disabled type="submit">Validating...</gov-button>
              <gov-button v-else @click="onPreview" type="submit">Review changes</gov-button>
              <ck-submit-error v-if="form.$errors.any()" />
            </gov-grid-column>
          </gov-grid-row>
        </gov-main-wrapper>
      </div>

      <!-- Preview changes -->
      <template v-if="updateRequest !== null">
        <gov-back-link @click="updateRequest = null">Edit {{ service.type }}</gov-back-link>
        <gov-main-wrapper>
          <gov-grid-row>
            <gov-grid-column width="full">
              <gov-heading size="xl">Services</gov-heading>

              <gov-heading size="m">Preview changes</gov-heading>

              <service-details
                update-request-id="PREVIEW"
                requested-at="PREVIEW"
                :service="updateRequest.data"
                :logo-data-uri="form.logo"
                :gallery-items-data-uris="form.gallery_items.map(galleryItem => galleryItem.image)"
              />

              <gov-warning-text>
                Please be aware, by submitting these changes, any pending
                updates may be overwritten.
              </gov-warning-text>

              <gov-button v-if="form.$submitting" disabled type="submit">Requesting...</gov-button>
              <gov-button v-else @click="onSubmit" type="submit">Request update</gov-button>
            </gov-grid-column>
          </gov-grid-row>
        </gov-main-wrapper>
      </template>
    </template>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import http from "@/http";
import DetailsTab from "@/views/services/forms/DetailsTab";
import DescriptionTab from "@/views/services/forms/DescriptionTab";
import AdditionalInfoTab from "@/views/services/forms/AdditionalInfoTab";
import UsefulInfoTab from "@/views/services/forms/UsefulInfoTab";
import WhoForTab from "@/views/services/forms/WhoForTab";
import ReferralTab from "@/views/services/forms/ReferralTab";
import TaxonomiesTab from "@/views/services/forms/TaxonomiesTab";
import ServiceDetails from "@/views/update-requests/show/ServiceDetails";

export default {
  name: "EditService",
  components: {
    DetailsTab,
    DescriptionTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    WhoForTab,
    ReferralTab,
    TaxonomiesTab,
    ServiceDetails
  },
  data() {
    return {
      form: null,
      tabs: [
        { id: "details", heading: "Details", active: true },
        { id: "description", heading: "Description", active: false },
        { id: "additional-info", heading: "Additional info", active: false },
        { id: "useful-info", heading: "Useful info", active: false },
        { id: "who-for", heading: "Who is it for?", active: false },
        { id: "taxonomies", heading: "Taxonomies", active: false },
        { id: "referral", heading: "Referral", active: false }
      ],
      errors: {},
      service: null,
      loading: false,
      updateRequest: null
    };
  },
  computed: {
    allowedTabs() {
      if (!this.auth.isGlobalAdmin) {
        const taxonomiesTabIndex = this.tabs.findIndex(tab => tab.id === "taxonomies");
        const tabs = this.tabs.slice();
        tabs.splice(taxonomiesTabIndex, 1);

        return tabs;
      }

      return this.tabs;
    }
  },
  methods: {
    async fetchService() {
      this.loading = true;

      const response = await http.get(
        `/services/${this.$route.params.service}`
      );
      this.service = response.data.data;
      this.form = new Form({
        organisation_id: this.service.organisation_id,
        name: this.service.name,
        slug: this.service.slug,
        type: this.service.type,
        status: this.service.status,
        intro: this.service.intro,
        description: this.service.description,
        wait_time: this.service.wait_time,
        is_free: this.service.is_free,
        fees_text: this.service.fees_text || "",
        fees_url: this.service.fees_url || "",
        testimonial: this.service.testimonial || "",
        video_embed: this.service.video_embed || "",
        url: this.service.url,
        contact_name: this.service.contact_name || "",
        contact_phone: this.service.contact_phone || "",
        contact_email: this.service.contact_email || "",
        show_referral_disclaimer: this.service.show_referral_disclaimer,
        referral_method: this.service.referral_method,
        referral_button_text: this.service.referral_button_text || "",
        referral_email: this.service.referral_email || "",
        referral_url: this.service.referral_url || "",
        criteria: {
          age_group: this.service.criteria.age_group || "",
          disability: this.service.criteria.disability || "",
          employment: this.service.criteria.employment || "",
          gender: this.service.criteria.gender || "",
          housing: this.service.criteria.housing || "",
          income: this.service.criteria.income || "",
          language: this.service.criteria.language || "",
          other: this.service.criteria.other || ""
        },
        useful_infos: this.service.useful_infos,
        social_medias: this.service.social_medias,
        gallery_items: this.service.gallery_items.map(galleryItem => ({
          file_id: galleryItem.file_id,
          image: null
        })),
        category_taxonomies: this.service.category_taxonomies.map(
          taxonomy => taxonomy.id
        ),
        logo_file_id: null,
        logo: null
      });

      this.loading = false;
    },
    async onSubmit(preview = false) {
      const response = await this.form.put(`/services/${this.service.id}`, (config, data) => {
        // Append preview mode if enabled.
        data.preview = preview;

        // Remove any unchanged values.
        if (data.organisation_id === this.service.organisation_id) {
          delete data.organisation_id;
        }
        if (data.name === this.service.name) {
          delete data.name;
        }
        if (data.slug === this.service.slug) {
          delete data.slug;
        }
        if (data.type === this.service.type) {
          delete data.type;
        }
        if (data.status === this.service.status) {
          delete data.status;
        }
        if (data.intro === this.service.intro) {
          delete data.intro;
        }
        if (data.description === this.service.description) {
          delete data.description;
        }
        if (data.wait_time === this.service.wait_time) {
          delete data.wait_time;
        }
        if (data.is_free === this.service.is_free) {
          delete data.is_free;
        }
        if (data.fees_text === (this.service.fees_text || "")) {
          delete data.fees_text;
        }
        if (data.fees_url === (this.service.fees_url || "")) {
          delete data.fees_url;
        }
        if (data.testimonial === (this.service.testimonial || "")) {
          delete data.testimonial;
        }
        if (data.video_embed === (this.service.video_embed || "")) {
          delete data.video_embed;
        }
        if (data.url === this.service.url) {
          delete data.url;
        }
        if (data.contact_name === (this.service.contact_name || "")) {
          delete data.contact_name;
        }
        if (data.contact_phone === (this.service.contact_phone || "")) {
          delete data.contact_phone;
        }
        if (data.contact_email === (this.service.contact_email || "")) {
          delete data.contact_email;
        }
        if (
          data.show_referral_disclaimer ===
          this.service.show_referral_disclaimer
        ) {
          delete data.show_referral_disclaimer;
        }
        if (data.referral_method === this.service.referral_method) {
          delete data.referral_method;
        }
        if (
          data.referral_button_text ===
          (this.service.referral_button_text || "")
        ) {
          delete data.referral_button_text;
        }
        if (data.referral_email === (this.service.referral_email || "")) {
          delete data.referral_email;
        }
        if (data.referral_url === (this.service.referral_url || "")) {
          delete data.referral_url;
        }
        if (
          data.criteria.age_group === (this.service.criteria.age_group || "")
        ) {
          delete data.criteria.age_group;
        }
        if (
          data.criteria.disability === (this.service.criteria.disability || "")
        ) {
          delete data.criteria.disability;
        }
        if (
          data.criteria.employment === (this.service.criteria.employment || "")
        ) {
          delete data.criteria.employment;
        }
        if (data.criteria.gender === (this.service.criteria.gender || "")) {
          delete data.criteria.gender;
        }
        if (data.criteria.housing === (this.service.criteria.housing || "")) {
          delete data.criteria.housing;
        }
        if (data.criteria.income === (this.service.criteria.income || "")) {
          delete data.criteria.income;
        }
        if (data.criteria.language === (this.service.criteria.language || "")) {
          delete data.criteria.language;
        }
        if (data.criteria.other === (this.service.criteria.other || "")) {
          delete data.criteria.other;
        }
        if (Object.keys(data.criteria).length === 0) {
          delete data.criteria;
        }
        if (
          JSON.stringify(data.useful_infos) ===
          JSON.stringify(this.service.useful_infos)
        ) {
          delete data.useful_infos;
        }
        if (
          JSON.stringify(data.social_medias) ===
          JSON.stringify(this.service.social_medias)
        ) {
          delete data.social_medias;
        }
        if (
          JSON.stringify(data.category_taxonomies) ===
          JSON.stringify(
            this.service.category_taxonomies.map(taxonomy => taxonomy.id)
          )
        ) {
          delete data.category_taxonomies;
        }

        // Remove the logo from the request if null, or delete if false.
        if (data.logo_file_id === null) {
          delete data.logo_file_id;
        } else if (data.logo_file_id === false) {
          data.logo_file_id = null;
        }

        // Remove the gallery items from the request if null, or delete if false.
        if (
          JSON.stringify(data.gallery_items.map(galleryItem => ({ file_id: galleryItem.file_id }))) ===
          JSON.stringify(this.service.gallery_items.map(galleryItem => ({ file_id: galleryItem.file_id })))
        ) {
          delete data.gallery_items;
        }
      });

      // Return the response if only a preview.
      if (preview) {
        response.data.id = this.service.id;
        return response;
      }

      // Otherwise, forward the user to the service page.
      this.$router.push({
        name: "services-updated",
        params: { service: this.service.id }
      });
    },
    async onPreview() {
      this.updateRequest = await this.onSubmit(true);
    },
    onTabChange({ index }) {
      this.tabs.forEach(tab => (tab.active = false));
      const tabId = this.allowedTabs[index].id;
      this.tabs.find(tab => tab.id === tabId).active = true;
    },
    onNext() {
      const currentTabIndex = this.allowedTabs.findIndex(tab => tab.active === true);
      this.tabs.forEach(tab => (tab.active = false));
      const newTabId = this.allowedTabs[currentTabIndex + 1].id;
      this.tabs.find(tab => tab.id === newTabId).active = true;
      this.scrollToTop();
    },
    scrollToTop() {
      document.getElementById("main-content").scrollIntoView();
    },
    isTabActive(id) {
      const tab = this.allowedTabs.find(tab => tab.id === id);

      return tab === undefined ? false : tab.active;
    }
  },
  created() {
    this.fetchService();
  }
};
</script>
