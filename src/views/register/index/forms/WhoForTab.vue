<template>
  <div>
    <gov-heading size="l">Who is your {{ service.type }} for?</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          Use this section to help indicate who should be using your
          {{ service.type }}. If any of these criteria do not apply, please
          leave them blank.
        </gov-body>

        <gov-section-break size="l" />

        <!-- Age group -->
        <criteria-input
          :value="service.criteria.age_group"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { age_group: $event }),
            })
          "
          :error="errors.get('service.criteria.age_group')"
          id="criteria.age_group"
          label="Age of service user (if applicable)"
          :hint="`E.g “This ${service.type} is for people 16+” or “This ${service.type} is aimed at people nearing retirement”`"
        />
        <!-- /Age group -->

        <!-- Disability -->
        <criteria-input
          :value="service.criteria.disability"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { disability: $event }),
            })
          "
          :error="errors.get('service.criteria.disability')"
          id="criteria.disability"
          label="Disability Requirements / Restrictions (if applicable)"
          :hint="`e.g. &quot;This ${service.type} is for those with MS and their carers&quot;, or &quot;For all people with disabilities and their carers&quot;`"
        />
        <!-- /Disability -->

        <!-- Gender -->
        <criteria-input
          :value="service.criteria.gender"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { gender: $event }),
            })
          "
          :error="errors.get('service.criteria.gender')"
          id="criteria.gender"
          label="Gender Specific (if applicable)"
          hint='e.g. "Women only"'
        />
        <!-- /Gender -->

        <!-- Housing -->
        <criteria-input
          :value="service.criteria.housing"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { housing: $event }),
            })
          "
          :error="errors.get('service.criteria.housing')"
          id="criteria.housing"
          label="Specific Housing status/needs (if applicable)"
          hint='e.g. "For people who are homeless or at risk of homelessness"'
        />
        <!-- /Housing -->

        <!-- Income -->
        <criteria-input
          :value="service.criteria.income"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { income: $event }),
            })
          "
          :error="errors.get('service.criteria.income')"
          id="criteria.income"
          label="Income level (if applicable)"
          :hint="`e.g. &quot;This ${service.type} is aimed at people claiming benefits or with Income support&quot;`"
        />
        <!-- /Income -->

        <!-- Language -->
        <criteria-input
          :value="service.criteria.language"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { language: $event }),
            })
          "
          :error="errors.get('service.criteria.language')"
          id="criteria.language"
          label="Language accessability (if applicable)"
          :hint="`E.g. “Instructors speak English, but open to all”, or “This ${service.type} is available in a number of languages - please contact for more information”`"
        />
        <!-- /Language -->

        <!-- Other -->
        <criteria-input
          :value="service.criteria.other"
          @input="
            $emit('input', {
              field: 'criteria',
              value: Object.assign(service.criteria, { other: $event }),
            })
          "
          :error="errors.get('service.criteria.other')"
          id="criteria.other"
          :label="`Any other notes as to who the ${service.type} is aimed at/not appropriate for?`"
          :hint="`E.g. “This ${service.type} is open to all”, or “This ${service.type} is aimed at people living in Chessington”`"
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
  components: {
    CriteriaInput,
  },

  props: {
    service: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      required: true,
    },
  },
}
</script>
