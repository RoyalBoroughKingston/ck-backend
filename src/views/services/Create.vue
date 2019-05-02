<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Service" />

    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>

          <template v-if="!auth.isGlobalAdmin">
            <gov-body class="govuk-!-font-weight-bold">
              Please review the process below on how to create a {{ form.type }}.
            </gov-body>

            <gov-list bullet>
              <li>To create a {{ form.type }}, fill in the form below.</li>
              <li>The {{ form.type }} won't be made active until an admin has reviewed it.</li>
              <li>If there are any issues upon review, an admin will get directly in touch with you.</li>
              <li>You can return to edit this {{ form.type }} at any time.</li>
            </gov-list>
          </template>

          <gov-heading size="m">Add service</gov-heading>

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
              :is-new="true"
              :name.sync="form.name"
              :slug.sync="form.slug"
              :type.sync="form.type"
              :organisation_id.sync="form.organisation_id"
              :url.sync="form.url"
              @update:logo_file_id="form.logo_file_id = $event"
              :status.sync="form.status"
              :gallery_items.sync="form.gallery_items"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </details-tab>

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

            <description-tab
              v-if="isTabActive('description')"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :type="form.type"
              :intro.sync="form.intro"
              :offerings.sync="form.offerings"
              :description.sync="form.description"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </description-tab>

            <referral-tab
              v-if="isTabActive('referral')"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :is-global-admin="auth.isGlobalAdmin"
              :is-super-admin="auth.isSuperAdmin"
              :type="form.type"
              :show_referral_disclaimer.sync="form.show_referral_disclaimer"
              :referral_method.sync="form.referral_method"
              :referral_button_text.sync="form.referral_button_text"
              :referral_email.sync="form.referral_email"
              :referral_url.sync="form.referral_url"
            >
              <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
              <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
              <ck-submit-error v-if="form.$errors.any()" />
            </referral-tab>

          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import DetailsTab from "@/views/services/forms/DetailsTab";
import DescriptionTab from "@/views/services/forms/DescriptionTab";
import AdditionalInfoTab from "@/views/services/forms/AdditionalInfoTab";
import UsefulInfoTab from "@/views/services/forms/UsefulInfoTab";
import WhoForTab from "@/views/services/forms/WhoForTab";
import ReferralTab from "@/views/services/forms/ReferralTab";
import TaxonomiesTab from "@/views/services/forms/TaxonomiesTab";

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    DescriptionTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    WhoForTab,
    ReferralTab,
    TaxonomiesTab
  },
  data() {
    return {
      form: new Form({
        id: null,
        organisation_id: null,
        name: "",
        slug: "",
        type: "service",
        status: "inactive",
        intro: "",
        description: "",
        wait_time: null,
        is_free: null,
        fees_text: "",
        fees_url: "",
        testimonial: "",
        video_embed: "",
        url: "",
        contact_name: "",
        contact_phone: "",
        contact_email: "",
        show_referral_disclaimer: false,
        referral_method: "none",
        referral_button_text: "",
        referral_email: "",
        referral_url: "",
        criteria: {
          age_group: "",
          disability: "",
          employment: "",
          gender: "",
          housing: "",
          income: "",
          language: "",
          other: ""
        },
        useful_infos: [
          {
            title: "",
            description: "",
            order: 1
          }
        ],
        offerings: [],
        social_medias: [],
        gallery_items: [],
        category_taxonomies: [],
        logo_file_id: null
      }),
      errors: {},
      tabs: [
        { id: "details", heading: "Details", active: true },
        { id: "additional-info", heading: "Additional info", active: false },
        { id: "useful-info", heading: "Good to know", active: false },
        { id: "who-for", heading: "Who is it for?", active: false },
        { id: "taxonomies", heading: "Taxonomies", active: false },
        { id: "description", heading: "Description", active: false },
        { id: "referral", heading: "Referral", active: false }
      ]
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
    async onSubmit() {
      const data = await this.form.post("/services", (config, data) => {
        // Remove useful info if only item and empty.
        if (
          data.useful_infos.length === 1
          && data.useful_infos[0].title === ""
          && data.useful_infos[0].description === ""
        ) {
          data.useful_infos = [];
        }
      });
      const serviceId = data.data.id;

      // Refetch the user as new permissions added for the new service.
      await this.auth.fetchUser();

      this.$router.push({
        name: "services-show",
        params: { service: serviceId }
      });
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
  }
};
</script>
