<template>
  <gov-error-message :for="`${_uid}`">
    <slot
      >There was an issue when submitting. Please check for any errors.</slot
    >
  </gov-error-message>
</template>
