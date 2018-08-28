<template>
  <input
    @change="onChange"
    class="govuk-file-upload"
    :id="id"
    :name="name"
    type="file"
    ref="file"
    :aria-describedby="ariaDescribedBy"
  >
</template>

<script>
export default {
  name: "GovInput",
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fileReader: new FileReader()
    };
  },
  computed: {
    ariaDescribedBy() {
      return `${this.name}-hint`;
    }
  },
  methods: {
    onChange() {
      const files = this.$refs.file.files;

      if (!files.length) {
        this.$emit("change", null);
        return;
      }

      const file = files[0];
      this.fileReader.onloadend = () => this.$emit("change", this.fileReader.result);
      const fileContent = this.fileReader.readAsDataURL(file);
    }
  }
};
</script>
