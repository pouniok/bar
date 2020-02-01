<template>
    <div class="text-center">
        <img  v-if="employee.icon" :src="employee.icon" class="rounded mx-auto d-block mb-3" alt="...">
        <img  v-else src="../assets/beer.png" class="rounded mx-auto d-block mb-3" alt="...">

        <h1>{{ employee.firstname }} {{ employee.lastname }}</h1>
        <p>
            {{  moment().diff(employee.birthday, 'years') }} ans, né le {{  moment(employee.birthday).format('LL') }}
        </p>
        <h2>Liste des bars proposés :</h2>
        <ul>
            <li v-for="bar in employee.bars" :key="bar.id">
                {{ bar.name }}
            </li>
        </ul>
        <Map></Map>
    </div>
</template>

<script>
    import Map from "./Map";

    export default {
        name: "EmployeeDetails",
        components: { Map },
        props: ['employee']
    }
</script>

<style scoped>
img {
    max-width: 128px;
    max-height: 128px;
}


</style>