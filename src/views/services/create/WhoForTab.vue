<template>
  <div>
    <gov-heading size="l">Who is it for?</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          Use this section to add details as to who this service is for. If any of these
          criteria do not apply to your service, please leave them blank.
        </gov-body>
        <gov-section-break size="l" />

        <!-- Age group -->
        <criteria-input
          :value="form.criteria.age_group"
          @input="$emit('update:age_group', $event)"
          :form="form"
          path="criteria.age_group"
          label="Age of service user (if applicable)"
          hint='e.g. "This service is for people 16+", or "This service is aimed at people nearig retirement"'
        />
        <!-- /Age group -->

        <!-- Disability -->
        <criteria-input
          :value="form.criteria.disability"
          @input="$emit('update:disability', $event)"
          :form="form"
          path="criteria.disability"
          label="Disability Requirements / Restrictions (if applicable)"
          hint='e.g. "This service is for those with MS and their carers", or "For all people with disabilities and their carers"'
        />
        <!-- /Disability -->

        <!-- Gender -->
        <criteria-input
          :value="form.criteria.gender"
          @input="$emit('update:gender', $event)"
          :form="form"
          path="criteria.gender"
          label="Gender Specific (if applicable)"
          hint='e.g. "Women only"'
        />
        <!-- /Gender -->

        <!-- Housing -->
        <criteria-input
          :value="form.criteria.housing"
          @input="$emit('update:housing', $event)"
          :form="form"
          path="criteria.housing"
          label="Specific Housing status/needs (if applicable)"
          hint='e.g. "For people who are homeless or at risk of homelessness"'
        />
        <!-- /Housing -->

        <!-- Income -->
        <criteria-input
          :value="form.criteria.income"
          @input="$emit('update:income', $event)"
          :form="form"
          path="criteria.income"
          label="Income level (if applicable)"
          hint='e.g. "Service is aimed at people claiming benefits or with Income support"'
        />
        <!-- /Income -->

        <!-- Language -->
        <criteria-input
          :value="form.criteria.language"
          @input="$emit('update:language', $event)"
          :form="form"
          path="criteria.language"
          label="Language accessability (if applicable)"
          hint='e.g. "Instructors speak English, but open to all", or "This service is available in a number of languages - please contact me for more information"'
        />
        <!-- /Language -->

        <!-- Other -->
        <criteria-input
          :value="form.criteria.other"
          @input="$emit('update:other', $event)"
          :form="form"
          path="criteria.other"
          label="Any other notes as to who the service is aimed at/not appropraite for?"
          hint='e.g. "This service is open to all", or "This service is aimed at people living in Chessington"'
        />
        <!-- /Other -->

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import CriteriaInput from "@/views/services/create/CriteriaInput";

export default {
  name: "WhoForTab",
  components: { CriteriaInput },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ageGroupEnabled: null,
      disabilityEnabled: null,
      employmentEnabled: null,
      genderEnabled: null,
      housingEnabled: null,
      incomeEnabled: null,
      languageEnabled: null,
      otherEnabled: null
    };
  },
  watch: {
    ageGroupEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:age_group", "");
      }
    },
    disabilityEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:disability", "");
      }
    },
    employmentEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:employment", "");
      }
    },
    genderEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:gender", "");
      }
    },
    housingEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:housing", "");
      }
    },
    incomeEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:income", "");
      }
    },
    languageEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:language", "");
      }
    },
    otherEnabled(enabled) {
      if (!enabled) {
        this.$emit("update:other", "");
      }
    }
  }
};
</script>
