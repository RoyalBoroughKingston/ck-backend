<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-error-summary v-if="Object.keys(errors).length > 0" title="Errors">
            <gov-list>
              <li v-for="(error, index) in errors" :key="index" v-text="error[0]"/>
            </gov-list>
          </gov-error-summary>

          <gov-heading size="xl">Services</gov-heading>
          <gov-heading size="m">Add service</gov-heading>
          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>

            <details-tab
              v-if="tabs[0].active"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              :errors="form.$errors"
              :name.sync="form.name"
              :slug.sync="form.slug"
              :organisation_id.sync="form.organisation_id"
              :url.sync="form.url"
              :logo.sync="form.logo"
              :intro.sync="form.intro"
              :description.sync="form.description"
            />

            <additional-info-tab
              v-if="tabs[1].active"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              :errors="form.$errors"
              :wait_time.sync="form.wait_time"
              :is_free.sync="form.is_free"
              :fees_text.sync="form.fees_text"
              :fees_url.sync="form.fees_url"
              :testimonial.sync="form.testimonial"
              :video_embed.sync="form.video_embed"
            />

            <useful-info-tab
              v-if="tabs[2].active"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              :errors="form.$errors"
              :useful_infos.sync="form.useful_infos"
            />

            <contact-details-tab
              v-if="tabs[3].active"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              :errors="form.$errors"
              :contact_name.sync="form.contact_name"
              :contact_phone.sync="form.contact_phone"
              :contact_email.sync="form.contact_email"
              :social_medias.sync="form.social_medias"
            />

            <who-for-tab
              v-if="tabs[4].active"
              :form="form"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              @update:age_group="form.criteria.age_group = $event"
              @update:disability="form.criteria.disability = $event"
              @update:employment="form.criteria.employment = $event"
              @update:gender="form.criteria.gender = $event"
              @update:housing="form.criteria.housing = $event"
              @update:income="form.criteria.income = $event"
              @update:language="form.criteria.language = $event"
              @update:other="form.criteria.other = $event"
            />

            <location-tab
              v-if="tabs[5].active"
              :forms="serviceLocationForms"
              @clear-service-location="serviceLocationForms[$event.index].$errors.clear($event.value); errors = {}"
              @clear-location="serviceLocationForms[$event.index].location.$errors.clear($event.value); errors = {}"
              @add="serviceLocationForms.push($event)"
              @delete="$delete(serviceLocationForms, $event)"
              @add-regular-opening-hour="serviceLocationForms[$event.index].regular_opening_hours.push($event.value)"
              @delete-regular-opening-hour="$delete(serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours, $event.openingHourIndex)"
              @add-holiday-opening-hour="serviceLocationForms[$event.index].holiday_opening_hours.push($event.value)"
              @delete-holiday-opening-hour="$delete(serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours, $event.openingHourIndex)"
              @next="onNext"
              @update:location_type="serviceLocationForms[$event.index].location_type = $event.value"
              @update:location_id="serviceLocationForms[$event.index].location_id = $event.value"
              @update:address_line_1="serviceLocationForms[$event.index].location.address_line_1 = $event.value"
              @update:address_line_2="serviceLocationForms[$event.index].location.address_line_2 = $event.value"
              @update:address_line_3="serviceLocationForms[$event.index].location.address_line_3 = $event.value"
              @update:city="serviceLocationForms[$event.index].location.city = $event.value"
              @update:county="serviceLocationForms[$event.index].location.county = $event.value"
              @update:postcode="serviceLocationForms[$event.index].location.postcode = $event.value"
              @update:country="serviceLocationForms[$event.index].location.country = $event.value"
              @update:has_wheelchair_access="serviceLocationForms[$event.index].location.has_wheelchair_access = $event.value"
              @update:has_induction_loop="serviceLocationForms[$event.index].location.has_induction_loop = $event.value"
              @update:regular_opening_hours_frequency="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].frequency = $event.value"
              @update:regular_opening_hours_weekday="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].weekday = $event.value"
              @update:regular_opening_hours_day_of_month="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].day_of_month = $event.value"
              @update:regular_opening_hours_opens_at="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].opens_at = $event.value"
              @update:regular_opening_hours_closes_at="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].closes_at = $event.value"
              @update:regular_opening_hours_occurrence_of_month="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].occurrence_of_month = $event.value"
              @update:regular_opening_hours_starts_at="serviceLocationForms[$event.serviceLocationIndex].regular_opening_hours[$event.openingHourIndex].starts_at = $event.value"
              @update:holiday_opening_hours_is_closed="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].is_closed = $event.value"
              @update:holiday_opening_hours_starts_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].starts_at = $event.value"
              @update:holiday_opening_hours_ends_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].ends_at = $event.value"
              @update:holiday_opening_hours_opens_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].opens_at = $event.value"
              @update:holiday_opening_hours_closes_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].closes_at = $event.value"
            />

            <taxonomies-tab
              v-if="tabs[6].active"
              :form="form"
              @clear="form.$errors.clear($event); errors = {}"
              @next="onNext"
              @input="form.category_taxonomies = $event"
            />

            <referral-tab
              v-if="tabs[7].active"
              :form="form"
              @clear="form.$errors.clear($event); errors = {}"
              @submit="onSubmit"
              @update:show_referral_disclaimer="form.show_referral_disclaimer = $event"
              @update:referral_method="form.referral_method = $event"
              @update:referral_button_text="form.referral_button_text = $event"
              @update:referral_email="form.referral_email = $event"
              @update:referral_url="form.referral_url = $event"
            />

          </gov-tabs>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import DetailsTab from "@/views/services/create/tabs/DetailsTab";
