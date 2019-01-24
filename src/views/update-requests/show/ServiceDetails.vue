<template>
  <ck-loader v-if="loading"/>
  <div v-else>
    <gov-body>
      For service <gov-link :to="{ name: 'services-show', params: { service: original.id } }" v-text="original.name"/>.
    </gov-body>

    <gov-table>
      <template slot="body">

        <gov-table-row>
          <gov-table-header scope="column"></gov-table-header>
          <gov-table-header scope="column">From</gov-table-header>
          <gov-table-header scope="column">To</gov-table-header>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('url')">
          <gov-table-header top scope="row">URL</gov-table-header>
          <gov-table-cell break>{{ original.url }}</gov-table-cell>
          <gov-table-cell break>{{ service.url }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('name')">
          <gov-table-header top scope="row">Name</gov-table-header>
          <gov-table-cell>{{ original.name }}</gov-table-cell>
          <gov-table-cell>{{ service.name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('slug')">
          <gov-table-header top scope="row">Slug</gov-table-header>
          <gov-table-cell>{{ original.slug }}</gov-table-cell>
          <gov-table-cell>{{ service.slug }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('intro')">
          <gov-table-header top scope="row">Intro</gov-table-header>
          <gov-table-cell>{{ original.intro }}</gov-table-cell>
          <gov-table-cell>{{ service.intro }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('status')">
          <gov-table-header top scope="row">Status</gov-table-header>
          <gov-table-cell>{{ original.status | status }}</gov-table-cell>
          <gov-table-cell>{{ service.status | status }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('is_free')">
          <gov-table-header top scope="row">Is free</gov-table-header>
          <gov-table-cell>{{ original.is_free | isFree }}</gov-table-cell>
          <gov-table-cell>{{ service.is_free | isFree }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('criteria')">
          <gov-table-header top scope="row">Criteria</gov-table-header>
          <gov-table-cell>
            <gov-list>
              <li v-if="original.criteria.hasOwnProperty('age_group')">
                <span class="govuk-!-font-weight-bold">Age group:</span> {{ original.criteria.age_group }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('disability')">
                <span class="govuk-!-font-weight-bold">Disability:</span> {{ original.criteria.disability }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('employment')">
                <span class="govuk-!-font-weight-bold">Employment:</span> {{ original.criteria.employment }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('gender')">
                <span class="govuk-!-font-weight-bold">Gender:</span> {{ original.criteria.gender }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('housing')">
                <span class="govuk-!-font-weight-bold">Housing:</span> {{ original.criteria.housing }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('income')">
                <span class="govuk-!-font-weight-bold">Income:</span> {{ original.criteria.income }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('language')">
                <span class="govuk-!-font-weight-bold">Language:</span> {{ original.criteria.language }}
              </li>
              <li v-if="original.criteria.hasOwnProperty('other')">
                <span class="govuk-!-font-weight-bold">Other:</span> {{ original.criteria.other }}
              </li>
            </gov-list>
          </gov-table-cell>
          <gov-table-cell>
            <gov-list>
              <li v-if="service.criteria.hasOwnProperty('age_group')">
                <span class="govuk-!-font-weight-bold">Age group:</span> {{ service.criteria.age_group }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('disability')">
                <span class="govuk-!-font-weight-bold">Disability:</span> {{ service.criteria.disability }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('employment')">
                <span class="govuk-!-font-weight-bold">Employment:</span> {{ service.criteria.employment }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('gender')">
                <span class="govuk-!-font-weight-bold">Gender:</span> {{ service.criteria.gender }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('housing')">
                <span class="govuk-!-font-weight-bold">Housing:</span> {{ service.criteria.housing }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('income')">
                <span class="govuk-!-font-weight-bold">Income:</span> {{ service.criteria.income }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('language')">
                <span class="govuk-!-font-weight-bold">Language:</span> {{ service.criteria.language }}
              </li>
              <li v-if="service.criteria.hasOwnProperty('other')">
                <span class="govuk-!-font-weight-bold">Other:</span> {{ service.criteria.other }}
              </li>
            </gov-list>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('fees_url')">
          <gov-table-header top scope="row">Fees URL</gov-table-header>
          <gov-table-cell break>{{ original.fees_url }}</gov-table-cell>
          <gov-table-cell break>{{ service.fees_url }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('fees_text')">
          <gov-table-header top scope="row">Fees text</gov-table-header>
          <gov-table-cell>{{ original.fees_text }}</gov-table-cell>
          <gov-table-cell>{{ service.fees_text }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('wait_time')">
          <gov-table-header top scope="row">Wait time</gov-table-header>
          <gov-table-cell>{{ original.wait_time }}</gov-table-cell>
          <gov-table-cell>{{ service.wait_time }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('description')">
          <gov-table-header top scope="row">Description</gov-table-header>
          <gov-table-cell v-html="toHtml(original.description)" />
          <gov-table-cell v-html="toHtml(service.description)" />
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('testimonial')">
          <gov-table-header top scope="row">Testimonial</gov-table-header>
          <gov-table-cell>{{ original.testimonial }}</gov-table-cell>
          <gov-table-cell>{{ service.testimonial }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('video_embed')">
          <gov-table-header top scope="row">Video embed</gov-table-header>
          <gov-table-cell>{{ original.video_embed }}</gov-table-cell>
          <gov-table-cell>{{ service.video_embed }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('contact_name')">
          <gov-table-header top scope="row">Contact name</gov-table-header>
          <gov-table-cell>{{ original.contact_name }}</gov-table-cell>
          <gov-table-cell>{{ service.contact_name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('referral_url')">
          <gov-table-header top scope="row">Referral URL</gov-table-header>
          <gov-table-cell break>{{ original.referral_url }}</gov-table-cell>
          <gov-table-cell break>{{ service.referral_url }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('useful_infos')">
          <gov-table-header top scope="row">Useful infos</gov-table-header>
          <gov-table-cell>
            <gov-list v-if="original.useful_infos.length > 0">
              <li v-for="(usefulInfo, index) in original.useful_infos" :key="`useful_info.${index}`">
                <gov-heading>{{ usefulInfo.title }}</gov-heading>
                <gov-body>{{ usefulInfo.description }}</gov-body>
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
          <gov-table-cell>
            <gov-list v-if="service.useful_infos.length > 0">
              <li v-for="(usefulInfo, index) in service.useful_infos" :key="`useful_info.${index}`">
                <gov-heading>{{ usefulInfo.title }}</gov-heading>
                <gov-body>{{ usefulInfo.description }}</gov-body>
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('contact_email')">
          <gov-table-header top scope="row">Contact email</gov-table-header>
          <gov-table-cell>{{ original.contact_email }}</gov-table-cell>
          <gov-table-cell>{{ service.contact_email }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('contact_phone')">
          <gov-table-header top scope="row">Contact phone</gov-table-header>
          <gov-table-cell>{{ original.contact_phone }}</gov-table-cell>
          <gov-table-cell>{{ service.contact_phone }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('social_medias')">
          <gov-table-header top scope="row">Social medias</gov-table-header>
          <gov-table-cell break>
            <gov-list v-if="original.social_medias.length > 0">
              <li v-for="(socialMedia, index) in original.social_medias" :key="`social_media.${index}`">
                <span class="govuk-!-font-weight-bold">{{ socialMedia.type | socialMediaType }}:</span> {{ socialMedia.url }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
          <gov-table-cell break>
            <gov-list v-if="service.social_medias.length > 0">
              <li v-for="(socialMedia, index) in service.social_medias" :key="`social_media.${index}`">
                <span class="govuk-!-font-weight-bold">{{ socialMedia.type | socialMediaType }}:</span> {{ socialMedia.url }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('referral_email')">
          <gov-table-header top scope="row">Referral email</gov-table-header>
          <gov-table-cell>{{ original.referral_email }}</gov-table-cell>
          <gov-table-cell>{{ service.referral_email }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('referral_method')">
          <gov-table-header top scope="row">Referral method</gov-table-header>
          <gov-table-cell>{{ original.referral_method | referralMethod }}</gov-table-cell>
          <gov-table-cell>{{ service.referral_method | referralMethod }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('category_taxonomies')">
          <gov-table-header top scope="row">Category taxonomies</gov-table-header>
          <gov-table-cell>
            <gov-list bullet v-if="original.category_taxonomies.length > 0">
              <li v-for="(taxonomy, index) in original.category_taxonomies" :key="`category_taxonomies.${index}`">
                {{ taxonomyName(findTaxonomy(taxonomy)) }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
          <gov-table-cell>
            <gov-list bullet v-if="service.category_taxonomies.length > 0">
              <li v-for="(taxonomy, index) in service.category_taxonomies" :key="`category_taxonomies.${index}`">
                {{ taxonomyName(findTaxonomy(taxonomy)) }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('referral_button_text')">
          <gov-table-header top scope="row">Referral button text</gov-table-header>
          <gov-table-cell>{{ original.referral_button_text }}</gov-table-cell>
          <gov-table-cell>{{ service.referral_button_text }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('show_referral_disclaimer')">
          <gov-table-header top scope="row">Show referral disclaimer</gov-table-header>
          <gov-table-cell>{{ original.show_referral_disclaimer | showReferralDisclaimer }}</gov-table-cell>
          <gov-table-cell>{{ service.show_referral_disclaimer | showReferralDisclaimer }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="service.hasOwnProperty('logo_file_id')">
          <gov-table-header top scope="row">Logo</gov-table-header>
          <gov-table-cell>
            <img :src="apiUrl(`/services/${service.id}/logo.png?v=${service.updated_at}`)" alt="Service logo" class="ck-logo">
          </gov-table-cell>
          <gov-table-cell>
            <img :src="apiUrl(`/services/${service.id}/logo.png?update_request_id=${updateRequestId}`)" alt="Service logo" class="ck-logo">
          </gov-table-cell>
        </gov-table-row>

      </template>
    </gov-table>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "ServiceDetails",
  props: {
    updateRequestId: {
      required: true,
      type: String,
    },

    service: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      original: null,
      taxonomies: [],
      flattenedTaxonomies: []
    };
  },
  methods: {
    taxonomyName(taxonomy) {
      let name = taxonomy.name;

      if (taxonomy.parent_id !== null) {
        const parent = this.flattenedTaxonomies.find(flattenedTaxonomy => {
          return flattenedTaxonomy.id === taxonomy.parent_id;
        });
        name = `${this.taxonomyName(parent)} / ${name}`;
      }

      return name;
    },
    async fetchAll() {
      this.loading = true;

      await this.fetchOriginal();
      await this.fetchTaxonomies();

      this.loading = false;
    },
    async fetchOriginal() {
      const { data: { data: original } } = await http.get(`/services/${this.service.id}`);
      this.original = original;
    },
    async fetchTaxonomies() {
      const { data: { data: taxonomies } } = await http.get("/taxonomies/categories");
      this.taxonomies = taxonomies;
      this.setFlattenedTaxonomies();
    },
    setFlattenedTaxonomies(taxonomies = null) {
      if (taxonomies === null) {
        this.flattenedTaxonomies = [];
        taxonomies = this.taxonomies;
      }

      taxonomies.forEach(taxonomy => {
        this.flattenedTaxonomies.push(taxonomy);

        if (taxonomy.children.length > 0) {
          this.setFlattenedTaxonomies(taxonomy.children);
        }
      });
    },
    findTaxonomy(id) {
      return this.flattenedTaxonomies.find(taxonomy => taxonomy.id === id);
    },
  },
  filters: {
    status(status) {
      return status === "active" ? "Enabled" : "Disabled";
    },
    isFree(isFree) {
      return isFree ? "Yes" : "No";
    },
    socialMediaType(type) {
      switch (type) {
        case "twitter":
          return "Twitter";
        case "facebook":
          return "Facebook";
        case "instagram":
          return "Instagram";
        case "youtube":
          return "YouTube";
        case "other":
          return "Other";
      }
    },
    referralMethod(referralMethod) {
      return referralMethod.charAt(0).toUpperCase() + referralMethod.slice(1);
    },
    showReferralDisclaimer(showReferralDisclaimer) {
      return showReferralDisclaimer ? "Show" : "Hide";
    },
  },
  created() {
    this.fetchAll();
  }
};
</script>
