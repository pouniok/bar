<template>
    <div class="text-center">
        <v-menu top left :close-on-click="true" :close-on-content-click="true" v-if="afterwork && afterwork.id">
            <template v-slot:activator="{ on }">
                <v-btn light icon v-on="on" absolute top right>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item>
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-list-item-title class="p-3 btn" v-on="on">Supprimer</v-list-item-title>
                        </template>
                        <v-card>
                            <v-card-title class="headline">Suppression</v-card-title>
                            <v-card-text>Voulez-vous vraiment supprimer la sortie {{ afterwork.bar.name }} ?</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="dialog = false">Annuler</v-btn>
                                <v-btn text @click="removeAfterwork(afterwork)" class="text-danger">Valider</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-list-item>
            </v-list>
        </v-menu>
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
        data: () => {
            return {
                dialog: null
            }
        },
        methods: {
            removeAfterwork(afterwork) {
                this.dialog = false
                this.$emit('afterwork-remove', afterwork )
            }
        },
    }
</script>

<style scoped>

</style>