import AdditionalInfoTab from "@/views/services/create/tabs/AdditionalInfoTab";
import UsefulInfoTab from "@/views/services/create/tabs/UsefulInfoTab";
import ContactDetailsTab from "@/views/services/create/tabs/ContactDetailsTab";
import WhoForTab from "@/views/services/create/tabs/WhoForTab";
import LocationTab from "@/views/services/create/tabs/LocationTab";
import ReferralTab from "@/views/services/create/tabs/ReferralTab";
import TaxonomiesTab from "@/views/services/create/tabs/TaxonomiesTab";

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    ContactDetailsTab,
    WhoForTab,
    LocationTab,
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
        category_taxonomies: [],
        logo: null
      }),
      serviceLocationForms: [],
      tabs: [
        { heading: "Details", active: true },
        { heading: "Additional info", active: false },
        { heading: "Useful info", active: false },
        { heading: "Contact info", active: false },
        { heading: "Who is it for?", active: false },
        { heading: "Locations", active: false },
        { heading: "Taxonomies", active: false },
        { heading: "Referral", active: false }
      ],
      submitting: false,
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      this.submitting = true;

      try {
        /**
         * Step 1: Save the locations.
         */

        // Loop through each service location form.
        for (let serviceLocationForm of this.serviceLocationForms) {
          if (serviceLocationForm.location_type !== "new") {
            continue;
          }

          // Save each new location.
          const { data } = await serviceLocationForm.location.post(
            "/locations"
          );

          // Append the location to the cache, set the location ID, and remove the location object/form.
          this.$root.$emit("location-created", data);
          serviceLocationForm.location_id = data.id;
          serviceLocationForm.location_type = "existing";
        }

        /**
         * Step 2: Save the service.
         */

        // Save the service and set the ID.
        if (this.form.id === null) {
          const { data } = await this.form.post("/services");
          this.form.id = data.id;

          for (let serviceLocationForm of this.serviceLocationForms) {
            serviceLocationForm.service_id = this.form.id;
          }
        }

        /**
         * Step 3: Save the service locations.
         */

        // Loop through each service location form and save them.
        for (let serviceLocationForm of this.serviceLocationForms) {
          if (serviceLocationForm.id !== null) {
            continue;
          }

          const { data } = await serviceLocationForm.post("/service-locations");
          serviceLocationForm.id = data.id;
        }

        // Forward the user to the newly created service page.
        this.$router.push({
          name: "services-show",
          params: { service: this.form.id }
        });
      } catch (error) {
        this.submitting = false;
        this.errors = error.errors;
      }
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
