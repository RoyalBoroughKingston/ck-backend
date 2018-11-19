<template>
    <gov-width-container>

        <vue-headful title="Connected Kingston - Edit Thesaurus" />

        <gov-back-link :to="{ name: 'admin-index-thesaurus' }">Back to thesaurus</gov-back-link>
        <gov-main-wrapper>
            <gov-grid-row>
            <gov-grid-column width="one-half">
                <gov-heading size="xl">Thesaurus</gov-heading>
                <gov-heading size="m">Edit Thesaurus</gov-heading>
                <gov-body>Update the synonyms used when searching for services.</gov-body>

                <thesaurus-form
                    :errors="form.$errors"
                    :synonyms.sync="file"
                    @clear="form.$errors.clear($event)"
                />

                <gov-section-break size="l" />

                <gov-button v-if="form.$submitting" disabled type="submit">Updating...</gov-button>
                <gov-button v-else @click="onSubmit" type="submit">Update</gov-button>
                <ck-submit-error v-if="form.$errors.any()" />
            </gov-grid-column>
            </gov-grid-row>
        </gov-main-wrapper>

    </gov-width-container>
</template>

<script>
import Form from "@/classes/Form";
import ThesaurusForm from "@/views/thesaurus/forms/ThesaurusForm";

export default {
    name: "EditThesuarus",

    components: { ThesaurusForm },

    data() {
        return {
            file: null,

            form: new Form({
                synonyms: null
            })
        };
    },

    methods: {
        async onSubmit() {
            const content = this.base64Decode(this.file);
            const synonyms = this.parseCsv(content);

            this.form.synonyms = synonyms;

            await this.form.put("/thesaurus");

            this.$router.push({ name: "admin-index-thesaurus" });
        },

        base64Decode(string) {
            string = string.replace('data:text/csv;base64,', '');
            return atob(string);
        },

        parseCsv(content) {
            let synonyms = content.split(/\n/);
            synonyms = synonyms.map((synonym) => synonym.split(','));
            synonyms = synonyms.map((synonym) => synonym.filter(word => word.length > 1));

            return synonyms;
        }
    }
}
</script>
