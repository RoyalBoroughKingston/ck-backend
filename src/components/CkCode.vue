<template>
  <code class="govuk-body govuk-body--code">
    <slot />
  </code>
</template>

<script>
export default {
  name: "CkCode"
};
</script>

<style lang="scss">
.govuk-body {
  &--code {
    padding: 1rem;
    font-family: "Source Code Pro", monospace !important;
    display: block;
    background-color: #dee0e2;
  }
}
</style>
