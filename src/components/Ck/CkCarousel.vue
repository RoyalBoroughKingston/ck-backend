<template>
  <div class="ck-carousel">
    <img
      class="ck-carousel__image"
      v-for="(imageUrl, index) in imageUrls"
      :key="imageUrl"
      v-show="currentPage === index"
      :src="imageUrl"
      alt="Image"
    />

    <gov-button
      @click="currentPage--"
      type="button"
      :disabled="currentPage <= 0"
      >Previous</gov-button
    >
    <gov-button
      @click="currentPage++"
      type="button"
      :disabled="currentPage >= count - 1"
      >Next</gov-button
    >
    <gov-body>Showing item {{ currentPage + 1 }} of {{ count }}</gov-body>
  </div>
</template>

<script>
export default {
  name: "CkCarousel",

  props: {
    imageUrls: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentPage: 0,
    };
  },

  computed: {
    count() {
      return this.imageUrls.length;
    },
  },
};
</script>

<style lang="scss">
.ck-carousel {
  &__image {
    display: block;
    margin-bottom: 1rem;
  }
}
</style>
