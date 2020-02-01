<template>
    <nav class="nav d-block list-discussions-js mb-5">
        <template v-if="employees.length > 0">
            <a class="text-reset nav-link p-0 mb-4"
               href="#" v-for="employee in employeesFiltered"
               :key="employee.id"
               :class="{ 'selected': isSelected(employee) }"
               @click="$emit('employee-selected', employee)">
                <EmployeeListItem  :employee="employee" />
            </a>
        </template>
        <v-skeleton-loader v-else
               class="mx-auto"
               width="100%"
               type="list-item-avatar-two-line"
        ></v-skeleton-loader>
    </nav>
</template>

<script>
  import EmployeeListItem from "./EmployeeListItem";

  export default {
    name: 'EmployeeList',
    components: { EmployeeListItem  },
    props: ['employees', 'selected', 'searchText'],
    computed: {
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
