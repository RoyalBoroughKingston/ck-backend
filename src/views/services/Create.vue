<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>
          <gov-heading size="m">Add service</gov-heading>
          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>

            <details-tab
              v-if="tabs[0].active"
              :form="form"
              :logo-form="logoForm"
              @clear="form.$errors.clear($event)"
              @clear-logo="logoForm.$errors.clear($event)"
              @update:name="form.name = $event"
              @update:url="form.url = $event"
              @update:logo="logoForm.file = $event"
              @update:intro="form.intro = $event"
              @update:description="form.description = $event"
              @next="onNext"
            />

            <additional-info-tab
              v-if="tabs[1].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @update:wait_time="form.wait_time = $event"
              @update:is_free="form.is_free = $event"
              @update:fees_text="form.fees_text = $event"
              @update:fees_url="form.fees_url = $event"
              @update:testimonial="form.testimonial = $event"
              @update:video_embed="form.video_embed = $event"
              @next="onNext"
            />

            <useful-info-tab
              v-if="tabs[2].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @update:useful_infos_title="form.useful_infos[$event.index].title = $event.value"
              @update:useful_infos_description="form.useful_infos[$event.index].description = $event.value"
              @update:useful_infos_order="form.useful_infos[$event.index].order = $event.value"
              @add="form.useful_infos.push($event)"
              @delete="$delete(form.useful_infos, $event)"
              @next="onNext"
            />

            <contact-details-tab
              v-if="tabs[3].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @update:contact_name="form.contact_name = $event"
              @update:contact_phone="form.contact_phone = $event"
              @update:contact_email="form.contact_email = $event"
              @update:social_medias_type="form.social_medias[$event.index].type = $event.value"
              @update:social_medias_url="form.social_medias[$event.index].url = $event.value"
              @add="form.social_medias.push($event)"
              @delete="$delete(form.social_medias, $event)"
              @next="onNext"
            />

            <!-- Who is it for tab -->
            <template v-if="tabs[4].active">
              <gov-heading size="l">Who is it for?</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>
                    Use this section to add details as to who this service is for. If any of these
                    criteria do not apply to your service, please leave them blank.
                  </gov-body>
                  <gov-section-break size="l" />

                  <!-- Age group -->
                  <criteria-input
                    v-model="form.criteria.age_group"
                    :form="form"
                    path="criteria.age_group"
                    @input="form.$errors.clear('criteria.age_group')"
                    label="Age of service user (if applicable)"
                    hint='e.g. "This service is for people 16+", or "This service is aimed at people nearig retirement"'
                  />
                  <!-- /Age group -->

                  <!-- Disability -->
                  <criteria-input
                    v-model="form.criteria.disability"
                    :form="form"
                    path="criteria.disability"
                    @input="form.$errors.clear('criteria.disability')"
                    label="Disability Requirements / Restrictions (if applicable)"
                    hint='e.g. "This service is for those with MS and their carers", or "For all people with disabilities and their carers"'
                  />
                  <!-- /Disability -->

                  <!-- Gender -->
                  <criteria-input
                    v-model="form.criteria.gender"
                    :form="form"
                    path="criteria.gender"
                    @input="form.$errors.clear('criteria.gender')"
                    label="Gender Specific (if applicable)"
                    hint='e.g. "Women only"'
                  />
                  <!-- /Gender -->

                  <!-- Housing -->
                  <criteria-input
                    v-model="form.criteria.housing"
                    :form="form"
                    path="criteria.housing"
                    @input="form.$errors.clear('criteria.housing')"
                    label="Specific Housing status/needs (if applicable)"
                    hint='e.g. "For people who are homeless or at risk of homelessness"'
                  />
                  <!-- /Housing -->

                  <!-- Income -->
                  <criteria-input
                    v-model="form.criteria.income"
                    :form="form"
                    path="criteria.income"
                    @input="form.$errors.clear('criteria.income')"
                    label="Income level (if applicable)"
                    hint='e.g. "Service is aimed at people claiming benefits or with Income support"'
                  />
                  <!-- /Income -->

                  <!-- Language -->
                  <criteria-input
                    v-model="form.criteria.language"
                    :form="form"
                    path="criteria.language"
                    @input="form.$errors.clear('criteria.language')"
                    label="Language accessability (if applicable)"
                    hint='e.g. "Instructors speak English, but open to all", or "This service is available in a number of languages - please contact me for more information"'
                  />
                  <!-- /Language -->

                  <!-- Other -->
                  <criteria-input
                    v-model="form.criteria.other"
                    :form="form"
                    path="criteria.other"
                    @input="form.$errors.clear('criteria.other')"
                    label="Any other notes as to who the service is aimed at/not appropraite for?"
                    hint='e.g. "This service is open to all", or "This service is aimed at people living in Chessington"'
                  />
                  <!-- /Other -->

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Who is it for tab -->

            <!-- Location tab -->
            <template v-if="tabs[5].active">
              <gov-heading size="l">Location of the service</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>
                    If this service operates from multiple locations, please add each individually
                    by filling in the location below and then select "Add another location".
                  </gov-body>
                  <gov-section-break size="l" />
                  <p>TODO</p>

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Location tab -->

            <!-- Referral tab -->
            <template v-if="tabs[6].active">
              <gov-heading size="l">Referral</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>
                    Use this section to specify how referrals should be made to this service.
                  </gov-body>
                  <gov-section-break size="l" />

                  <!-- Show referral disclaimer -->
                  <gov-form-group :invalid="form.$errors.has('show_referral_disclaimer')">
                    <gov-radios>
                      <gov-label class="govuk-!-font-weight-bold" for="show_referral_disclaimer">
                        Show referral disclaimer?
                      </gov-label>
                      <gov-radio
                        v-model="form.show_referral_disclaimer"
                        id="show_referral_disclaimer_enabled"
                        name="show_referral_disclaimer"
                        label="Display"
                        :value="true"
                      />
                      <gov-radio
                        v-model="form.show_referral_disclaimer"
                        id="show_referral_disclaimer_no"
                        name="show_referral_disclaimer"
                        label="Don't display"
                        :value="false"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('show_referral_disclaimer')"
                        v-text="form.$errors.get('show_referral_disclaimer')"
                        for="show_referral_disclaimer"
                      />
                    </gov-radios>
                  </gov-form-group>
                  <!-- /Show referral disclaimer -->

                  <!-- Referral method -->
                  <gov-form-group :invalid="form.$errors.has('referral_method')">
                    <gov-label class="govuk-!-font-weight-bold" for="referral_method">
                      Referral method
                    </gov-label>
                    <gov-hint for="referral_method">
                      How does this service receive referrals?
                    </gov-hint>
                    <gov-select
                      v-model="form.referral_method"
                      @input="form.$errors.clear('referral_method')"
                      id="referral_method"
                      name="referral_method"
                      :options="referralMethodOptions"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('referral_method')"
                      v-text="form.$errors.get('referral_method')"
                      for="referral_method"
                    />
                  </gov-form-group>
                  <!-- /Referral method -->

                  <template v-if="(form.referral_method !== null) && (form.referral_method !== 'none')">
                    <!-- Referral button text -->
                    <gov-form-group :invalid="form.$errors.has('referral_button_text')">
                      <gov-label class="govuk-!-font-weight-bold" for="referral_button_text">
                        Referral button text
                      </gov-label>
                      <gov-hint for="referral_button_text">
                        The text to be displayed on the button to make the referral.
                      </gov-hint>
                      <gov-input
                        v-model="form.referral_button_text"
                        @input="form.$errors.clear('referral_button_text')"
                        id="referral_button_text"
                        name="referral_button_text"
                        type="text"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('referral_button_text')"
                        v-text="form.$errors.get('referral_button_text')"
                        for="referral_button_text"
                      />
                    </gov-form-group>
                    <!-- /Referral button text -->

                    <!-- Referral email -->
                    <gov-form-group :invalid="form.$errors.has('referral_email')">
                      <gov-label class="govuk-!-font-weight-bold" for="referral_email">
                        Referral email
                      </gov-label>
                      <gov-hint for="referral_email">
                        The email address which should be notified when referrals are made
                      </gov-hint>
                      <gov-input
                        v-model="form.referral_email"
                        @input="form.$errors.clear('referral_email')"
                        id="referral_email"
                        name="referral_email"
                        type="email"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('referral_email')"
                        v-text="form.$errors.get('referral_email')"
                        for="referral_email"
                      />
                    </gov-form-group>
                    <!-- /Referral email -->

                    <!-- Referral URL -->
                    <gov-form-group
                      v-if="(form.referral_method === 'external')"
                      :invalid="form.$errors.has('referral_url')"
                    >
                      <gov-label class="govuk-!-font-weight-bold" for="referral_url">
                        Referral URL
                      </gov-label>
                      <gov-hint for="referral_url">
                        The URL that the user must visit to make a referral
                      </gov-hint>
                      <gov-input
                        v-model="form.referral_url"
                        @input="form.$errors.clear('referral_url')"
                        id="referral_url"
                        name="referral_url"
                        type="url"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('referral_url')"
                        v-text="form.$errors.get('referral_url')"
                        for="referral_url"
                      />
                    </gov-form-group>
                    <!-- /Referral URL -->
                  </template>

                  <gov-button v-if="form.$submitting" disabled type="submit">Creating...</gov-button>
                  <gov-button v-else @click="onSubmit" type="submit">Create</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Referral tab -->

          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import DetailsTab from "@/views/services/create/DetailsTab";
