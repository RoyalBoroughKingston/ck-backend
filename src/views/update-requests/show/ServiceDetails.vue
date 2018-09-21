<template>
  <gov-table>
    <template slot="body">

      <gov-table-row>
        <gov-table-header top scope="row">URL</gov-table-header>
        <gov-table-cell>{{ service.url }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Name</gov-table-header>
        <gov-table-cell>{{ service.name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Slug</gov-table-header>
        <gov-table-cell>{{ service.slug }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Intro</gov-table-header>
        <gov-table-cell>{{ service.intro }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Status</gov-table-header>
        <gov-table-cell>{{ service.status ? "Enabled" : "Disabled" }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Is free?</gov-table-header>
        <gov-table-cell>{{ service.is_free ? "Yes" : "No" }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Criteria</gov-table-header>
        <gov-table-cell>
          <gov-list>
            <li v-if="service.criteria.age_group">
              <span class="govuk-!-font-weight-bold">Age group:</span> {{ service.criteria.age_group }}
            </li>
            <li v-if="service.criteria.disability">
              <span class="govuk-!-font-weight-bold">Disability:</span> {{ service.criteria.disability }}
            </li>
            <li v-if="service.criteria.employment">
              <span class="govuk-!-font-weight-bold">Employment:</span> {{ service.criteria.employment }}
            </li>
            <li v-if="service.criteria.gender">
              <span class="govuk-!-font-weight-bold">Gender:</span> {{ service.criteria.gender }}
            </li>
            <li v-if="service.criteria.housing">
              <span class="govuk-!-font-weight-bold">Housing:</span> {{ service.criteria.housing }}
            </li>
            <li v-if="service.criteria.income">
              <span class="govuk-!-font-weight-bold">Income:</span> {{ service.criteria.income }}
            </li>
            <li v-if="service.criteria.language">
              <span class="govuk-!-font-weight-bold">Language:</span> {{ service.criteria.language }}
            </li>
            <li v-if="service.criteria.other">
              <span class="govuk-!-font-weight-bold">Other:</span> {{ service.criteria.other }}
            </li>
          </gov-list>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.fees_url">
        <gov-table-header top scope="row">Fees URL</gov-table-header>
        <gov-table-cell>{{ service.fees_url }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.fees_text">
        <gov-table-header top scope="row">Fees text</gov-table-header>
        <gov-table-cell>{{ service.fees_text }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">SEO title</gov-table-header>
        <gov-table-cell>{{ service.seo_title }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.wait_time">
        <gov-table-header top scope="row">Wait time</gov-table-header>
        <gov-table-cell>{{ service.wait_time }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Description</gov-table-header>
        <gov-table-cell v-html="toHtml(service.description)" />
      </gov-table-row>

      <gov-table-row v-if="service.testimonial">
        <gov-table-header top scope="row">Testimonial</gov-table-header>
        <gov-table-cell>{{ service.testimonial }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.video_embed">
        <gov-table-header top scope="row">Video embed</gov-table-header>
        <gov-table-cell>{{ service.video_embed }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Contact name</gov-table-header>
        <gov-table-cell>{{ service.contact_name }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.referral_url">
        <gov-table-header top scope="row">Referral URL</gov-table-header>
        <gov-table-cell>{{ service.referral_url }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.useful_infos.length > 0">
        <gov-table-header top scope="row">Useful infos</gov-table-header>
        <gov-table-cell>
          <gov-list>
            <li v-for="(usefulInfo, index) in service.useful_infos" :key="`useful_info.${index}`">
              <gov-heading>{{ usefulInfo.title }}</gov-heading>
              <gov-body>{{ usefulInfo.description }}</gov-body>
            </li>
          </gov-list>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Contact email</gov-table-header>
        <gov-table-cell>{{ service.contact_email }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Contact phone</gov-table-header>
        <gov-table-cell>{{ service.contact_phone }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Social medias</gov-table-header>
        <gov-table-cell>
          <gov-list>
            <li v-for="(socialMedia, index) in service.social_medias" :key="`social_media.${index}`">
              <span class="govuk-!-font-weight-bold">{{ socialMediaType(socialMedia.type) }}:</span> {{ socialMedia.url }}
            </li>
          </gov-list>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.referral_email">
        <gov-table-header top scope="row">Referral email</gov-table-header>
        <gov-table-cell>{{ service.referral_email }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="service.referral_method">
        <gov-table-header top scope="row">Referral method</gov-table-header>
        <gov-table-cell>{{ referralMethod }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">SEO description</gov-table-header>
        <gov-table-cell>{{ service.seo_description }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Category taxonomies</gov-table-header>
        <gov-table-cell>
          <gov-list>
            <li v-for="(taxonomies, index) in service.category_taxonomies" :key="`category_taxonomies.${index}`">
              {{ taxonomies }}
            </li>
          </gov-list>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Referral button text</gov-table-header>
        <gov-table-cell>{{ service.referral_button_text }}</gov-table-cell>
      </gov-table-row>

      <gov-table-row>
        <gov-table-header top scope="row">Show referral disclaimer</gov-table-header>
        <gov-table-cell>{{ service.show_referral_disclaimer ? "Show" : "Hide" }}</gov-table-cell>
      </gov-table-row>

    </template>
  </gov-table>
</template>

<script>
export default {
  name: "ServiceDetails",
  props: {
    service: {
      required: true,
      type: Object
    }
  },
  computed: {
    referralMethod() {
      return this.service.referral_method.charAt(0).toUpperCase() + this.service.referral_method.slice(1);
    }
  },
  methods: {
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
    }
  }
};
</script>
