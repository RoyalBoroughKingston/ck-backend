<template>
  <gov-body>
    <slot>Loading</slot><span v-for="(dot, index) in dots" :key="index">.</span>
  </gov-body>
</template>

<script>
export default {
  name: "CkLoader",
  data() {
    return {
      dots: 0,
      interval: null
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.dots === 3 ? (this.dots = 0) : this.dots++;
    }, 300);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
