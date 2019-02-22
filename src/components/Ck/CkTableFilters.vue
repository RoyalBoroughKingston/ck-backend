<template>
  <div>
    <gov-heading size="m">Search</gov-heading>

    <form @submit.prevent="$emit('search')">

      <slot/>

      <template v-if="showAll">
        <slot name="extra-filters"/>
      </template>

      <gov-form-group v-if="!hideExtra">
        <gov-link v-if="!showAll" @click="showAll = true">Show extra filters</gov-link>
        <gov-link v-else @click="showAll = false">Hide extra filters</gov-link>
      </gov-form-group>

      <gov-form-group>
        <gov-button type="submit">Search</gov-button>
      </gov-form-group>

    </form>
  </div>
</template>


<script>
export default {
  name: "TableFilters",

  props: {
    hideExtra: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAll: false
    };
  }
};
</script>
