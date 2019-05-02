<template>
  <div>
    <gov-heading size="l">Good to know</gov-heading>
    <gov-table>
      <template slot="body">
        <gov-table-row v-for="usefulInfo in usefulInfos" :key="usefulInfo.order">
          <gov-table-header scope="row" top>{{ usefulInfo.title }}</gov-table-header>
          <gov-table-cell v-html="toHtml(usefulInfo.description)" />
        </gov-table-row>
        <gov-table-row v-if="usefulInfos.length === 0">
          <gov-table-cell colspan="2">No useful info specified for this {{ service.type }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
export default {
  name: "ServiceUsefulInfoTab",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      usefulInfos: []
    };
  },
  created() {
    this.usefulInfos = this.service.useful_infos.sort((a, b) => {
      return a.order - b.order;
    });
  }
};
</script>
