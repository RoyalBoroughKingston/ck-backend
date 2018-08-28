<template>
  <table class="govuk-table">
    <thead class="govuk-table__head">
      <slot name="header" />
    </thead>
    <tbody class="govuk-table__body">
      <slot name="body" />
    </tbody>
  </table>
</template>

<script>
export default {
  name: "GovTable"
};
</script>
