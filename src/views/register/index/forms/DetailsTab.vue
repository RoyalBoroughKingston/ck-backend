<template>
  <div>
    <gov-heading size="l">{{ service.type | ucfirst }} details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>
          General details about the {{ service.type }}. (We use
          {{ service.type }} in the broadcast sense, This could be counselling
          or weekly yoga classes).
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="service.type"
          @input="$emit('input', { field: 'type', value: $event })"
          id="type"
          label="What is it?"
          hint="This option changes how your page is described on Connected Kingston"
          :options="typeOptions"
          :error="errors.get('service.type')"
        />

        <ck-text-input
          :value="service.name"
          @input="$emit('input', { field: 'name', value: $event })"
          id="name"
          :label="`What is the name of your ${service.type}?`"
          type="text"
          :error="errors.get(['service.name', 'service.slug'])"
        >
          <gov-hint slot="hint" for="name">
            The name of your {{ service.type }} must be unique. The URL of your
            page will be: <br />
            www.connectedkingston.uk/services/{{ service.slug }}
          </gov-hint>
        </ck-text-input>

        <ck-text-input
          :value="service.url"
          @input="$emit('input', { field: 'url', value: $event })"
          id="url"
          :label="`What is the web address of your ${service.type}?`"
          :hint="`This must start with ‘http://’ or ‘https://’. You can use your organisation’s website address if the ${service.type} doesn’t have its own.`"
          type="url"
          :error="errors.get('service.url')"
        />

        <slot />
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
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

  data() {
    return {
      typeOptions: [
        { text: "It is a Service", value: "service" },
        { text: "It is an Activity", value: "activity" },
        { text: "It is a Club", value: "club" },
        { text: "It is a Group", value: "group" },
      ],
    };
  },
};
</script>
