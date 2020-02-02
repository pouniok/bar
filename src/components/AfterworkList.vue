<template>
    <v-timeline dense v-if="afterworks.length > 0">
        <v-timeline-item color="#efca50" small v-for="afterwork in afterworks" :key="afterwork.id">
            <v-row class="pt-1 mr-1 rounded card" :class="{ selected: afterwork.id === currentAfterwork.id }"
                   @click="$emit('afterwork-selected', afterwork)">
                <v-col>
                    <strong>{{ afterwork.bar.name }}</strong>
                    <div class="caption">{{ afterwork.date | moment('LL') }}</div>
                </v-col>
            </v-row>
        </v-timeline-item>
    </v-timeline>
    <v-skeleton-loader v-else
           class="mx-auto px-3"
           width="100%"
           type="list-item-avatar-two-line"
    ></v-skeleton-loader>
</template>

<script>
    export default {
        name: "AfterworkList",
        props: ['afterworks', 'currentAfterwork'],
    }
</script>

<style scoped>
    .theme--light.v-timeline:before {
        left: 47px;
    }

    .card {
        background-color: white;
        border: none;
        cursor: pointer;
    }

    .selected.card {
        background-color: #efca50;
        color: #444;
    }

</style>