<template>
  <gov-grid-row>
    <gov-grid-column width="two-thirds">
      <gov-heading size="l">Stop Words</gov-heading>

      <gov-body>
        From this page, you can review the list of 'stop words' on the keyword
        search. 'Stop words' are common and generic words that are used in a
        number of different phrases and therefore would generate large numbers
        of search results. By adding the words to this list, they will be
        removed from a search query before it searches the database.
      </gov-body>

      <ck-loader v-if="loading" />
      <gov-button v-else @click="onExportCsv">Download stop words</gov-button>

      <gov-heading size="m">All stop words</gov-heading>

      <ck-loader v-if="loading" />
      <gov-list v-else bullet>
        <li v-for="(stopWord, index) in stopWords" :key="`StopWord-${index}`">
          {{ stopWord }}
        </li>
      </gov-list>
    </gov-grid-column>

    <gov-grid-column v-if="auth.isGlobalAdmin" width="one-third">
      <gov-button :to="{ name: 'stop-words-edit' }" expand
        >Edit stop words</gov-button
      >
    </gov-grid-column>
  </gov-grid-row>
</template>

<script>
import http from '@/http'

export default {
  name: 'ListStopWords',

  data() {
    return {
      loading: false,
      stopWords: [],
      currentPage: 1,
      lastPage: 1,
    }
  },

  methods: {
    async fetchStopWords() {
      this.loading = true

      const { data } = await http.get('/stop-words')
      this.stopWords = data.data

      this.loading = false
    },

    onExportCsv() {
      let csvContent = 'data:text/csv;charset=utf-8,'

      this.stopWords.forEach(stopWord => {
        csvContent += stopWord + '\r\n'
      })

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'stop-words.csv')
      document.body.appendChild(link)
      link.click()
    },
  },

  created() {
    this.fetchStopWords()
  },
}
</script>