import AdditionalInfoTab from "@/views/services/create/AdditionalInfoTab";
import UsefulInfoTab from "@/views/services/create/UsefulInfoTab";
import ContactDetailsTab from "@/views/services/create/ContactDetailsTab";
import CriteriaInput from "@/views/services/create/CriteriaInput";

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    ContactDetailsTab,
    CriteriaInput
  },
  data() {
    return {
      form: new Form({
        organisation_id: null,
        name: "",
        status: "active",
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
        show_referral_disclaimer: null,
        referral_method: null,
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
        seo_title: "",
        seo_description: "",
        useful_infos: [],
        social_medias: [],
        category_taxonomies: []
      }),
      logoForm: new Form({
        file: null
      }),
      referralMethodOptions: [
        { text: "Please select", value: null, disabled: true },
        { text: "Internal", value: "internal" },
        { text: "External", value: "external" },
        { text: "This service doesn't accept referrals", value: "none" }
      ],
      tabs: [
        { heading: "Details", active: true },
        { heading: "Additional info", active: false },
        { heading: "Useful info", active: false },
        { heading: "Contact info", active: false },
        { heading: "Who is it for?", active: false },
        { heading: "Locations", active: false },
        { heading: "Referral", active: false  }
      ],
      ageGroupEnabled: null,
      disabilityEnabled: null,
      employmentEnabled: null,
      genderEnabled: null,
      housingEnabled: null,
      incomeEnabled: null,
      languageEnabled: null,
      otherEnabled: null
    };
  },
  computed: {
    submitting() {
      return this.form.$submitting;
    }
  },
  methods: {
    onSubmit() {
      //
    },
    onTabChange({ index }) {
      this.tabs.forEach(tab => tab.active = false);
      this.tabs[index].active = true;
    },
    onNext() {
      const currentTabIndex = this.tabs.findIndex(tab => (tab.active === true));
      this.tabs.forEach(tab => tab.active = false);
      this.tabs[currentTabIndex + 1].active = true;
      this.scrollToTop();
    },
    scrollToTop() {
      document.getElementById('main-content').scrollIntoView();
    }
  },
  watch: {
    ageGroupEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.age_group = "";
      }
    },
    disabilityEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.disability = "";
      }
    },
    employmentEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.employment = "";
      }
    },
    genderEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.gender = "";
      }
    },
    housingEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.housing = "";
      }
    },
    incomeEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.income = "";
      }
    },
    languageEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.language = "";
      }
    },
    otherEnabled(enabled) {
      if (!enabled) {
        this.form.criteria.other = "";
      }
    },
    "form.referral_method"(newReferralMethod) {
      if ((newReferralMethod === null) || (newReferralMethod === 'none')) {
        this.form.referral_button_text = "";
        this.form.referral_email = "";
        this.form.referral_url = "";
      }

      if (newReferralMethod !== "external") {
        this.form.referral_url = "";
      }
    }
  }
};
</script>
