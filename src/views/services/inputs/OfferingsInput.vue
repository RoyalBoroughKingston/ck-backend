<template>
  <div>
    <gov-inset-text v-for="(offering, index) in offerings" :key="offering.index">
      <ck-text-input
        :value="offering.offering"
        @input="onOfferingInput({ index, value: $event })"
        :id="`offerings.${index}.offering`"
        label="Offering"
        :error="errors.get(`offerings.${index}.offering`)"
      />

      <gov-button @click="onDeleteOffering(index)" error>Delete</gov-button>
    </gov-inset-text>

    <div>
      <gov-button @click="onAddOffering">
        <template v-if="offerings.length === 0">Add offering</template>
        <template v-else>Add another</template>
      </gov-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OfferingsInput",
  model: {
    prop: "offerings",
    event: "input"
  },
  props: {
    offerings: {
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
      offeringsIndex: 1
    };
  },
  methods: {
    cloneOfferings() {
      return this.offerings.map(offering => ({ ...offering }));
    },
    onAddOffering() {
      let offerings = this.cloneOfferings();
      offerings.push({
        offering: "",
        order: this.offerings.length + 1,
        index: this.offeringsIndex
      });

      this.offeringsIndex++;
      this.$emit("input", offerings);
    },
    onDeleteOffering(deleteIndex) {
      this.$emit("clear", `offerings.${deleteIndex}.offering`);
      this.$emit("clear", `offerings.${deleteIndex}.order`);

      // Also decrement the order for the other offerings.
      let offerings = this.cloneOfferings();
      this.$delete(offerings, deleteIndex);
      offerings.forEach((offering, index) => {
        if (index < deleteIndex) {
          return;
        }

        offering.order--;
      });
      this.$emit("input", offerings);
    },
    onOfferingInput({ index, value }) {
      let offerings = this.cloneOfferings();
      offerings[index].offering = value;
      this.$emit("input", offerings);
      this.$emit("clear", `offerings.${index}.offering`);
    }
  }
};
</script>
