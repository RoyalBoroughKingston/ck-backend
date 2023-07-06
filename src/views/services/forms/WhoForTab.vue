<template>
  <div>
    <gov-heading size="l">Who is your {{ type }} for?</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          Use this section to help indicate who should be using your {{ type }}.
          If any of these criteria do not apply, please leave them blank.
        </gov-body>
        <gov-section-break size="l" />

        <!-- Age group -->
        <criteria-input
          :value="age_group"
          @input="
            $emit('update:age_group', $event)
            $emit('clear', 'criteria.age_group')
          "
          :error="errors.get('criteria.age_group')"
          id="criteria.age_group"
          label="Age of service user (if applicable)"
          :hint="`E.g “This ${type} is for people 16+” or “This ${type} is aimed at people nearing retirement”`"
        />
        <!-- /Age group -->

        <!-- Disability -->
        <criteria-input
          :value="disability"
          @input="
            $emit('update:disability', $event)
            $emit('clear', 'criteria.disability')
          "
          :error="errors.get('criteria.disability')"
          id="criteria.disability"
          label="Disability Requirements / Restrictions (if applicable)"
          :hint="`e.g. &quot;This ${type} is for those with MS and their carers&quot;, or &quot;For all people with disabilities and their carers&quot;`"
        />
        <!-- /Disability -->

        <!-- Gender -->
        <criteria-input
          :value="gender"
          @input="
            $emit('update:gender', $event)
            $emit('clear', 'criteria.gender')
          "
          :error="errors.get('criteria.gender')"
          id="criteria.gender"
          label="Gender Specific (if applicable)"
          hint='e.g. "Women only"'
        />
        <!-- /Gender -->

        <!-- Housing -->
        <criteria-input
          :value="housing"
          @input="
            $emit('update:housing', $event)
            $emit('clear', 'criteria.housing')
          "
          :error="errors.get('criteria.housing')"
          id="criteria.housing"
          label="Specific Housing status/needs (if applicable)"
          hint='e.g. "For people who are homeless or at risk of homelessness"'
        />
        <!-- /Housing -->

        <!-- Income -->
        <criteria-input
          :value="income"
          @input="
            $emit('update:income', $event)
            $emit('clear', 'criteria.income')
          "
          :error="errors.get('criteria.income')"
          id="criteria.income"
          label="Income level (if applicable)"
          :hint="`e.g. &quot;This ${type} is aimed at people claiming benefits or with Income support&quot;`"
        />
        <!-- /Income -->

        <!-- Language -->
        <criteria-input
          :value="language"
          @input="
            $emit('update:language', $event)
            $emit('clear', 'criteria.language')
          "
          :error="errors.get('criteria.language')"
          id="criteria.language"
          label="Language accessability (if applicable)"
          :hint="`E.g. “Instructors speak English, but open to all”, or “This ${type} is available in a number of languages - please contact for more information”`"
        />
        <!-- /Language -->

        <!-- Other -->
        <criteria-input
          :value="other"
          @input="
            $emit('update:other', $event)
            $emit('clear', 'criteria.other')
          "
          :error="errors.get('criteria.other')"
          id="criteria.other"
          :label="`Any other notes as to who the ${type} is aimed at/not appropriate for?`"
          :hint="`E.g. “This ${type} is open to all”, or “This ${type} is aimed at people living in Chessington”`"
        />
        <!-- /Other -->

        <slot />
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
import CriteriaInput from '@/views/services/inputs/CriteriaInput'

export default {
  name: 'WhoForTab',
  components: { CriteriaInput },
  props: {
    errors: {
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
    age_group: {
      required: true,
    },
    disability: {
      required: true,
    },
    employment: {
      required: true,
    },
    gender: {
      required: true,
    },
    housing: {
      required: true,
    },
    income: {
      required: true,
    },
    language: {
      required: true,
    },
    other: {
      required: true,
    },
  },
}
</script>
