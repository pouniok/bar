<template>
    <div class="layout">
        <div class="d-flex flex-column h-100 sidebar p-3">
            <h4 class="mb-4">Employés</h4>

            <Searchbar @search="searchEmployee" />

            <div class="container-fluid px-0 hide-scrollbar">
                <EmployeeList @employee-selected="showEmployeeDetails"
                              :employees="employees"
                              :searchText="searchText"
                              :selected="currentEmployee" />

            </div>
        </div>

        <div class="main p-3">
            <EmployeeDetails :employee="currentEmployee" />
        </div>
    </div>
</template>

<script>
    import EmployeeList from "./EmployeeList";
    import Searchbar from "./Searchbar";
    import EmployeeDetails from "./EmployeeDetails";

    export default {
        name: "EmployeePage",
        inject: ['employeeService'],
        data: () => {
          return {
              currentEmployee: {},
              searchText: "",
              employees: [],
          }
        },
        components: {
            EmployeeDetails,
            Searchbar,
            EmployeeList
        },
        async created () {
            this.employees = await this.employeeService.getEmployees()
            this.currentEmployee = this.employees[0]
        },
        methods: {
            showEmployeeDetails(employee) {
                this.currentEmployee = employee
            },
            searchEmployee(searchText) {
                this.searchText = searchText.toLowerCase()
            }
        }
    }
</script>

<style scoped>

</style>