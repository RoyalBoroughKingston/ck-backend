<template>
  <div class="govuk-tabs">
    <h2 class="govuk-tabs__title">{{ title }}</h2>
    <ul class="govuk-tabs__list">
      <li v-for="(tab, index) in tabs" :key="index" class="govuk-tabs__list-item">
        <router-link
          :to="tab.to"
          class="govuk-tabs__tab govuk-tabs__tab--no-visited-state"
          active-class="govuk-tabs__tab--active"
          v-text="tab.heading"
          exact
        />
      </li>
    </ul>
    <section class="govuk-tabs__panel">
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  name: "GovTabs",
  props: {
    tabs: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "Contents"
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.govuk-tabs__tab {
  &.govuk-tabs__tab--active {
    @extend .govuk-tabs__tab[aria-selected= "true"];
  }

  &.govuk-tabs__tab--no-visited-state {
    @extend .govuk-link--no-visited-state;
  }
}
</style>
