<template>
  <div class="govuk-tabs">
    <h2 class="govuk-tabs__title">{{ title }}</h2>
    <ul class="govuk-tabs__list">
      <li v-for="(tab, index) in tabs" :key="index" class="govuk-tabs__list-item">
        <a
          @click="onTabClick(tab, index)"
          v-if="noRouter"
          class="govuk-tabs__tab"
          :class="{ 'govuk-tabs__tab--active': tab.active }"
          href="javascript:;"
          v-text="tab.heading"
        />
        <router-link
          v-else
          :to="tab.to"
          class="govuk-tabs__tab"
          active-class="govuk-tabs__tab--active"
          v-text="tab.heading"
          :exact="tab.exact || true"
        />
      </li>
    </ul>
    <gov-tab-panel>
      <slot />
    </gov-tab-panel>
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
    },
    noRouter: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onTabClick(tab, index) {
      this.$emit("tab-changed", { index, tab });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.govuk-tabs {
  .govuk-tabs__tab {
    &--active {
      @extend .govuk-tabs__tab[aria-selected="true"];
    }
  }
}
</style>
