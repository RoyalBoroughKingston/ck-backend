<template>
  <div class="ck-character-count">
    {{ content.length }}/{{ maxLength }}
  </div>
</template>

<script>
export default {
  name: 'CkCharacterCount',

  props: {
    content: {
      type: String,
      required: true
    },

    maxLength: {
      type: Number,
      required: true
    }
  }
}
</script>


<style lang="scss">
.ck-character-count {
  position: absolute;
  bottom: -1.6rem;
  right: 0;
  color: #6f777b;
}
</style>
