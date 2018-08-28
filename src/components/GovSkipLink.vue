<template>
    <a :href="href" class="govuk-skip-link">
        <slot />
    </a>
</template>

<script>
export default {
    name: 'GovSkipLink',
    props: {
        href: {
            type: String,
            required: false,
            default: "#content"
        }
    }
}
</script>
