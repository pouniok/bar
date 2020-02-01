<template>
    <div class="h-100">
        <gmap-map ref="map"
                :center="center"
                :zoom="13"
                style="width:100%; height: 100%;">
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="markerClick(m)"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: "GoogleMap",
        props: ['bars'],
        computed: {
            google: gmapApi,

            markers() {
                const markers = [];
                const google = this.google;

                if (this.bars && this.bars.length > 0) {
                    this.bars.forEach(bar => {
                        const pos = new google.maps.LatLng(bar.lat, bar.lng)
                        this.bounds.extend(pos);

                        markers.push({
                            position: pos,
                            icon: {
                                url: 'img/marker.png',
                                scaledSize: new google.maps.Size(50, 50),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(25, 25)
                            },
                            map: this.map,
                            data: bar,
                            animation: google.maps.Animation.DROP
                        })
                    })
                }

                if (this.map)
                    this.map.fitBounds(this.bounds)

                return markers
            }
        },
        data() {
            return {
                center: {lat: 44.841411, lng: -0.576344},
                map: null,
                bounds: null
            };
        },

        mounted() {
            this.$refs.map.$mapPromise.then((map) => {
                this.map = map
                this.map.setOptions({
                    disableDefaultUI: true,
                    mapTypeControl: false
                });

                this.bounds = new this.google.maps.LatLngBounds()
            })
        },

        methods: {
            markerClick(marker) {
                const infoWindow = new this.google.maps.InfoWindow;
                const data = marker.bar || {};

                infoWindow.setContent('<div class="tip"><h2>'+data.name+'</h2>');
                infoWindow.open(this.map, this);
            }
        }
    };
</script>