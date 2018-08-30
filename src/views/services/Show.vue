<template>
  <ck-wysiwyg v-model="text" />
</template>

<script>
export default {
  name: "ShowService",
  data() {
    return {
      text: ""
    };
  }
};
</script>
