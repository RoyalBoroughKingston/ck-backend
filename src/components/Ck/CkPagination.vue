<template>
  <gov-body>
    Showing page {{ currentPage }} of {{ totalPages }}
    <gov-link v-if="currentPage > 1" @click="onPrevious">Previous</gov-link>
    <!---->&nbsp;<!---->
    <gov-link v-if="currentPage < totalPages" @click="onNext">Next</gov-link>
  </gov-body>
</template>

<script>
import GovBody from "@/components/Gov/GovBody.vue";
import GovLink from "@/components/Gov/GovLink.vue";

export default {
  name: "Pagination",

  components: {
    GovBody,
    GovLink
  },

  props: {
    currentPage: {
      required: true,
      type: Number
    },

    totalPages: {
      required: true,
      type: Number
    }
  },

  methods: {
    onPrevious() {
      this.$emit("previous");
    },

    onNext() {
      this.$emit("next");
    }
  }
};
</script>
