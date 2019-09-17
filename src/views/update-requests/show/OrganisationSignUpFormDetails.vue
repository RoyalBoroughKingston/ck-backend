<template>
  <div>
    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="column">User</gov-table-header>
          <gov-table-header scope="column">To</gov-table-header>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">First name</gov-table-header>
          <gov-table-cell>{{ user.first_name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Last name</gov-table-header>
          <gov-table-cell>{{ user.last_name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Email</gov-table-header>
          <gov-table-cell>{{ user.email }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Phone</gov-table-header>
          <gov-table-cell>{{ user.phone }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>

    <gov-section-break size="m"/>

    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="column">Organisation</gov-table-header>
          <gov-table-header scope="column">To</gov-table-header>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Name</gov-table-header>
          <gov-table-cell>{{ organisation.name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Slug</gov-table-header>
          <gov-table-cell>{{ organisation.slug }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Description</gov-table-header>
          <gov-table-cell>{{ organisation.description }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">URL</gov-table-header>
          <gov-table-cell>{{ organisation.url }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Email</gov-table-header>
          <gov-table-cell>{{ organisation.email || '-' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Phone</gov-table-header>
          <gov-table-cell>{{ organisation.phone || '-' }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>

    <gov-section-break size="m"/>

    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="column">Service</gov-table-header>
          <gov-table-header scope="column">To</gov-table-header>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Type</gov-table-header>
          <gov-table-cell break>{{ service.type | ucfirst }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">URL</gov-table-header>
          <gov-table-cell break>{{ service.url }}</gov-table-cell>
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
          <gov-table-header top scope="row">Is free</gov-table-header>
          <gov-table-cell>{{ service.is_free | isFree }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Criteria</gov-table-header>
          <gov-table-cell>
            <gov-list>
              <li>
                <span class="govuk-!-font-weight-bold">Age group:</span>
                {{ service.criteria.age_group || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Disability:</span>
                {{ service.criteria.disability || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Employment:</span>
                {{ service.criteria.employment || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Gender:</span>
                {{ service.criteria.gender || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Housing:</span>
                {{ service.criteria.housing || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Income:</span>
                {{ service.criteria.income || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Language:</span>
                {{ service.criteria.language || 'N/A' }}
              </li>
              <li>
                <span class="govuk-!-font-weight-bold">Other:</span>
                {{ service.criteria.other || 'N/A' }}
              </li>
            </gov-list>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Fees URL</gov-table-header>
          <gov-table-cell break>{{ service.fees_url || 'N/A' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Fees text</gov-table-header>
          <gov-table-cell>{{ service.fees_text || 'N/A' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Wait time</gov-table-header>
          <gov-table-cell>{{ service.wait_time || 'N/A' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Description</gov-table-header>
          <gov-table-cell v-html="toHtml(service.description)" />
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Testimonial</gov-table-header>
          <gov-table-cell>{{ service.testimonial || 'N/A' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Video embed</gov-table-header>
          <gov-table-cell>{{ service.video_embed || 'N/A' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Contact name</gov-table-header>
          <gov-table-cell>{{ service.contact_name }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Useful infos</gov-table-header>
          <gov-table-cell>
            <gov-list v-if="service.useful_infos.length > 0">
              <li
                v-for="(usefulInfo, index) in service.useful_infos"
                :key="`useful_info.${index}`"
              >
                <gov-heading>{{ usefulInfo.title }}</gov-heading>
                <div v-html="toHtml(usefulInfo.description)" />
                <gov-section-break
                  v-if="index < service.useful_infos.length - 1"
                  visible
                  size="l"
                />
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Offerings</gov-table-header>
          <gov-table-cell>
            <gov-list v-if="service.offerings.length > 0" bullet>
              <li
                v-for="{ offering, order } in service.offerings"
                :key="`ServiceOffering::New::${order}`"
              >
                {{ offering }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Contact email</gov-table-header>
          <gov-table-cell>{{ service.contact_email || '-' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Contact phone</gov-table-header>
          <gov-table-cell>{{ service.contact_phone || '-' }}</gov-table-cell>
        </gov-table-row>

        <gov-table-row>
          <gov-table-header top scope="row">Social medias</gov-table-header>
          <gov-table-cell break>
            <gov-list v-if="service.social_medias.length > 0">
              <li
                v-for="(socialMedia, index) in service.social_medias"
                :key="`social_media.${index}`"
              >
                <span class="govuk-!-font-weight-bold">
                  {{ socialMedia.type | socialMediaType }}:
                </span>
                {{ socialMedia.url }}
              </li>
            </gov-list>
            <template v-else>None</template>
          </gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
import http from "@/http";

export default {
  name: "OrganisationSignUpFormDetails",
  props: {
    updateRequestId: {
      required: true,
      type: String
    },

    requestedAt: {
      required: true,
      type: String
    },

    user: {
      required: true,
      type: Object
    },

    organisation: {
      required: true,
      type: Object
    },

    service: {
      required: true,
      type: Object
    }
  },

  filters: {
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
    }
  }
};
</script>
