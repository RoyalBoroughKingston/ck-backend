<template>
  <gov-form-group :invalid="error !== null">
    <gov-label :for="id" v-text="label" />

    <gov-input
      v-model="day"
      :id="`${id}_day`"
      :name="`${id}_day`"
      type="number"
      :width="2"
      placeholder="DD"
    />&nbsp;<!--
 --><gov-input
      v-model="month"
      :id="`${id}_month`"
      :name="`${id}_month`"
      type="number"
      :width="2"
      placeholder="MM"
    />&nbsp;<!--
 --><gov-input
      v-model="year"
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
      year = isNaN(year) ? 0 : year;

      let month = parseInt(this.month);
      month = isNaN(month) ? 0 : month;
      month--;

      let day = parseInt(this.day);
      day = isNaN(day) ? 0 : day;

      const date = moment({ year, month, day });

      this.$emit("input", date.format(moment.HTML5_FMT.DATE));
    }
  },
  watch: {
    value(newValue) {
      if (newValue !== null) {
        const date = moment(newValue, moment.HTML5_FMT.DATE);
        this.year = moment.year;
        this.month = moment.month;
        this.day = moment.day;
      }
    },
    year() {
      this.onInput();
    },
    month() {
      this.onInput();
    },
    day() {
      this.onInput();
    }
  }
};
</script>
