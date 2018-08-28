<template>
  <gov-width-container>
    <gov-back-link :to="{ name: 'dashboard' }">Back to main site</gov-back-link>
    <gov-main-wrapper>
      <ck-loader v-if="loading" />
      <gov-grid-row v-else>
        <gov-grid-column width="two-thirds">
          <gov-heading size="m">View organisation</gov-heading>
          <gov-table>
            <template slot="body">
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Organisation name</th>
                <td class="govuk-table__cell">{{ organisation.name }}</td>
              </tr>
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Description</th>
                <td class="govuk-table__cell">{{ organisation.description }}</td>
              </tr>
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Website Address</th>
                <td class="govuk-table__cell">{{ organisation.url }}</td>
              </tr>
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Phone number</th>
                <td class="govuk-table__cell">{{ organisation.phone }}</td>
              </tr>
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Email</th>
                <td class="govuk-table__cell">{{ organisation.email }}</td>
              </tr>
              <tr class="govuk-table__row">
                <th class="govuk-table__header" scope="row">Logo</th>
                <td class="govuk-table__cell">
                  <img :src="apiUrl(`/organisations/${organisation.id}/logo`)" alt="Organisation logo">
                </td>
              </tr>
            </template>
          </gov-table>
          <gov-body>Please be certain of the action before deleting an organisation</gov-body>
          <gov-section-break size="l" />
          <gov-button @click="onDelete" class="bg-error">Delete organisation</gov-button>
        </gov-grid-column>
        <gov-grid-column width="one-third" class="text-right">
          <gov-button @click="onEdit">Edit organisation</gov-button>
        </gov-grid-column>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import http from "@/http";

export default {
  name: "ShowOrganisation",
  data() {
    return {
      loading: false,
      organisation: null
    };
  },
  methods: {
    fetchOrganisation() {
      this.loading = true;
      http.get(`/organisations/${this.$route.params.organisation}`)
        .then(({ data }) => {
          this.organisation = data.data;
          this.loading = false;
        });
    },
    onEdit() {
      alert("Edit");
    },
    onDelete() {
      alert("Delete");
    }
  },
  created() {
    this.fetchOrganisation();
  }
};
</script>
