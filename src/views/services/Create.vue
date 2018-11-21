<template>
  <gov-width-container>
    <vue-headful title="Connected Kingston - Add Service" />

    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>
          <gov-heading size="m">Add service</gov-heading>

          <gov-error-summary v-if="form.$errors.any()" title="Check for errors">
            <gov-list>
              <li v-for="(error, field) in form.$errors.all()" :key="field" v-text="error[0]" />
            </gov-list>
          </gov-error-summary>

          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>

            <details-tab
              v-if="tabs[0].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :name.sync="form.name"
              :slug.sync="form.slug"
              :organisation_id.sync="form.organisation_id"
              :url.sync="form.url"
              :logo.sync="form.logo"
              :intro.sync="form.intro"
              :description.sync="form.description"
              :status.sync="form.status"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </details-tab>

            <additional-info-tab
              v-if="tabs[1].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :wait_time.sync="form.wait_time"
              :is_free.sync="form.is_free"
              :fees_text.sync="form.fees_text"
              :fees_url.sync="form.fees_url"
              :testimonial.sync="form.testimonial"
              :video_embed.sync="form.video_embed"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </additional-info-tab>

            <useful-info-tab
              v-if="tabs[2].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :useful_infos.sync="form.useful_infos"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </useful-info-tab>

            <contact-details-tab
              v-if="tabs[3].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :contact_name.sync="form.contact_name"
              :contact_phone.sync="form.contact_phone"
              :contact_email.sync="form.contact_email"
              :social_medias.sync="form.social_medias"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </contact-details-tab>

            <who-for-tab
              v-if="tabs[4].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
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
              v-if="tabs[5].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :is-global-admin="auth.isGlobalAdmin"
              :category_taxonomies.sync="form.category_taxonomies"
            >
              <gov-button @click="onNext" start>Next</gov-button>
            </taxonomies-tab>

            <referral-tab
              v-if="tabs[6].active"
              @clear="form.$errors.clear($event); errors = {}"
              :errors="form.$errors"
              :is-global-admin="auth.isGlobalAdmin()"
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
import AdditionalInfoTab from "@/views/services/forms/AdditionalInfoTab";
import UsefulInfoTab from "@/views/services/forms/UsefulInfoTab";
import ContactDetailsTab from "@/views/services/forms/ContactDetailsTab";
import WhoForTab from "@/views/services/forms/WhoForTab";
import ReferralTab from "@/views/services/forms/ReferralTab";
import TaxonomiesTab from "@/views/services/forms/TaxonomiesTab";

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    ContactDetailsTab,
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
        status: null,
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
        useful_infos: [],
        social_medias: [],
        category_taxonomies: [],
        logo: null
      }),
      tabs: [
        { heading: "Details", active: true },
        { heading: "Additional info", active: false },
        { heading: "Useful info", active: false },
        { heading: "Contact info", active: false },
        { heading: "Who is it for?", active: false },
        { heading: "Taxonomies", active: false },
        { heading: "Referral", active: false }
      ],
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      const data = await this.form.post("/services");
      const serviceId = data.data.id;
      this.$router.push({
        name: "services-show",
        params: { service: serviceId }
      });
    },
    onTabChange({ index }) {
      this.tabs.forEach(tab => (tab.active = false));
      this.tabs[index].active = true;
    },
    onNext() {
      const currentTabIndex = this.tabs.findIndex(tab => tab.active === true);
      this.tabs.forEach(tab => (tab.active = false));
      this.tabs[currentTabIndex + 1].active = true;
      this.scrollToTop();
    },
    scrollToTop() {
      document.getElementById("main-content").scrollIntoView();
    }
  }
};
</script>
