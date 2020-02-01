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

        <Map :bars="employee.bars" />
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