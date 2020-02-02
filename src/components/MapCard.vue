<template>
    <div class="card-img-top">
        <gmap-map
                :center="center"
                :zoom="17"
                :options="{
                   mapTypeControl: false,
                   disableDefaultUI: true,
                 }"
                style="width:100%; height: 300px">
            <gmap-marker
                    :position="position"
                    @click="markerClick(m)"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: "GoogleMap",
        props: ['bar'],
        computed: {
            google: gmapApi,

            position() {
                return this.bar && { lat: Number(this.bar.lat), lng: Number(this.bar.lng) }
            }
        },
        mounted() {
            this.center = this.position
        },
        data() {
            return {
                center: {lat: 44.841411, lng: -0.576344}
            };
        }
    };
</script>