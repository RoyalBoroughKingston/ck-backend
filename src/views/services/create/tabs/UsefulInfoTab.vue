<template>
  <div>
    <gov-heading size="l">Useful information</gov-heading>
    <gov-grid-row>
      <gov-grid-column width="one-half">
        <gov-body>This is a space to add really useful information about your service. This could be tips on getting there, what you need to bring or anything else. Please select a title from the drop downs and add details below</gov-body>
        <gov-body>If you can't think of anything, or have already included it elsewhere you can <gov-link @click="$emit('next')">skip this section</gov-link></gov-body>
        <gov-section-break size="l" />

        <!-- Useful info -->
        <gov-inset-text v-for="(usefulInfo, index) in form.useful_infos" :key="usefulInfo.index">
          <!-- Useful info title -->
          <gov-form-group :invalid="form.$errors.has(`useful_infos.${index}.title`)">
            <gov-label class="govuk-!-font-weight-bold" :for="`useful_infos.${index}.title`">
              Pick a title from the dropdown to describe the additional information below.
            </gov-label>
            <gov-hint :for="`useful_infos.${index}.title`">
              Title of the helpful piece of information below
            </gov-hint>
            <gov-select
              :value="form.useful_infos[index].title"
              @input="$emit('update:useful_infos_title', { index, value: $event })"
              :id="`useful_infos.${index}.title`"
              :name="`useful_infos.${index}.title`"
              :options="usefulInfoTitleOptions"
            />
            <gov-error-message
              v-if="form.$errors.has(`useful_infos.${index}.title`)"
              v-text="form.$errors.get(`useful_infos.${index}.title`)"
              :for="`useful_infos.${index}.title`"
            />
          </gov-form-group>
          <!-- /Useful info title -->

          <!-- Useful info description -->
          <gov-form-group :invalid="form.$errors.has(`useful_infos.${index}.description`)">
            <gov-hint :for="`useful_infos.${index}.description`">
              Space for service to add any helpful bits of information
              relating to the title above eg. "There is no free parking on
              site, however and display is available on [road]" (max.
              150 characters)
            </gov-hint>
            <gov-textarea
              :value="form.useful_infos[index].description"
              @input="$emit('update:useful_infos_description', { index, value: $event })"
              :id="`useful_infos.${index}.description`"
              :name="`useful_infos.${index}.description`"
            />
            <gov-error-message
              v-if="form.$errors.has(`useful_infos.${index}.description`)"
              v-text="form.$errors.get(`useful_infos.${index}.description`)"
              :for="`useful_infos.${index}.description`"
            />
          </gov-form-group>
          <!-- /Useful info description -->

          <gov-button @click="onDeleteUsefulInfo(index)" error>Delete</gov-button>
        </gov-inset-text>
        <!-- /Useful info -->

        <div>
          <gov-button @click="onAddUsefulInfo">
            <template v-if="form.useful_infos.length === 0">Add useful info</template>
            <template v-else>Add another</template>
          </gov-button>
        </div>

        <gov-button @click="$emit('next')" start>Next</gov-button>
      </gov-grid-column>
    </gov-grid-row>
  </div>
</template>

<script>
export default {
  name: "UsefulInfoTab",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      usefulInfoTitleOptions: [
        { text: "Please select", value: "", disabled: true },
        { text: "Getting here", value: "Getting here" },
        { text: "Signing up", value: "Signing up" },
        { text: "Meeting up", value: "Meeting up" },
        { text: "What to wear", value: "What to wear" },
        { text: "What to bring", value: "What to bring" },
        { text: "How to get here", value: "How to get here" },
        { text: "Parking", value: "Parking" },
        { text: "Keeping updated", value: "Keeping updated" },
        { text: "Additional information", value: "Additional information" }
      ],
      usefulInfosIndex: 1
    };
  },
  methods: {
    onAddUsefulInfo() {
      this.$emit("add", {
        title: "",
        description: "",
        order: this.form.useful_infos.length + 1,
        index: this.usefulInfosIndex
      });

      this.usefulInfosIndex++;
    },
    onDeleteUsefulInfo(deleteIndex) {
      this.$emit("clear", `useful_infos.${deleteIndex}.title`);
      this.$emit("clear", `useful_infos.${deleteIndex}.title`);
      this.$emit("clear", `useful_infos.${deleteIndex}.description`);
      this.$emit("clear", `useful_infos.${deleteIndex}.order`);
      this.$emit("delete", deleteIndex);

      // Also decrement the order for the other useful infos.
      this.form.useful_infos.forEach((usefulInfo, index) => {
        if (index < deleteIndex) {
          return;
        }

        this.$emit("update:useful_infos_order", {
          index,
          value: usefulInfo.order - 1
        });
      });
    }
  },
  watch: {
    "form.useful_infos": {
      handler(usefulInfos) {
        this.usefulInfoTitleOptions.forEach((usefulInfoTitleOption, index) => {
          if (usefulInfoTitleOption.value === "") {
            return;
          }

          const hasBeenUsed =
            usefulInfos.find(
              usefulInfo => usefulInfo.title === usefulInfoTitleOption.value
            ) !== undefined;
          const newOption = { ...usefulInfoTitleOption, disabled: hasBeenUsed };
          this.$set(this.usefulInfoTitleOptions, index, newOption);
        });
      },
      deep: true
    }
  }
};
</script>
