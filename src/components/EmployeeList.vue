<template>
  <div class="row">
    <h1 class="my-3">Liste des employés</h1>

    <div class="card-columns">
      <template v-for="employee in employees" >
          <EmployeeListItem :employee="employee" :key="employee.id" />
      </template>
    </div>
  </div>
</template>

<script>
  import EmployeeListItem from "./EmployeeListItem";
export default {
  name: 'EmployeeList',
  inject: ['employeeService'],
  components: {
    EmployeeListItem
  },
  data () {
    return {
      employees: []
    }
  },
  async mounted () {
    this.employees = await this.employeeService.getEmployees()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 400px;
  margin: 0 auto;
}
li {
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid #EFEFEF;
  cursor: pointer;
}
.icon {
  width: 64px;
  height: 64px;
  padding: 10px;
}

.icon img {
  border-radius: 50%;
}

.icon i {
  font-size: 50px;
  color: #333;
}

.name {
  text-align: left;
  flex: 1;
  padding: 20px 10px;
}
</style>
