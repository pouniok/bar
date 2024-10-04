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
                        <span class="headline">Nouvel employé</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="Prénom*" required @keyup="firstname = $event.target.value" :value="this.firstname"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Nom*" required @keyup="lastname = $event.target.value" :value="this.lastname"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-label>Date de naissance</v-label>
                                    <v-date-picker
                                            v-model="birthday"
                                            full-width
                                            :landscape="$vuetify.breakpoint.smAndUp"
                                            locale="fr-fr"
                                            first-day-of-week="1"
                                            color="#dc3545"
                                            :min="new Date(1950, 1, 1).toISOString().substr(0, 10)"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            class="mt-4"
                                    ></v-date-picker>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*champs obligatoires</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="closeAddEmployeeDialog">Annuler</v-btn>
                        <v-btn text @click="addEmployee" class="text-danger" :disabled="!isValid">Valider</v-btn>
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
              dialog: null,
              firstname: null,
              lastname: null,
              birthday: new Date(1990, 5, 15).toISOString().substr(0, 10)
          }
        },
        computed: {
          isValid() {
              return this.firstname && this.lastname && this.birthday
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
            closeAddEmployeeDialog() {
                this.dialog = false
                this.firstname = null
                this.lastname = null
            },
            async addEmployee() {
                const resp = await this.employeeService.addEmployee({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    birthday: new Date(this.birthday).getTime()
                })

                if (resp.success) {
                    this.employees = await this.employeeService.getEmployees()
                    this.currentEmployee = this.employees.find(e => e.firstname === this.firstname && e.lastname === this.lastname)
                }

                this.closeAddEmployeeDialog()
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