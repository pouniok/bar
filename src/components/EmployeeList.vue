<template>
    <!-- Chats -->
    <nav class="nav d-block list-discussions-js mb-5">
        <!-- Chat link -->
        <a class="text-reset nav-link p-0 mb-4"
           href="#" v-for="employee in employeesFiltered"
           :key="employee.id"
           :class="{ 'selected': isSelected(employee) }"
           @click="$emit('employee-selected', employee)">
            <EmployeeListItem  :employee="employee" />
        </a>
        <!-- Chat link -->

    </nav>
    <!-- Chats -->
</template>

<script>
  import EmployeeListItem from "./EmployeeListItem";

  export default {
    name: 'EmployeeList',
    inject: ['employeeService'],
    components: {
        EmployeeListItem
    },
    props: ['employees', 'selected', 'searchText'],
    computed: {
        barCount() {
            const barCount = [].concat(this.employee.bars).length;
            const s = barCount > 1 ? 's' : '';

            return `${barCount} bar${s} proposé${s}`;
        },
        employeesFiltered() {
            let employees = this.employees

            if (this.searchText)
                employees = this.employees.filter(e => e.firstname.toLowerCase().includes(this.searchText)
                    || e.lastname.toLowerCase().includes(this.searchText))

            return employees
        }
    },
    methods: {
        isSelected(employee) {
            return  this.selected && employee.id === this.selected.id
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
