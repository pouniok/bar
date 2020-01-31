<template>
  <div class="card shadow-sm product-item clickable" @click="openEmployeeDetails()">
    <div class="card-img-top text-center p-3">
      <template v-if="employee.icon">
        <img :src="employee.icon" class="icon" />
      </template>
      <template v-else>
        <i class="fas fa-user icon"></i>
      </template>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ employee.firstname }} {{ employee.lastname }}
      </h5>
      <p class="card-text">né le {{ employee.birthday | moment("LL") }}, {{ employee.birthday | moment("from", "now") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeListItem',
  props: ['employee'],
  methods: {
    openEmployeeDetails: function(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon {
    border-radius: 50%;
    font-size: 50px;
    color: #333;
    height: 64px;
    width: 64px;
  }
  .clickable {
    cursor: pointer;
    height: 250px;
  }
</style>
