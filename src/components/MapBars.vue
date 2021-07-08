<template>
    <div class="h-100">
        <gmap-map ref="mapRef"
                :center="center"
                :zoom="12"
                map-type-id="roadmap"
                :options="{
                   mapTypeControl: false,
                   disableDefaultUI: true,
                   styles: [{
                       featureType: 'poi',
                       elementType: 'labels',
                       stylers: [{ visibility: 'off' }]
                    }]
                 }"
                style="width:100%; height: 100%">

            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false" />

            <gmap-marker v-for="bar in bars" :key="bar.id" v-bind="bar" ref="markers"
                     :position="getPosition(bar)"
                     :clickable="true"
                     @click="toggleInfoWindow(bar, bar.id)"
            />
            <gmap-marker v-if="google"
                         :position="google && new google.maps.LatLng(44.835292, -0.567904)"
                         :clickable="true"
                         @click="toggleInfoWindow({
                            lat: 44.835292,
                            lng: -0.567904,
                            name: 'Café des moines',
                            cdm: true
                         }, 0)"
                         :icon="{
                             url: 'https://bar.godhateusall.com/img/skull.png',
                             scaledSize: new google.maps.Size(50, 50),
                             origin: new google.maps.Point(0, 0),
                             anchor: new google.maps.Point(25, 25)
                         }"
            />
        </gmap-map>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn class="fab" dark absolute bottom right fab v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Nouveau tirage</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-label>Date du prochain bar</v-label>
                                <v-date-picker
                                        v-model="nextbar"
                                        full-width
                                        :landscape="$vuetify.breakpoint.smAndUp"
                                        locale="fr-fr"
                                        :show-current="false"
                                        first-day-of-week="1"
                                        color="#dc3545"
                                        class="mt-4"
                                ></v-date-picker>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">Annuler</v-btn>
                    <v-btn text @click="randomBar" class="text-danger">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: "MapBars",
        props: ['bars'],
        computed: {
            google: gmapApi
        },
        watch: {
            bars(bars) {
                if (bars.length > 2) {
                    while (!this.google);

                    const bounds = new this.google.maps.LatLngBounds()
                    for (let bar of bars) {
                        bounds.extend(this.getPosition(bar))
                    }

                    this.$refs.mapRef.$mapPromise.then((map) => {
                        map.fitBounds(bounds)
                    })
                }
            }
        },
        methods: {
            getPosition(bar) {
                return bar && { lat: Number(bar.lat), lng: Number(bar.lng) }
            },
            toggleInfoWindow(bar, idx) {
                this.infoWindowPos = this.getPosition(bar)
                this.infoOptions.content = `
                    <div class="text-center">
                        <h4>${bar.name}</h4>
                        <p>${ bar.validated ? '<i class="far fa-check-circle" style="color: #69B055"></i> Déjà Visité' :
                        (bar.cdm ? '<i class="fas fa-radiation" style="color: #F46660"></i> FUYEZ §§' : 'Jamais visité') }</p>
                        ${ bar.employees.map(e =>
                            '<div class="people">' +
                            (e.icon ? '<img src="'+e.icon+'" class="avatar" />' : '<span class="fa-stack fa-2x">' +
                                '  <i class="fas fa-circle fa-stack-2x"></i>' +
                                '  <i class="fas fa-user fa-stack-1x fa-inverse"></i>' +
                                '</span>') +
                            '<br/><b>'+e.firstname+'</b><br/>'+e.lastname +
                            '</div>'
                        ).join('') }
                    </div>
                `

                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
                }
            },
            randomBar() {
                this.dialog = false
                let i = 0

                const markers = this.$refs.markers
                const bars = this.bars.filter(bar => !bar.validated)

                function showRandomBar() {
                    const bar = bars[Math.floor(Math.random()*bars.length)];
                    const marker = markers.find(marker => marker.$attrs.id === bar.id)

                    this.toggleInfoWindow(bar, bar.id)

                    if (i++ < 50) {
                        setTimeout(showRandomBar.bind(this), 200);
                    }
                    else {
                        marker.$markerObject.setAnimation(this.google.maps.Animation.BOUNCE);

                        this.$refs.mapRef.$mapPromise.then((map) => {
                            map.setCenter(marker.$markerObject.getPosition());
                        })

                        this.$emit('bar-selected', { bar, date: this.nextbar } )
                    }
                }

                showRandomBar.call(this)
            },
            getNextWednesday(nextDate) {
                return nextDate.isoWeekday() === 3 ? nextDate : nextDate.add((11 - nextDate.isoWeekday()), 'day')
            }
        },
        created() {
            let nextDate = this.getNextWednesday(this.moment().startOf('month'))

            if (nextDate.isBefore(this.moment(), 'day'))
                nextDate = this.getNextWednesday(this.moment().add(1, 'month').startOf('month'))

            this.nextbar = nextDate.toISOString().substr(0, 10)
        },
        data() {
            return {
                center: {lat: 44.841411, lng: -0.576344},
                nextbar: new Date().toISOString().substr(0, 10),
                dialog: null,
                infoWindowPos: null,
                infoWinOpen: false,
                currentMidx: null,
                infoOptions: {
                    content: '',
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
            };
        }
    };
</script>

<style>
    .people {
        display: inline-block;
        padding: 10px;
        text-align: center;
    }

    .people .avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
</style>