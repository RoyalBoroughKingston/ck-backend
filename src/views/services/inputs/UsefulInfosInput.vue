<template>
  <div>
    <gov-inset-text v-for="(usefulInfo, index) in usefulInfos" :key="usefulInfo.index">
      <ck-select-input
        :value="usefulInfo.title"
        @input="onTitleInput({ index, value: $event })"
        :id="`useful_infos.${index}.title`"
        label="Pick a title from the drop down:"
        :options="usefulInfoTitleOptions"
        :error="errors.get(`useful_infos.${index}.title`)"
      />

      <ck-wysiwyg-input
        :value="usefulInfo.description"
        @input="onDescriptionInput({ index, value: $event })"
        :id="`useful_infos.${index}.description`"
        label="Description"
        hint="Provide detail to the title above. For example, if you picked ‘Parking’ you might say “There is no parking available on site, however there is pay and display opposite”."
        :maxlength="150"
        :error="errors.get(`useful_infos.${index}.description`)"
        :extensions="extensions"
      />

      <gov-button @click="onDeleteUsefulInfo(index)" error>Delete</gov-button>
    </gov-inset-text>

    <div>
      <gov-button @click="onAddUsefulInfo">
        <template v-if="usefulInfos.length === 0">Add useful info</template>
        <template v-else>Add another</template>
      </gov-button>
    </div>
  </div>
</template>

<script>
import { Link } from "tiptap-extensions";

export default {
  name: "UsefulInfosInput",
  model: {
    prop: "usefulInfos",
    event: "input"
  },
  props: {
    usefulInfos: {
      required: true,
      type: Array
    },
    errors: {
      required: true,
      type: Object
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
      usefulInfosIndex: 1,
      extensions: [new Link()],
    };
  },
  methods: {
    cloneUsefulInfos() {
      return this.usefulInfos.map(usefulInfo => ({ ...usefulInfo }));
    },
    onAddUsefulInfo() {
      let usefulInfos = this.cloneUsefulInfos();
      usefulInfos.push({
        title: "",
        description: "",
        order: this.usefulInfos.length + 1,
        index: this.usefulInfosIndex
      });

      this.usefulInfosIndex++;
      this.$emit("input", usefulInfos);
    },
    onDeleteUsefulInfo(deleteIndex) {
      this.$emit("clear", `useful_infos.${deleteIndex}.title`);
      this.$emit("clear", `useful_infos.${deleteIndex}.title`);
      this.$emit("clear", `useful_infos.${deleteIndex}.description`);
      this.$emit("clear", `useful_infos.${deleteIndex}.order`);

      // Also decrement the order for the other useful infos.
      let usefulInfos = this.cloneUsefulInfos();
      this.$delete(usefulInfos, deleteIndex);
      usefulInfos.forEach((usefulInfo, index) => {
        if (index < deleteIndex) {
          return;
        }

        usefulInfo.order--;
      });
      this.$emit("input", usefulInfos);
    },
    onTitleInput({ index, value }) {
      let usefulInfos = this.cloneUsefulInfos();
      usefulInfos[index].title = value;
      this.$emit("input", usefulInfos);
      this.$emit("clear", `useful_infos.${index}.title`);
    },
    onDescriptionInput({ index, value }) {
      let usefulInfos = this.cloneUsefulInfos();
      usefulInfos[index].description = value;
      this.$emit("input", usefulInfos);
      this.$emit("clear", `useful_infos.${index}.description`);
    }
  },
  watch: {
    usefulInfos: {
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
