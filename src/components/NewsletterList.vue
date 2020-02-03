<template>
    <nav class="nav d-block list-discussions-js mb-5">
        <template v-if="newsletters.length > 0">
            <a class="text-reset nav-link p-0 mb-4"
               href="#" v-for="newsletter in newsletters"
               :key="newsletter.id"
               :class="{ 'selected': isSelected(newsletter) }"
               @click="$emit('newsletter-selected', newsletter)">
                <div class="card border-light rounded-lg">
                    <div class="card-body">
                        <h6>{{ newsletter.settings.title }}</h6>
                        Envoyée le {{ newsletter.send_time | moment('LL') }}
                    </div>
                </div>
            </a>
        </template>
        <v-skeleton-loader v-else
               class="mx-auto"
               width="100%"
               type="list-item-avatar-two-line"
        ></v-skeleton-loader>
    </nav>
</template>

<script>

  export default {
    name: 'NewsletterList',
    props: ['newsletters', 'selected'],
    methods: {
        isSelected(newsletter) {
            return  this.selected && newsletter.id === this.selected.id
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .selected .card {
        background-color: #efca50;
    }

    .selected .text-truncate {
        color: #333;
    }
</style>
