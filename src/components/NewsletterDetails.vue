<template>
    <div class="text-center d-flex flex-column h-100 position-relative hide-scrollbar">
            <div v-if="newsletter && newsletter.archive_html" v-html="newsletter.archive_html">
            </div>
            <v-skeleton-loader v-else
               class="mx-auto pl-3"
               width="400"
               type="image, card-heading, text">
            </v-skeleton-loader>
    </div>
</template>

<script>
    export default {
        name: "NewsletterDetails",
        props: ['newsletter'],
        watch: {
            newsletter(nl){
                console.log(nl)
            }
        }
    }
</script>

<style scoped>

</style>