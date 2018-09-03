<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>
          <gov-heading size="m">Add service</gov-heading>
          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>

            <!-- Details tab -->
            <template v-if="tabs[0].active">
              <gov-heading size="l">Service details</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>General details about the service. (We use service in the broadcast sense, This could be counciling or weekly yoga classes).</gov-body>
                  <gov-section-break size="l" />

                  <!-- Service name -->
                  <gov-form-group :invalid="form.$errors.has('name')">
                    <gov-label class="govuk-!-font-weight-bold" for="name">
                      Name of service
                    </gov-label>
                    <gov-input
                      v-model="form.name"
                      @input="form.$errors.clear('name')"
                      id="name"
                      name="name"
                      type="text"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('name')"
                      v-text="form.$errors.get('name')"
                      for="name"
                    />
                  </gov-form-group>
                  <!-- /Service name -->

                  <!-- Service URL -->
                  <gov-form-group :invalid="form.$errors.has('url')">
                    <gov-label class="govuk-!-font-weight-bold" for="url">
                      Service website address
                    </gov-label>
                    <gov-hint for="url">
                      or your organisation if you do not have a seperate service website/page
                    </gov-hint>
                    <gov-input
                      v-model="form.url"
                      @input="form.$errors.clear('url')"
                      id="url"
                      name="url"
                      type="url"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('url')"
                      v-text="form.$errors.get('url')"
                      for="url"
                    />
                  </gov-form-group>
                  <!-- /Service URL -->

                  <!-- Service logo -->
                  <gov-form-group :invalid="logoForm.$errors.has('file')">
                    <gov-label class="govuk-!-font-weight-bold" for="logo">
                      Service logo
                    </gov-label>
                    <gov-hint for="logo">
                      please upload a logo of the service, not the organisation.
                    </gov-hint>
                    <gov-file-upload
                      @change="onLogoChange"
                      id="logo"
                      name="logo"
                      accept="image/x-png"
                    />
                    <gov-error-message
                      v-if="logoForm.$errors.has('file')"
                      v-text="logoForm.$errors.get('file')"
                      for="logo"
                    />
                  </gov-form-group>
                  <!-- /Service logo -->

                  <!-- Service intro -->
                  <gov-form-group :invalid="form.$errors.has('intro')">
                    <gov-label class="govuk-!-font-weight-bold" for="intro">
                      Please provide a one-line summary of the service
                    </gov-label>
                    <gov-hint for="intro">
                      This should be a short line or two that summarises what the service offers and will appear below the service name in search results (max 150 characters).
                    </gov-hint>
                    <gov-textarea
                      v-model="form.intro"
                      @input="form.$errors.clear('intro')"
                      id="intro"
                      name="intro"
                      type="text"
                      maxlength="150"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('intro')"
                      v-text="form.$errors.get('intro')"
                      for="intro"
                    />
                  </gov-form-group>
                  <!-- /Service intro -->

                  <!-- Service description -->
                  <gov-form-group :invalid="form.$errors.has('description')">
                    <gov-label class="govuk-!-font-weight-bold" for="description">
                      Service description
                    </gov-label>
                    <gov-hint for="description">
                      Please enter a more detailed description of the service. This will be
                      the main body of text on the page - though it shouldn't be too long.
                      <br/><br/>
                      The description should contain details about accessing the service,
                      that sort of activities happen there, and who should get in touch
                      (max 1600 characters).
                    </gov-hint>
                    <ck-wysiwyg
                      v-model="form.description"
                      @input="form.$errors.clear('description')"
                      id="description"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('description')"
                      v-text="form.$errors.get('description')"
                      for="description"
                    />
                  </gov-form-group>
                  <!-- /Service description -->

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Details tab -->

            <!-- Additional info tab -->
            <template v-if="tabs[1].active">
              <gov-heading size="l">Additional service information</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>Additional information regarding the service, If a question is not relevant to your service please skip it.</gov-body>
                  <gov-section-break size="l" />

                  <!-- Wait time -->
                  <gov-form-group :invalid="form.$errors.has('wait_time')">
                    <gov-label class="govuk-!-font-weight-bold" for="wait_time">
                      Average wait time (if applicable)
                    </gov-label>
                    <gov-hint for="wait_time">
                      General indication as to how long someone may have to wait for an appointment/slot after initial contact has been made, if this is not relevant to your service, or service as a drop-in, please skip this question.
                    </gov-hint>
                    <gov-select
                      v-model="form.wait_time"
                      @input="form.$error.clear('wait_time')"
                      id="wait_time"
                      name="wait_time"
                      :options="waitTimeOptions"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('wait_time')"
                      v-text="form.$errors.get('wait_time')"
                      for="wait_time"
                    />
                  </gov-form-group>
                  <!-- /Wait time -->

                  <!-- Is free -->
                  <gov-form-group :invalid="form.$errors.has('is_free')">
                    <gov-radios>
                      <gov-label class="govuk-!-font-weight-bold" for="is_free">
                        Is the service free
                      </gov-label>
                      <gov-hint for="is_free">
                        Indicates if the service is free or not (used for filtering on search)
                      </gov-hint>
                      <gov-radio
                        v-model="form.is_free"
                        @input="form.$errors.clear('is_free')"
                        id="is_free_yes"
                        name="is_free"
                        label="Yes - The service is free"
                        :value="true"
                      />
                      <gov-radio
                        v-model="form.is_free"
                        @input="form.$errors.clear('is_free')"
                        id="is_free_no"
                        name="is_free"
                        label="No - there are elements of this service that must be paid for"
                        :value="false"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('is_free')"
                        v-text="form.$errors.get('is_free')"
                        for="is_free"
                      />
                    </gov-radios>
                  </gov-form-group>
                  <!-- /Is free -->

                  <!-- Extra fee info -->
                  <gov-inset-text v-if="form.is_free === false">
                    <!-- Fees text -->
                    <gov-form-group :invalid="form.$errors.has('fees_text')">
                      <gov-label class="govuk-!-font-weight-bold" for="fees_text">
                        How much does it cost? (if applicable)
                      </gov-label>
                      <gov-hint for="fees_text">
                        Please indicate the basic cost of the service. If there are multiple price
                        points, please provide an indicative range (eg. "5-10 per session")
                        (max 75 characters).
                      </gov-hint>
                      <gov-input
                        v-model="form.fees_text"
                        @input="form.$errors.clear('fees_text')"
                        id="fees_text"
                        name="fees_text"
                        type="text"
                        maxlength="75"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('fees_text')"
                        v-text="form.$errors.get('fees_text')"
                        for="fees_text"
                      />
                    </gov-form-group>
                    <!-- /Fees text -->

                    <!-- Fees URL -->
                    <gov-form-group :invalid="form.$errors.has('fees_url')">
                      <gov-label class="govuk-!-font-weight-bold" for="fees_url">
                        Please provide a link to full pricing table (if applicable)
                      </gov-label>
                      <gov-input
                        v-model="form.fees_url"
                        @input="form.$errors.clear('fees_url')"
                        id="fees_url"
                        name="fees_url"
                        type="url"
                      />
                      <gov-error-message
                        v-if="form.$errors.has('fees_url')"
                        v-text="form.$errors.get('fees_url')"
                        for="fees_url"
                      />
                    </gov-form-group>
                    <!-- /Fees URL -->
                  </gov-inset-text>
                  <!-- /Extra fee info -->

                  <!-- Testimonial -->
                  <gov-form-group :invalid="form.$errors.has('testimonial')">
                    <gov-label class="govuk-!-font-weight-bold" for="testimonial">
                      Please provide a user quote to display on your service page
                    </gov-label>
                    <gov-hint for="testimonial">
                      Quote from a user of the service, including their first name. If you
                      don't have a quote to use, please skip this question - you can
                      always add one later on (max 150 characters).
                    </gov-hint>
                    <gov-textarea
                      v-model="form.testimonial"
                      @input="form.$errors.clear('testimonial')"
                      id="testimonial"
                      name="testimonial"
                      maxlength="150"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('testimonial')"
                      v-text="form.$errors.get('testimonial')"
                      for="testimonial"
                    />
                  </gov-form-group>
                  <!-- /Testimonial -->

                  <!-- Video embed -->
                  <gov-form-group :invalid="form.$errors.has('video_embed')">
                    <gov-label class="govuk-!-font-weight-bold" for="video_embed">
                      If you have one, please provide a link to a video that describes your service
                    </gov-label>
                    <gov-hint for="video_embed">
                      The video should be a short (less than 5 min) description of what
                      the service is, and how it can be accessed. Can be a link
                      to YouTube or Vimeo.
                    </gov-hint>
                    <gov-input
                      v-model="form.video_embed"
                      @input="form.$errors.clear('video_embed')"
                      id="video_embed"
                      name="video_embed"
                      type="url"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('video_embed')"
                      v-text="form.$errors.get('video_embed')"
                      for="video_embed"
                    />
                  </gov-form-group>
                  <!-- /Video embed -->

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Additional info tab -->

          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";

export default {
  name: "CreateService",
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
        referral_method: "internal",
        referral_button_text: "Make referral",
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
      waitTimeOptions: [
        { text: "Not applicable for this service", value: null },
        { text: "One week", value: "one_week" },
        { text: "Two weeks", value: "two_weeks" },
        { text: "Three weeks", value: "three_weeks" },
        { text: "One month", value: "month" },
        { text: "Longer than a month", value: "longer" }
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
    onLogoChange(contents) {
      this.logoForm.$errors.clear('file');
      this.logoForm.file = contents;
    },
    scrollToTop() {
      document.getElementById('main-content').scrollIntoView();
    }
  },
  watch: {
    "form.is_free"(newIsFree) {
      if (newIsFree) {
        return;
      }

      this.form.fees_text = "";
      this.form.fees_url = "";
    }
  }
};
</script>
