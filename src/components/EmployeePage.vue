<template>
    <div class="layout">
        <div class="d-flex flex-column h-100 sidebar p-3" style="position: relative;" data-app>
            <h4 class="mb-4">Employés</h4>

            <Searchbar @search="searchEmployee" />

            <div class="container-fluid px-0 hide-scrollbar">
                <EmployeeList @employee-selected="showEmployeeDetails"
                              :employees="employees"
                              :searchText="searchText"
                              :selected="currentEmployee" />
            </div>


            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn class="fab" dark absolute bottom right fab v-on="on">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal first name*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                            label="Legal last name*"
                                            hint="example of persistent helper text"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                            :items="['0-17', '18-29', '30-54', '54+']"
                                            label="Age*"
                                            required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-autocomplete
                                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                            label="Interests"
                                            multiple
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <div class="main p-3">
            <EmployeeDetails :employee="currentEmployee"
                             @employee-remove="removeEmployee"
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
              dialog: null
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
             * @param employee : employee
             */
            async removeEmployee(employee) {
                const resp = await this.employeeService.removeEmployee(employee)

                if (resp.success) {
                    this.employees = this.employees.filter(e => e.id !== employee.id)
                    this.currentEmployee = this.employees[0]
                }
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