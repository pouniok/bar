<template>
    <div class="layout">
        <div class="d-flex flex-column h-100 sidebar " style="position: relative;" data-app>
            <h4 class="my-4 pl-4">Sorties</h4>

            <div class="container-fluid px-0 hide-scrollbar py-3 pr-3">
                <AfterworkList :afterworks="afterworks"
                               :currentAfterwork="currentAfterwork"
                                @afterwork-selected="selectAfterwork" />
            </div>
        </div>

        <div class="main pt-3 pl-3">
            <div class="d-flex flex-column h-100 position-relative">
                <AfterworkDetails :afterwork="currentAfterwork" />
                <MapBars :bars="bars" :afterwork="currentAfterwork" @bar-selected="barSelected" />
            </div>
        </div>
    </div>
</template>

<script>
    import AfterworkList from "./AfterworkList";
    import AfterworkDetails from "./AfterworkDetails";
    import MapBars from "./MapBars";

    export default {
        name: "AfterworkPage",
        components: {MapBars, AfterworkDetails, AfterworkList},
        inject: ['afterworkService'],
        data: () => {
            return {
                afterworks: [],
                currentAfterwork: null,
                bars: [],
            }
        },
        async created() {
            this.afterworks = await this.afterworkService.getAfterworks()
            this.currentAfterwork = this.afterworks[0]

            this.bars = await this.afterworkService.getBars()
        },
        methods: {
            selectAfterwork(afterwork) {
                this.currentAfterwork = this.afterworks.find(aw => aw.id === afterwork.id)
            },
            barSelected(bar) {
                console.log('bar', bar)
            }
        },
    }
</script>

<style scoped>

</style>