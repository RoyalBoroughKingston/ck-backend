<template>
  <div>
    <gov-back-link :to="{ name: 'register-index-organisation' }">
      Back
    </gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>
            <details-tab
              v-if="isTabActive('details')"
              :service="service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </details-tab>

            <additional-info-tab
              v-if="isTabActive('additional-info')"
              :service="service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </additional-info-tab>

            <useful-info-tab
              v-if="isTabActive('useful-info')"
              :type="service.type"
              :useful_infos.sync="service.useful_infos"
              :errors="errors"
              @clear="errors.clear($event); errors = {}"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </useful-info-tab>

            <who-for-tab
              v-if="isTabActive('who-for')"
              :type="service.type"
              :age_group.sync="service.criteria.age_group"
              :disability.sync="service.criteria.disability"
              :employment.sync="service.criteria.employment"
              :gender.sync="service.criteria.gender"
              :housing.sync="service.criteria.housing"
              :income.sync="service.criteria.income"
              :language.sync="service.criteria.language"
              :other.sync="service.criteria.other"
              :errors="errors"
              @clear="errors.clear($event); errors = {}"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </who-for-tab>

            <description-tab
              v-if="isTabActive('description')"
              :type="service.type"
              :intro.sync="service.intro"
              :offerings.sync="service.offerings"
              :description.sync="service.description"
              :errors="errors"
              @clear="errors.clear($event); errors = {}"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </description-tab>

            <referral-tab
              v-if="isTabActive('referral')"
              :is-global-admin="auth.isGlobalAdmin"
              :is-super-admin="auth.isSuperAdmin"
              :type="service.type"
              :show_referral_disclaimer.sync="service.show_referral_disclaimer"
              :referral_method.sync="service.referral_method"
              :referral_button_text.sync="service.referral_button_text"
              :referral_email.sync="service.referral_email"
              :referral_url.sync="service.referral_url"
              :errors="errors"
              @clear="errors.clear($event); errors = {}"
            >
              <gov-button v-if="service.$submitting" disabled type="submit">
                Creating...
              </gov-button>

              <gov-button v-else @click="onSubmit" type="submit">
                Create
              </gov-button>

              <ck-submit-error v-if="errors.any()" />
            </referral-tab>
          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </div>
</template>

<script>
import DetailsTab from "@/views/register/index/forms/DetailsTab";
import DescriptionTab from "@/views/register/index/forms/DescriptionTab";
import AdditionalInfoTab from "@/views/register/index/forms/AdditionalInfoTab";
import UsefulInfoTab from "@/views/register/index/forms/UsefulInfoTab";
import WhoForTab from "@/views/register/index/forms/WhoForTab";
import ReferralTab from "@/views/register/index/forms/ReferralTab";

export default {
  components: {
    DetailsTab,
    DescriptionTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    WhoForTab,
    ReferralTab
  },

  props: {
    service: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      tabs: [
        { id: "details", heading: "Details", active: true },
        { id: "additional-info", heading: "Additional info", active: false },
        { id: "useful-info", heading: "Good to know", active: false },
        { id: "who-for", heading: "Who is it for?", active: false },
        { id: "description", heading: "Description", active: false },
        { id: "referral", heading: "Referral", active: false }
      ]
    }
  },

  methods: {
    onInput(field, value) {
      this.$emit('input', Object.assign(this.service, { [field]: value }));
      this.$emit('clear', `service.${field}`);
    },

    onTabChange({ index }) {
      this.tabs.forEach(tab => (tab.active = false));
      const tabId = this.tabs[index].id;
      this.tabs.find(tab => tab.id === tabId).active = true;
    },

    onNext() {
      const currentTabIndex = this.tabs.findIndex(tab => tab.active === true);
      this.tabs.forEach(tab => (tab.active = false));
      const newTabId = this.tabs[currentTabIndex + 1].id;
      this.tabs.find(tab => tab.id === newTabId).active = true;
      this.scrollToTop();
    },

    scrollToTop() {
      document.getElementById("main-content").scrollIntoView();
    },

    isTabActive(id) {
      const tab = this.tabs.find(tab => tab.id === id);

      return tab === undefined ? false : tab.active;
    }
  }
};
</script>
