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
            <EmployeeDetails :employee="currentEmployee"
                             @employee-bar-remove="removeBarForEmployee"
                             @employee-bar-add="addBarForEmployee" />
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
            },
            /**
             * @param event : Object { employee, bar }
             */
            async removeBarForEmployee(event) {
                const resp = await this.employeeService.removeBarForEmployee(event.employee.id, event.bar.id)

                if (resp.success) {
                    const employee = this.employees.find(e => e.id === event.employee.id)

                    if (employee && employee.bars) {
                        employee.bars = employee.bars.filter(bar => bar.id !== event.bar.id)
                    }
                }
            },
            /**
             * @param event : Object { employee, place }
             */
            async addBarForEmployee(event) {
                const resp = await this.employeeService.addBarForEmployee(event.employee.id, event.place)

                if (resp.success) {
                    const employee = this.employees.find(e => e.id === event.employee.id)
                    employee.bars = resp.result[0].bars
                }
            },
        }
    }
</script>

<style scoped>

</style>