<template>
  <div>
    <gov-heading size="l">Contact info</gov-heading>
    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="row" top>Contact name</gov-table-header>
          <gov-table-cell>{{ service.contact_name }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Public phone number</gov-table-header
          >
          <gov-table-cell>{{ service.contact_phone }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Public email address</gov-table-header
          >
          <gov-table-cell>{{ service.contact_email }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Social links</gov-table-header>
          <gov-table-cell break>
            <gov-list>
              <li
                v-for="(socialMedia, index) in service.social_medias"
                :key="index"
              >
                ({{ humanReadableSocialMedia(socialMedia.type) }})
                {{ socialMedia.url }}
              </li>
              <li v-if="service.social_medias.length === 0">-</li>
            </gov-list>
          </gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
export default {
  name: 'ContactInfoTab',
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  methods: {
    humanReadableSocialMedia(type) {
      switch (type) {
        case 'twitter':
          return 'Twitter'
        case 'facebook':
          return 'Facebook'
        case 'instagram':
          return 'Instagram'
        case 'youtube':
          return 'YouTube'
        case 'other':
          return 'Other'
      }
    },
  },
}
</script>
