<template>
  <div>
    <gov-heading size="l">Service details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>General details about the service. (We use service in the broadcast sense, This could be counciling or weekly yoga classes).</gov-body>
        <gov-section-break size="l" />

        <!-- Service name -->
        <gov-form-group :invalid="form.$errors.has('name')">
          <gov-label class="govuk-!-font-weight-bold" for="name">
            Name of service
          </gov-label>
          <gov-input
            :value="form.name"
            @input="$emit('update:name', $event)"
            id="name"
            name="name"
            type="text"
          />
          <gov-error-message
            v-if="form.$errors.has('name')"
            v-text="form.$errors.get('name')"
            for="name"
          />
        </gov-form-group>
        <!-- /Service name -->

        <!-- Service URL -->
        <gov-form-group :invalid="form.$errors.has('url')">
          <gov-label class="govuk-!-font-weight-bold" for="url">
            Service website address
          </gov-label>
          <gov-hint for="url">
            or your organisation if you do not have a seperate service website/page
          </gov-hint>
          <gov-input
            :value="form.url"
            @input="$emit('update:url', $event)"
            id="url"
            name="url"
            type="url"
          />
          <gov-error-message
            v-if="form.$errors.has('url')"
            v-text="form.$errors.get('url')"
            for="url"
          />
        </gov-form-group>
        <!-- /Service URL -->

        <!-- Service logo -->
        <gov-form-group :invalid="logoForm.$errors.has('file')">
          <gov-label class="govuk-!-font-weight-bold" for="logo">
            Service logo
          </gov-label>
          <gov-hint for="logo">
            please upload a logo of the service, not the organisation.
          </gov-hint>
          <gov-file-upload
            :value="logoForm.file"
            @change="$emit('update:logo', $event)"
            id="logo"
            name="logo"
            accept="image/x-png"
          />
          <gov-error-message
            v-if="logoForm.$errors.has('file')"
            v-text="logoForm.$errors.get('file')"
            for="logo"
          />
        </gov-form-group>
        <!-- /Service logo -->

        <!-- Service intro -->
        <gov-form-group :invalid="form.$errors.has('intro')">
          <gov-label class="govuk-!-font-weight-bold" for="intro">
            Please provide a one-line summary of the service
          </gov-label>
          <gov-hint for="intro">
            This should be a short line or two that summarises what the service offers and will appear below the service name in search results (max 150 characters).
          </gov-hint>
          <gov-textarea
            :value="form.intro"
            @input="$emit('update:intro', $event)"
            id="intro"
            name="intro"
            type="text"
            maxlength="150"
          />
          <gov-error-message
            v-if="form.$errors.has('intro')"
            v-text="form.$errors.get('intro')"
            for="intro"
          />
        </gov-form-group>
        <!-- /Service intro -->

        <!-- Service description -->
        <gov-form-group :invalid="form.$errors.has('description')">
          <gov-label class="govuk-!-font-weight-bold" for="description">
            Service description
          </gov-label>
          <gov-hint for="description">
            Please enter a more detailed description of the service. This will be
            the main body of text on the page - though it shouldn't be too long.
            <br/><br/>
            The description should contain details about accessing the service,
            that sort of activities happen there, and who should get in touch
            (max 1600 characters).
          </gov-hint>
          <ck-wysiwyg
            :value="form.description"
            @input="$emit('update:description', $event)"
            id="description"
          />
          <gov-error-message
            v-if="form.$errors.has('description')"
            v-text="form.$errors.get('description')"
            for="description"
          />
        </gov-form-group>
        <!-- /Service description -->

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "DetailsTab",
  props: {
    form: {
      type: Object,
      required: true
    },
    logoForm: {
      type: Object,
      required: true
    }
  }
};
</script>
