<template>
  <div>
    <gov-heading size="l">Who is it for?</gov-heading>
    <gov-table>
      <template slot="body">
        <gov-table-row>
          <gov-table-header scope="row" top
            >Age of service user</gov-table-header
          >
          <gov-table-cell>{{
            service.criteria.age_group || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Disability requirements</gov-table-header
          >
          <gov-table-cell>{{
            service.criteria.disability || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Gender specific</gov-table-header>
          <gov-table-cell>{{
            service.criteria.gender || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Specific housing status</gov-table-header
          >
          <gov-table-cell>{{
            service.criteria.housing || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top>Income</gov-table-header>
          <gov-table-cell>{{
            service.criteria.income || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Language accessibility</gov-table-header
          >
          <gov-table-cell>{{
            service.criteria.language || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
        <gov-table-row>
          <gov-table-header scope="row" top
            >Any other notes as to whom the {{ service.type }} is aimed at/not
            appropriate for?</gov-table-header
          >
          <gov-table-cell>{{
            service.criteria.other || "No specific requirement"
          }}</gov-table-cell>
        </gov-table-row>
      </template>
    </gov-table>
  </div>
</template>

<script>
export default {
  name: "WhoForTab",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
};
</script>
