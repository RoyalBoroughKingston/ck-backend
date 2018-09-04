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
              v-show="tabs[0].active"
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
              v-show="tabs[1].active"
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
              v-show="tabs[2].active"
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
              v-show="tabs[3].active"
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
              v-show="tabs[4].active"
              :form="form"
              @clear="form.$errors.clear($event)"
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
              v-show="tabs[5].active"
              :forms="serviceLocationForms"
              @clear-service-location="serviceLocationForms[$event.index].$errors.clear($event.value)"
              @clear-location="serviceLocationForms[$event.index].$errors.clear($event.value)"
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
              @update:holiday_opening_hours_opens_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].opens_at = $event.value"
              @update:holiday_opening_hours_closes_at="serviceLocationForms[$event.serviceLocationIndex].holiday_opening_hours[$event.openingHourIndex].closes_at = $event.value"
            />

            <referral-tab
              v-show="tabs[6].active"
              :form="form"
              @clear="form.$errors.clear($event)"
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

export default {
  name: "CreateService",
  components: {
    DetailsTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    ContactDetailsTab,
    WhoForTab,
    LocationTab,
    ReferralTab
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
      serviceLocationForms: [],
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
  }
};
</script>
