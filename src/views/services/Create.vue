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

            <!-- Useful info tab -->
            <template v-if="tabs[2].active">
              <gov-heading size="l">Useful information</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>This is a space to add really useful information about your service. This could be tips on getting there, what you need to bring or anything else. Please select a title from the drop downs and add details below</gov-body>
                  <gov-body>If you can't think of anything, or have already included it elsewhere you can <gov-link @click="onNext">skip this section</gov-link></gov-body>
                  <gov-section-break size="l" />

                  <!-- Useful info -->
                  <gov-inset-text v-for="(usefulInfo, index) in form.useful_infos" :key="usefulInfo.index">
                    <!-- Useful info title -->
                    <gov-form-group :invalid="form.$errors.has(`useful_infos.${index}.title`)">
                      <gov-label class="govuk-!-font-weight-bold" :for="`useful_infos.${index}.title`">
                        Pick a title from the dropdown to describe the additional information below.
                      </gov-label>
                      <gov-hint :for="`useful_infos.${index}.title`">
                        Title of the helpful piece of information below
                      </gov-hint>
                      <gov-select
                        v-model="form.useful_infos[index].title"
                        @input="form.$errors.clear(`useful_infos.${index}.title`)"
                        :id="`useful_infos.${index}.title`"
                        :name="`useful_infos.${index}.title`"
                        :options="usefulInfoTitleOptions"
                      />
                      <gov-error-message
                        v-if="form.$errors.has(`useful_infos.${index}.title`)"
                        v-text="form.$errors.get(`useful_infos.${index}.title`)"
                        :for="`useful_infos.${index}.title`"
                      />
                    </gov-form-group>
                    <!-- /Useful info title -->

                    <!-- Useful info description -->
                    <gov-form-group :invalid="form.$errors.has(`useful_infos.${index}.description`)">
                      <gov-hint :for="`useful_infos.${index}.description`">
                        Space for service to add any helpful bits of information
                        relating to the title above eg. "There is no free parking on
                        site, however and display is available on [road]" (max.
                        150 characters)
                      </gov-hint>
                      <gov-textarea
                        v-model="form.useful_infos[index].description"
                        @input="form.$errors.clear(`useful_infos.${index}.description`)"
                        :id="`useful_infos.${index}.description`"
                        :name="`useful_infos.${index}.description`"
                      />
                      <gov-error-message
                        v-if="form.$errors.has(`useful_infos.${index}.description`)"
                        v-text="form.$errors.get(`useful_infos.${index}.description`)"
                        :for="`useful_infos.${index}.description`"
                      />
                    </gov-form-group>
                    <!-- /Useful info description -->

                    <gov-button @click="onDeleteUsefulInfo(index)" error>Delete</gov-button>
                  </gov-inset-text>
                  <!-- /Useful info -->

                  <div>
                    <gov-button @click="onAddUsefulInfo">
                      <template v-if="form.useful_infos.length === 0">Add useful info</template>
                      <template v-else>Add another</template>
                    </gov-button>
                  </div>

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Useful info tab -->

            <!-- Contact details tab -->
            <template v-if="tabs[3].active">
              <gov-heading size="l">Contact details</gov-heading>
              <gov-grid-row>
                <gov-grid-column width="one-half">
                  <gov-body>A place to put in the public facing contact details of your service. These will be displayed on the service page on the website.</gov-body>
                  <gov-section-break size="l" />

                  <!-- Contact name -->
                  <gov-form-group :invalid="form.$errors.has('contact_name')">
                    <gov-label class="govuk-!-font-weight-bold" for="contact_name">
                      Contact name
                    </gov-label>
                    <gov-hint for="contact_name">
                      Please provide the contact name eg. Jane Bloggs or a function e.g. Enquiries
                    </gov-hint>
                    <gov-input
                      v-model="form.contact_name"
                      @input="form.$errors.clear('contact_name')"
                      id="contact_name"
                      name="contact_name"
                      type="text"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('contact_name')"
                      v-text="form.$errors.get('contact_name')"
                      for="contact_name"
                    />
                  </gov-form-group>
                  <!-- /Contact name -->

                  <!-- Contact phone -->
                  <gov-form-group :invalid="form.$errors.has('contact_phone')">
                    <gov-label class="govuk-!-font-weight-bold" for="contact_phone">
                      Contact phone number
                    </gov-label>
                    <gov-hint for="contact_phone">
                      Please provide a public facing phone number
                    </gov-hint>
                    <gov-input
                      v-model="form.contact_phone"
                      @input="form.$errors.clear('contact_phone')"
                      id="contact_phone"
                      name="contact_phone"
                      type="tel"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('contact_phone')"
                      v-text="form.$errors.get('contact_phone')"
                      for="contact_phone"
                    />
                  </gov-form-group>
                  <!-- /Contact phone -->

                  <!-- Contact email -->
                  <gov-form-group :invalid="form.$errors.has('contact_email')">
                    <gov-label class="govuk-!-font-weight-bold" for="contact_email">
                      Public email address
                    </gov-label>
                    <gov-hint for="contact_email">
                      Please provide a public facing email address
                    </gov-hint>
                    <gov-input
                      v-model="form.contact_email"
                      @input="form.$errors.clear('contact_email')"
                      id="contact_email"
                      name="contact_email"
                      type="email"
                    />
                    <gov-error-message
                      v-if="form.$errors.has('contact_email')"
                      v-text="form.$errors.get('contact_email')"
                      for="contact_email"
                    />
                  </gov-form-group>
                  <!-- /Contact email -->

                  <gov-section-break size="l" />

                  <gov-heading size="m">Social media links</gov-heading>

                  <!-- Social medias -->
                  <gov-inset-text v-for="(socialMedia, index) in form.social_medias" :key="socialMedia.index">
                    <!-- Social media type -->
                    <gov-form-group :invalid="form.$errors.has(`social_media.${index}.type`)">
                      <gov-label class="govuk-!-font-weight-bold" :for="`social_medias.${index}.type`">
                        Social media platform
                      </gov-label>
                      <gov-select
                        v-model="form.social_medias[index].type"
                        @input="form.$errors.clear(`social_medias.${index}.type`)"
                        :id="`social_medias.${index}.type`"
                        :name="`social_medias.${index}.type`"
                        :options="socialMediaTypeOptions"
                      />
                      <gov-error-message
                        v-if="form.$errors.has(`social_medias.${index}.type`)"
                        v-text="form.$errors.get(`social_medias.${index}.type`)"
                        :for="`social_medias.${index}.type`"
                      />
                    </gov-form-group>
                    <!-- /Social media type -->

                    <!-- Social media URL -->
                    <gov-form-group :invalid="form.$errors.has(`social_medias.${index}.url`)">
                      <gov-label class="govuk-!-font-weight-bold" :for="`social_medias.${index}.url`">
                        Enter url of your social page
                      </gov-label>
                      <gov-input
                        v-model="form.social_medias[index].url"
                        @input="form.$errors.clear(`social_medias.${index}.url`)"
                        :id="`social_medias.${index}.url`"
                        :name="`social_medias.${index}.url`"
                        type="url"
                      />
                      <gov-error-message
                        v-if="form.$errors.has(`social_medias.${index}.url`)"
                        v-text="form.$errors.get(`social_medias.${index}.url`)"
                        :for="`social_medias.${index}.url`"
                      />
                    </gov-form-group>
                    <!-- /Social media URL -->

                    <gov-button @click="onDeleteSocialMedia(index)" error>Delete</gov-button>
                  </gov-inset-text>
                  <!-- /Social midias -->

                  <div>
                    <gov-button @click="onAddSocialMedia">
                      <template v-if="form.social_medias.length === 0">Add social media</template>
                      <template v-else>Add another</template>
                    </gov-button>
                  </div>

                  <gov-button @click="onNext" start>Next</gov-button>
                </gov-grid-column>
              </gov-grid-row>
            </template>
            <!-- /Contact details tab -->

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
                  <p>TODO</p>

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
import CriteriaInput from "@/views/services/create/CriteriaInput";

