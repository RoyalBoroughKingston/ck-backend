<template>
  <div class="govuk-tabs">
    <h2 class="govuk-tabs__title">{{ title }}</h2>
    <ul class="govuk-tabs__list" :class="{ 'govuk-tabs__list--bar': bar }">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="govuk-tabs__list-item"
      >
        <a
          @click="onTabClick(tab, index)"
          v-if="noRouter"
          class="govuk-tabs__tab"
          :class="{
            'govuk-tabs__tab--active': tab.active,
            'govuk-tabs__tab--bar': bar,
          }"
          href="javascript:;"
          v-text="tab.heading"
        />
        <router-link
          v-else
          :to="tab.to"
          class="govuk-tabs__tab"
          :class="{ 'govuk-tabs__tab--bar': bar }"
          active-class="govuk-tabs__tab--active"
          v-text="tab.heading"
          exact
        />
      </li>
    </ul>
    <gov-tab-panel v-if="panel">
      <slot />
    </gov-tab-panel>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'GovTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: 'Contents',
    },
    noRouter: {
      type: Boolean,
      required: false,
      default: false,
    },
    bar: {
      type: Boolean,
      required: false,
      default: false,
    },
    panel: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    onTabClick(tab, index) {
      this.$emit('tab-changed', { index, tab })
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/app.scss';

.govuk-tabs {
  .govuk-tabs__list {
    @media only screen and (min-width: map-get($govuk-breakpoints, tablet)) {
      &--bar {
        background: govuk-colour('mid-grey');
        border: none !important;
      }
    }
  }

  .govuk-tabs__tab {
    &--active {
      @extend .govuk-tabs__tab, [aria-selected='true'] !optional;
    }

    @media only screen and (min-width: map-get($govuk-breakpoints, tablet)) {
      &--bar {
        color: $govuk-link-colour !important;
        font-weight: bold;
        margin: 0 5px 0 0 !important;
        padding: 10px 20px !important;
      }

      &.govuk-tabs__tab--active.govuk-tabs__tab--bar {
        color: $govuk-link-colour;
        border-color: $govuk-link-colour;
        border-width: 0 0 5px;
        border-style: solid;
        background: govuk-colour('mid-grey');
        padding-bottom: 5px !important;
      }
    }
  }
}
</style>
