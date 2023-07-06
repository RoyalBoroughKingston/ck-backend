<template>
  <input
    @change="onChange"
    class="govuk-file-upload"
    :id="id"
    :name="name"
    type="file"
    ref="file"
    :aria-describedby="ariaDescribedBy"
  />
</template>

<script>
export default {
  name: 'GovInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileReader: new FileReader(),
    }
  },
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`
    },
  },
  methods: {
    onChange() {
      const files = this.$refs.file.files

      if (!files.length) {
        this.$emit('change', null)
        return
      }

      const file = files[0]
      this.fileReader.onloadend = () =>
        this.$emit('change', {
          mime_type: file.type,
          bytes: file.size,
          content: this.fileReader.result,
        })
      this.fileReader.readAsDataURL(file)
    },
  },
}
</script>
