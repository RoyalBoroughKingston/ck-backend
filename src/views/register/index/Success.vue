<template>
  <div>
    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">
            Thank you for adding your service to Connected Kingston
          </gov-heading>

          <gov-body>
            Our admin team will review the information provided and let you know
            the outcome.
          </gov-body>

          <gov-body>
            For further information, please contact:
            <gov-link href="mailto:info@connectedkingston.uk">info@connectedkingston.uk</gov-link>
          </gov-body>

          <gov-button :to="{ name: 'dashboard' }" start>Home</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </div>
</template>
