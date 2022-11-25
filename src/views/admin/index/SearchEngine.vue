<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Search Engine" />

    <gov-tabs :tabs="tabs">
      <router-view />
    </gov-tabs>
  </div>
</template>

<script>
export default {
  name: "ListSearchEngine",
  data() {
    return {
      tabs: [
        {
          heading: "Thesaurus",
          to: { name: "admin-index-search-engine" },
        },
        {
          heading: "Stop words",
          to: { name: "admin-index-search-engine-stop-words" },
        },
      ],
    };
  },
};
</script>