export default {
  name: "CreateService",
  components: { CriteriaInput },
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
      usefulInfoTitleOptions: [
        { text: "Please select", value: "", disabled: true },
        { text: "Getting here", value: "Getting here" },
        { text: "Signing up", value: "Signing up" },
        { text: "Meeting up", value: "Meeting up" },
        { text: "What to wear", value: "What to wear" },
        { text: "What to bring", value: "What to bring" },
        { text: "How to get here", value: "How to get here" },
        { text: "Parking", value: "Parking" },
        { text: "Keeping updated", value: "Keeping updated" },
        { text: "Additional information", value: "Additional information" }
      ],
      socialMediaTypeOptions: [
        { text: "Please select", value: "", disabled: true },
        { text: "Twitter", value: "twitter" },
        { text: "Facebook", value: "facebook" },
        { text: "Instagram", value: "instagram" },
        { text: "YouTube", value: "youtube" },
        { text: "Other", value: "other" }
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
      usefulInfosIndex: 1,
      socialMediasIndex: 1,
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
    onLogoChange(contents) {
      this.logoForm.$errors.clear('file');
      this.logoForm.file = contents;
    },
    scrollToTop() {
      document.getElementById('main-content').scrollIntoView();
    },
    onAddUsefulInfo() {
      this.form.useful_infos.push({
        title: "",
        description: "",
        order: (this.form.useful_infos.length + 1),
        index: this.usefulInfosIndex
      });

      this.usefulInfosIndex++;
    },
    onDeleteUsefulInfo(deleteIndex) {
      this.form.$errors.clear(`useful_infos.${deleteIndex}.title`);
      this.form.$errors.clear(`useful_infos.${deleteIndex}.description`);
      this.form.$errors.clear(`useful_infos.${deleteIndex}.order`);
      this.$delete(this.form.useful_infos, deleteIndex);

      // Also decrement the order for the other useful infos.
      this.form.useful_infos.forEach((usefulInfo, index) => {
        if (index < deleteIndex) {
          return;
        }

        usefulInfo.order--;
      });
    },
    onAddSocialMedia() {
      this.form.social_medias.push({
        type: null,
        url: "",
        index: this.socialMediasIndex
      });

      this.socialMediasIndex++;
    },
    onDeleteSocialMedia(deleteIndex) {
      this.form.$errors.clear(`social_medias.${deleteIndex}.type`);
      this.form.$errors.clear(`social_medias.${deleteIndex}.url`);
      this.$delete(this.form.social_medias, deleteIndex);
    }
  },
  watch: {
    "form.is_free"(newIsFree) {
      if (newIsFree) {
        return;
      }

      this.form.fees_text = "";
      this.form.fees_url = "";
    },
    "form.useful_infos": {
      handler(usefulInfos) {
        this.usefulInfoTitleOptions.forEach((usefulInfoTitleOption, index) => {
          if (usefulInfoTitleOption.value === "") {
            return;
          }

          const hasBeenUsed = usefulInfos.find(usefulInfo => (usefulInfo.title === usefulInfoTitleOption.value)) !== undefined;
          const newOption = { ...usefulInfoTitleOption, disabled: hasBeenUsed };
          this.$set(this.usefulInfoTitleOptions, index, newOption);
        });
      },
      deep: true
    },
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
    }
  }
};
</script>
