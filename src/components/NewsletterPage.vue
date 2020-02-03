<template>
    <div class="layout">
        <div class="d-flex flex-column h-100 sidebar p-3" style="position: relative;" data-app>
            <h4 class="mb-4">Newsletters</h4>

            <div class="container-fluid px-0 hide-scrollbar">
                <NewsletterList @newsletter-selected="showNewsletterDetails"
                              :newsletters="newsletters"
                              :selected="currentNewsLetter" />
            </div>
        </div>

        <div class="main pl-3">
            <NewsletterDetails :newsletter="newsletterContent" />
        </div>
    </div>
</template>

<script>
    import NewsletterList from "./NewsletterList";
    import NewsletterDetails from "./NewsletterDetails";

    export default {
        name: "NewsletterPage",
        inject: ['newsletterService'],
        data: () => {
          return {
              currentNewsLetter: {},
              newsletters: [],
              newsletterContent: {},
          }
        },
        components: {
            NewsletterDetails,
            NewsletterList,
        },
        async created () {
            this.newsletters = await this.newsletterService.getNewsletters()
            this.currentNewsLetter = this.newsletters[0]
            this.newsletterContent = await this.newsletterService.getNewsletter(this.currentNewsLetter.id)
        },
        methods: {
            async showNewsletterDetails(newsletter) {
                this.currentNewsLetter = newsletter
                this.newsletterContent = {}
                this.newsletterContent = await this.newsletterService.getNewsletter(newsletter.id)
            },
        }
    }
</script>

<style scoped>

</style>