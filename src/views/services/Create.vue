<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'services-index' }">Back to services</gov-back-link>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="full">
          <gov-heading size="xl">Services</gov-heading>
          <gov-heading size="m">Add service</gov-heading>
          <gov-tabs @tab-changed="onTabChange" :tabs="tabs" no-router>
            <gov-body v-for="(tab, index) in tabs" :key="index" v-show="tab.active">
              {{ tab.heading }}
            </gov-body>
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
        name: ""
      }),
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
    }
  }
};
</script>
