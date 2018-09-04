<template>
  <gov-form-group :invalid="form.$errors.has(path)">
    <gov-label :for="path">Starting date</gov-label>

    <gov-input
      v-model="day"
      :id="`${path}_day`"
      :name="`${path}_day`"
      type="number"
      :width="2"
      placeholder="DD"
      ref="day"
    />&nbsp;<!--
 --><gov-input
      v-model="month"
      :id="`${path}_month`"
      :name="`${path}_month`"
      type="number"
      :width="2"
      placeholder="MM"
      ref="month"
    />&nbsp;<!--
 --><gov-input
      v-model="year"
      :id="`${path}_year`"
      :name="`${path}_year`"
      type="number"
      :width="4"
      placeholder="YYYYY"
      ref="year"
    />

    <gov-error-message
      v-if="form.$errors.has(path)"
      v-text="form.$errors.get(path)"
      :for="path"
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
    form: {
      type: Object,
      required: true
    },
    path: {
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
