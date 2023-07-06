<template>
  <div>
    <gov-inset-text
      v-for="(socialMedia, index) in socialMedias"
      :key="socialMedia.index"
    >
      <ck-select-input
        :value="socialMedia.type"
        @input="onTypeInput({ index, value: $event })"
        :id="`social_media.${index}.type`"
        label="Platform:"
        :options="socialMediaTypeOptions"
        :error="errors.get(`social_media.${index}.type`)"
      />

      <ck-text-input
        :value="socialMedia.url"
        @input="onUrlInput({ index, value: $event })"
        :id="`social_medias.${index}.url`"
        label="Link to your page:"
        hint="Copy the link from your browser, e.g. https://www.twitter.com/ConnectedKings or https://www.facebook.com/ConnectedKingston"
        type="url"
        :error="errors.get(`social_medias.${index}.url`)"
      />

      <gov-button @click="onDeleteSocialMedia(index)" error>Delete</gov-button>
    </gov-inset-text>

    <div>
      <gov-button @click="onAddSocialMedia">
        <template v-if="socialMedias.length === 0">Add social media</template>
        <template v-else>Add another</template>
      </gov-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialMediasInput',
  model: {
    prop: 'socialMedias',
    event: 'input',
  },
  props: {
    socialMedias: {
      required: true,
      type: Array,
    },
    errors: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      socialMediaTypeOptions: [
        { text: 'Please select', value: null, disabled: true },
        { text: 'Twitter', value: 'twitter' },
        { text: 'Facebook', value: 'facebook' },
        { text: 'Instagram', value: 'instagram' },
        { text: 'YouTube', value: 'youtube' },
        { text: 'Other', value: 'other' },
      ],
      socialMediasIndex: 1,
    }
  },
  methods: {
    cloneSocialMedias() {
      return this.socialMedias.map(socialMedia => ({ ...socialMedia }))
    },
    onAddSocialMedia() {
      let socialMedias = this.cloneSocialMedias()
      socialMedias.push({
        type: null,
        url: '',
        index: this.socialMediasIndex,
      })
      this.$emit('input', socialMedias)

      this.socialMediasIndex++
    },
    onDeleteSocialMedia(deleteIndex) {
      let socialMedias = this.cloneSocialMedias()
      this.$delete(socialMedias, deleteIndex)
      this.$emit('input', socialMedias)
      this.$emit('clear', `social_medias.${deleteIndex}.type`)
      this.$emit('clear', `social_medias.${deleteIndex}.url`)
    },
    onTypeInput({ index, value }) {
      let socialMedias = this.cloneSocialMedias()
      socialMedias[index].type = value
      this.$emit('input', socialMedias)
    },
    onUrlInput({ index, value }) {
      let socialMedias = this.cloneSocialMedias()
      socialMedias[index].url = value
      this.$emit('input', socialMedias)
    },
  },
}
</script>
