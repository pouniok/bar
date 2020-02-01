<template>
    <div class="text-center d-flex flex-column h-100">
        <div>
            <img  v-if="employee.icon" :src="employee.icon" class="rounded mx-auto d-block mb-3" alt="...">
            <img  v-else src="../assets/beer.png" class="rounded mx-auto d-block mb-3" alt="...">

            <h1>{{ employee.firstname }} {{ employee.lastname }}</h1>
            <p>
                {{  moment().diff(employee.birthday, 'years') }} ans, né le {{  moment(employee.birthday).format('LL') }}
            </p>
        </div>

        <div class="card-deck m-4">
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
                    <button class="btn btn-danger" @click="removeBar(employee, bar)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MapCard from "./MapCard";

    export default {
        name: "EmployeeDetails",
        components: { MapCard },
        props: ['employee'],
        methods: {
            removeBar(employee, bar) {
                // TODO not implemented
                console.log('removeBar', employee, bar)
            }
        }
    }
</script>

<style scoped>
img {
    max-width: 128px;
    max-height: 128px;
}


</style>