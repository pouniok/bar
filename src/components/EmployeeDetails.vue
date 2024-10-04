<template>
    <div class="text-center d-flex flex-column h-100 position-relative">
            <v-menu top left :close-on-click="true" :close-on-content-click="true">
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
                                <v-card-text>Voulez-vous vraiment supprimer {{ employee.firstname }} ?</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="dialog = false">Annuler</v-btn>
                                    <v-btn text @click="removeEmployee(employee)" class="text-danger">Valider</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-list-item>
                </v-list>
            </v-menu>
            <div v-if="employee && employee.id">
                <vue-dropzone id="employeeDropZone" class="p-3"
                            :options="dropzoneOptions"
                            :includeStyling="false"
                            :useCustomSlot="true"
                            @vdropzone-sending="sendingEvent"
                            @vdropzone-thumbnail="changePicture">
                    <img  v-if="employee.icon" :src="employee.icon" class="rounded mx-auto d-block" alt="Employee icon">
                    <img  v-else src="../assets/beer.png" class="rounded mx-auto d-block" alt="Employee icon">
                </vue-dropzone>
                <h1>{{ employee.firstname }} {{ employee.lastname }}</h1>
                <p>
                    {{  moment().diff(employee.birthday, 'years') }} ans, né le {{  moment(employee.birthday).format('LL') }}
                </p>
            </div>
            <v-skeleton-loader v-else
               class="mx-auto p-3"
               width="400"
               type="image, card-heading, text">
            </v-skeleton-loader>

            <template v-if="(employee.bars ||[]).length < 2">
                <gmap-autocomplete @place_changed="setPlace"
                                   @input="searchPlace = $event.target.value"
                                   :value="searchPlace"
                                   class="form-control" />
            </template>
            <div class="card-deck m-4">
                <template v-if="employee && employee.id" >
                    <div class="card" v-for="bar in employee.bars" :key="bar.id">
                        <MapCard :bar="bar" />
                        <div class="card-body text-left">
                            <h5 class="card-title">{{ bar.name }}</h5>
                            <p class="card-text">
                                <i class="far fa-check-circle" style="color: #69B055" :hidden="!bar.validated"></i>
                                {{ bar.validated ? 'Déjà Visité' : 'Jamais visité' }}
                            </p>
                        </div>
                        <div class="card-body text-right">
                            <button class="btn btn-danger" @click="$emit('employee-bar-remove', { employee, bar })">Supprimer</button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <v-skeleton-loader v-for="i in [0, 1]" :key="i"
                       class="card"
                       type="card, sentences, actions">
                    </v-skeleton-loader>
                </template>
            </div>
    </div>
</template>

<script>
    import MapCard from "./MapCard";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'


    export default {
        name: "EmployeeDetails",
        components: { MapCard, vueDropzone: vue2Dropzone },
        props: ['employee'],
        data() {
          return {
              searchPlace: '',
              dialog: null,
              dropzoneOptions: {
                  url: 'https://api.godhateusall.com/?action=employee-picture',
                  thumbnailWidth: 128,
                  previewTemplate : '<div style="display:none"></div>',
                  headers: { "Cache-Control": "", "X-Requested-With": "" }
              }
          }
        },
        methods: {
            setPlace(place) {
                this.$emit('employee-bar-add', { employee: this.employee, place })
                this.searchPlace = ''
            },
            sendingEvent (file, xhr, formData) {
                formData.append('id', this.employee.id)
            },
            changePicture(file, dataUrl) {
                this.employee.icon = dataUrl;
            },
            removeEmployee(employee) {
                this.$emit('employee-remove', employee)
                this.dialog = false
            }
        }
    }
</script>

<style scoped>
img {
    max-width: 128px;
    min-height: 128px;
    max-height: 128px;
}

#employeeDropZone {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    border: 4px solid white;
}

#employeeDropZone:hover {
    border: 4px dashed #ffcc00;
}
</style>