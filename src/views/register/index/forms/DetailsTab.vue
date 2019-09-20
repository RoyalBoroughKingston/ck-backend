<template>
  <div>
    <gov-heading size="l">{{ type | ucfirst }} details</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">

        <gov-body>
          General details about the {{ type }}. (We use {{ type }} in the
          broadcast sense, This could be counciling or weekly yoga classes).
        </gov-body>

        <gov-section-break size="l" />

        <ck-select-input
          :value="type"
          @input="onInput('type', $event)"
          id="type"
          label="What is it?"
          hint="This option changes how your page is described on Connected Kingston"
          :options="typeOptions"
          :error="errors.get('type')"
        />

        <ck-text-input
          :value="name"
          @input="onInput('name', $event)"
          id="name"
          :label="`What is the name of your ${type}?`"
          type="text"
          :error="errors.get('name')"
        />

        <ck-text-input
          :value="slug"
          @input="onInput('slug', $event)"
          id="slug"
          label="Unique slug"
          type="text"
          :error="errors.get('slug')"
          v-if="auth.isGlobalAdmin"
        >
          <gov-hint slot="hint" for="slug">
            This will be used to access the {{ type }} page.<br>
            e.g. example.com/services/{{ slug }}
          </gov-hint>
        </ck-text-input>

        <ck-text-input
          :value="url"
          @input="onInput('url', $event)"
          id="url"
          :label="`What is the web address of your ${type}?`"
          :hint="`This must start with ‘http://’ or ‘https://’. You can use your organisation’s website address if the ${type} doesn’t have its own.`"
          type="url"
          :error="errors.get('url')"
        />

        <slot />
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    url: {
      type: String,
      required: true
    },

    errors: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      typeOptions: [
        { text: "It is a Service", value: "service" },
        { text: "It is an Activity", value: "activity" },
        { text: "It is a Club", value: "club" },
        { text: "It is a Group", value: "group" }
      ]
    };
  },

  methods: {
    onInput(field, value) {
      this.$emit(`update:${field}`, value);
    }
  }
};
</script>
