<template>
  <div>
    <vue-headful title="Connected Kingston - Admin: Taxonomies" />

    <gov-heading size="l">Taxonomies</gov-heading>

    <gov-body>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum a vero deserunt iure aut blanditiis et numquam voluptatibus nulla aperiam ipsa quam saepe dolorum quos, sapiente praesentium porro officiis nesciunt.</gov-body>

    <gov-tabs :tabs="tabs">
      <router-view />
    </gov-tabs>
  </div>
</template>

<script>
export default {
  name: "ListTaxonomies",
  data() {
    return {
      tabs: [
        { heading: "Categories", to: { name: "admin-index-taxonomies-categories" } },
        { heading: "Organisations", to: { name: "admin-index-taxonomies-organisations" } }
      ]
    };
  }
};
</script>
