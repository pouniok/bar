<template>
    <div class="text-center">
        <div v-if="afterwork && afterwork.id">
            <h1>{{ afterwork.bar.name }}</h1>
            <p> {{  afterwork.date | moment('LL') }}, {{ moment(afterwork.date).fromNow() }}</p>
        </div>
        <v-skeleton-loader v-else
                           class="mx-auto p-3"
                           width="400"
                           type="card-heading, text">
        </v-skeleton-loader>
    </div>
</template>

<script>
    export default {
        name: "AfterworkDetails",
        props: ['afterwork'],
    }
</script>

<style scoped>

</style>