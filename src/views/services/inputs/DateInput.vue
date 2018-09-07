<template>
  <gov-form-group :invalid="error !== null">
    <gov-label :for="id" v-text="label" />

    <gov-input
      v-model="day"
      @input="onInput"
      :id="`${id}_day`"
      :name="`${id}_day`"
      type="number"
      :width="2"
      placeholder="DD"
    />&nbsp;<!--
 --><gov-input
      v-model="month"
      @input="onInput"
      :id="`${id}_month`"
      :name="`${id}_month`"
      type="number"
      :width="2"
      placeholder="MM"
    />&nbsp;<!--
 --><gov-input
      v-model="year"
      @input="onInput"
      :id="`${id}_year`"
      :name="`${id}_year`"
      type="number"
      :width="4"
      placeholder="YYYYY"
    />

    <gov-error-message
      v-if="error"
      v-text="error"
      :for="id"
    />
  </gov-form-group>
</template>

<script>
import moment from "moment";

export default {
  name: "StartsAtInput",
  props: {
    value: {
      required: true
    },
    error: {
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      year: "",
      month: "",
      day: ""
    };
  },
  methods: {
    onInput() {
      let year = parseInt(this.year);
      let month = parseInt(this.month);
      let day = parseInt(this.day);

      // Only parse the date if the inputs are all valid.
      for (let value of [year, month, day]) {
        if (isNaN(value)) {
          this.$emit("input", "");
          return;
        }
      }

      let date = moment({ year, month: (month - 1), day }).format(moment.HTML5_FMT.DATE);

      // Only return the date if it's vaild.
      if (date === "Invalid date") {
        this.$emit("input", "");
        return;
      }

      this.$emit("input", date);
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      if (newValue !== "") {
        const date = moment(newValue, moment.HTML5_FMT.DATE);
        this.year = date.year().toString();
        this.month = (date.month() + 1).toString();
        this.day = date.date().toString();
      }
    }
  }
};
</script>
