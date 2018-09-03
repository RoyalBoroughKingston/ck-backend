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
              @next="onNext"
              @update:name="form.name = $event"
              @update:url="form.url = $event"
              @update:logo="logoForm.file = $event"
              @update:intro="form.intro = $event"
              @update:description="form.description = $event"
            />

            <additional-info-tab
              v-if="tabs[1].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @next="onNext"
              @update:wait_time="form.wait_time = $event"
              @update:is_free="form.is_free = $event"
              @update:fees_text="form.fees_text = $event"
              @update:fees_url="form.fees_url = $event"
              @update:testimonial="form.testimonial = $event"
              @update:video_embed="form.video_embed = $event"
            />

            <useful-info-tab
              v-if="tabs[2].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @add="form.useful_infos.push($event)"
              @delete="$delete(form.useful_infos, $event)"
              @next="onNext"
              @update:useful_infos_title="form.useful_infos[$event.index].title = $event.value"
              @update:useful_infos_description="form.useful_infos[$event.index].description = $event.value"
              @update:useful_infos_order="form.useful_infos[$event.index].order = $event.value"
            />

            <contact-details-tab
              v-if="tabs[3].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @add="form.social_medias.push($event)"
              @delete="$delete(form.social_medias, $event)"
              @next="onNext"
              @update:contact_name="form.contact_name = $event"
              @update:contact_phone="form.contact_phone = $event"
              @update:contact_email="form.contact_email = $event"
              @update:social_medias_type="form.social_medias[$event.index].type = $event.value"
              @update:social_medias_url="form.social_medias[$event.index].url = $event.value"
            />

            <who-for-tab
              v-if="tabs[4].active"
              :form="form"
              @clear="form.$errors.clear($event)"
              @update:age_group="form.criteria.age_group = $event"
              @update:disability="form.criteria.disability = $event"
              @update:employment="form.criteria.employment = $event"
              @update:gender="form.criteria.gender = $event"
              @update:housing="form.criteria.housing = $event"
              @update:income="form.criteria.income = $event"
              @update:language="form.criteria.language = $event"
              @update:other="form.criteria.other = $event"
            />

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
import WhoForTab from "@/views/services/create/WhoForTab";

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    ContactDetailsTab,
    WhoForTab
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
      ]
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
