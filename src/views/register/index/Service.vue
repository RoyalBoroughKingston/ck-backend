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
              :service="form.service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </details-tab>

            <additional-info-tab
              v-if="isTabActive('additional-info')"
              :service="form.service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </additional-info-tab>

            <useful-info-tab
              v-if="isTabActive('useful-info')"
              :service="form.service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </useful-info-tab>

            <who-for-tab
              v-if="isTabActive('who-for')"
              :service="form.service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button @click="onNext" start>
                Next
              </gov-button>
            </who-for-tab>

            <description-tab
              v-if="isTabActive('description')"
              :service="form.service"
              :errors="errors"
              @input="onInput($event.field, $event.value)"
            >
              <gov-button v-if="form.$submitting" disabled type="submit">
                Submitting...
              </gov-button>

              <gov-button v-else @click="$emit('submit')" type="submit">
                Submit
              </gov-button>

              <ck-submit-error v-if="errors.any()" />
            </description-tab>
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

export default {
  components: {
    DetailsTab,
    DescriptionTab,
    AdditionalInfoTab,
    UsefulInfoTab,
    WhoForTab
  },

  props: {
    form: {
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
        { id: "description", heading: "Description", active: false }
      ]
    }
  },

  methods: {
    onInput(field, value) {
      this.$emit('input', Object.assign(this.form, {
        service: {
          ...this.form.service,
          [field]: value
        }
      }));
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
