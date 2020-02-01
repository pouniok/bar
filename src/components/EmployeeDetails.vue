<template>
    <div class="text-center d-flex flex-column h-100">
        <div>
            <img  v-if="employee.icon" :src="employee.icon" class="rounded mx-auto d-block mb-3" alt="Employee icon">
            <img  v-else src="../assets/beer.png" class="rounded mx-auto d-block mb-3" alt="Employee icon">

            <h1>{{ employee.firstname }} {{ employee.lastname }}</h1>
            <p>
                {{  moment().diff(employee.birthday, 'years') }} ans, né le {{  moment(employee.birthday).format('LL') }}
            </p>
        </div>

        <template v-if="(employee.bars ||[]).length < 2">
            <gmap-autocomplete @place_changed="setPlace"
                               @input="searchPlace = $event.target.value"
                               :value="searchPlace"
                               class="form-control" />
        </template>
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
                    <button class="btn btn-danger" @click="$emit('employee-bar-remove', { employee, bar })">Supprimer</button>
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
        data: () => {
          return {
              searchPlace: ''
          }
        },
        methods: {
            setPlace(place) {
                this.$emit('employee-bar-add', { employee: this.employee, place })
                this.searchPlace = ''
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
</style>