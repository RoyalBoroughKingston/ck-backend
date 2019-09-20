<template>
  <div>
    <gov-back-link :to="{ name: 'dashboard' }">
      Back to dashboard
    </gov-back-link>

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column width="two-thirds">
          <gov-heading size="l">
            Is your service right for Connected Kingston?
          </gov-heading>

          <gov-body>
            We have some criteria for services and organisations to be listed on
            the site.
          </gov-body>

          <gov-form-group>
            <gov-label>
              <strong>
                The organisation that you want to be listed on Connected
                Kingston is:
              </strong>
            </gov-label>

            <gov-hint>
              Tick all that apply.
            </gov-hint>

            <gov-checkboxes>
              <gov-checkbox
                :value="form.organisation_types.includes('community')"
                id="organisation_types.community"
                name="organisation_types"
                label="1. A community, voluntary or faith based service (not prothletising) eg. a Charity"
                @input="$emit('input', onInput('community'))"
              />

              <gov-checkbox
                :value="form.organisation_types.includes('council')"
                id="organisation_types.council"
                name="organisation_types"
                label="2. A Council or other statutory service, e.g. services delivered by the NHS or Kingston CCG)"
                @input="$emit('input', onInput('council'))"
              />

              <gov-checkbox
                :value="form.organisation_types.includes('commercial')"
                id="organisation_types.commercial"
                name="organisation_types"
                label="3. A commercial provider offering services to Kingston residents that support health, wellbeing and/or community for free or a reasonable charge"
                @input="$emit('input', onInput('commercial'))"
              />

              <gov-checkbox
                :value="form.organisation_types.includes('commercial_contracted')"
                id="organisation_types.commercial_contracted"
                name="organisation_types"
                label="4. A commercial service that is contracted or spot purchased under a commissioning arrangement with Royal Borough of Kingston (RBK) Council, intended to improve the health, wellbeing or independence of Kingston residents"
                @input="$emit('input', onInput('commercial_contracted'))"
              />
            </gov-checkboxes>
          </gov-form-group>

          <gov-button
            start
            :to="{ name: 'register-index-user' }"
            :disabled="form.organisation_types.length === 0"
          >
            Next
          </gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  methods: {
    onInput(organisationType) {
      if (this.form.organisation_types.includes(organisationType)) {
        this.$emit(
          'input',
          Object.assign(this.form, {
            organisation_types: this.form.organisation_types
              .filter((type) => type !== organisationType)
          })
        );
      } else {
        this.$emit(
          'input',
          Object.assign(this.form, {
            organisation_types: [...this.form.organisation_types, organisationType]
          })
        );
      }

      this.$emit('clear', 'organisation_types');
    }
  }
}
</script>
