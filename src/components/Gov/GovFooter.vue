<template>
    <footer class="govuk-footer" role="contentinfo">
        <div class="govuk-width-container" :class="containerClasses">

            <template v-if="navigation">
            <div class="govuk-footer__navigation">
                <div v-for="(item, key) in navigation" :key="key" class="govuk-footer__section">
                    <h2 class="govuk-footer__heading govuk-heading-m">{{ item.title }}</h2>
                    <ul class="govuk-footer__list" :class="listClasses(item)">
                        <li v-for="(item, key) in item.items" v-if="item.href && item.text" :key="key" class="govuk-footer__list-item">
                            <a class="govuk-footer__link" :href="item.href">
                                {{ item.text }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <hr class="govuk-footer__section-break">
            </template>

            <div class="govuk-footer__meta">
                <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
                    <template v-if="meta && meta.items">
                        <h2 class="govuk-visually-hidden">Support links</h2>
                        <ul class="govuk-footer__inline-list">
                            <li v-for="(item, key) in meta.items" :key="key" class="govuk-footer__inline-list-item">
                                <a class="govuk-footer__link" :href="item.href">
                                    {{ item.text }}
                                </a>
                            </li>
                        </ul>
                    </template>

                    <span class="govuk-footer__licence-description">
                        For any feedback or technical queries, please email <gov-link href="mailto:info@connectedkingston.uk">info@connectedkingston.uk</gov-link>
                    </span>
                </div>
                <div class="govuk-footer__meta-item">
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: "GovFooter",
  props: {
    containerClasses: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    navigation: {
      type: Array,
      required: false
    },
    meta: {
      type: Object,
      required: false
    }
  },
  methods: {
    listClasses(item) {
      return item.items ? `govuk-footer__list--columns-${item.columns}` : null;
    }
  }
};
</script>
