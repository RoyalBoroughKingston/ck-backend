<template>
  <gov-list bullet>
    <li
      v-for="(synonym, index) in synonyms"
      :key="index"
      v-text="synonym.join(', ')"
    ></li>
  </gov-list>
</template>

<script>
export default {
  name: 'CkThesaurusList',

  props: {
    synonyms: {
      required: true,
      type: Array,
    },
  },
}
</script>
