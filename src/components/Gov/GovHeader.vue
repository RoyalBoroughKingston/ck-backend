<template>
  <header class="govuk-header" role="banner" data-module="header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <router-link
          :to="{ name: 'dashboard' }"
          class="govuk-header__link govuk-header__link--homepage"
        >
          <span class="govuk-header__logotype">
            <img
              src="@/assets/logo-white.png"
              class="govuk-header__logotype-crown"
            />
          </span>
        </router-link>
      </div>
      <div class="govuk-header__content">
        <div class="ck-header__main">
          <router-link
            :to="{ name: 'dashboard' }"
            class="govuk-header__link govuk-header__link--service-name"
          >
            {{ serviceName }}
          </router-link>

          <div v-if="auth.isLoggedIn && auth.user">
            <router-link
              :to="{ name: 'users-show', params: { user: auth.user.id } }"
              class="govuk-header__link"
              >{{ auth.user.first_name }} {{ auth.user.last_name }}</router-link
            >
            &nbsp;
            <router-link :to="{ name: 'logout' }" class="govuk-header__link"
              >Logout</router-link
            >
          </div>
        </div>
        <button
          @click="onToggleMenu"
          role="button"
          class="govuk-header__menu-button js-header-toggle"
          aria-controls="navigation"
          aria-label="Show or hide Top Level Navigation"
        >
          Menu
        </button>
        <nav>
          <ul
            id="navigation"
            class="govuk-header__navigation"
            :class="{ 'govuk-header__navigation--open': navExpanded }"
            aria-label="Top Level Navigation"
          >
            <router-link
              v-for="(item, key) in navigation"
              :key="key"
              v-if="item.to && !item.hide"
              tag="li"
              class="govuk-header__navigation-item"
              active-class="govuk-header__navigation-item--active"
              :to="item.to"
            >
              <a class="govuk-header__link" :href="item.to">
                {{ item.text }}
              </a>
            </router-link>
            <li v-else-if="item.href" class="govuk-header__navigation-item">
              <a class="govuk-header__link" :href="item.href">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "GovHeader",
  props: {
    serviceName: {
      type: String,
      required: true,
    },
    navigation: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      navExpanded: false,
    };
  },
  methods: {
    itemActiveClass(item) {
      return item.active ? "govuk-header__navigation-item--active" : null;
    },
    onToggleMenu() {
      this.navExpanded = !this.navExpanded;
    },
  },
};
</script>

<style lang="scss">
.ck-header__main {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
