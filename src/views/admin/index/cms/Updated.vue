<template>
  <gov-width-container>
    <vue-headful :title="`Connected Kingston - Admin: CMS Updated`" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="one-half">
          <gov-heading size="xl">CMS updated</gov-heading>
          <gov-body>The CMS content has been updated.</gov-body>

          <gov-button :to="{ name: 'admin-index-cms' }">Back to CMS</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
export default {
  name: "CmsUpdated"
};
</script>
