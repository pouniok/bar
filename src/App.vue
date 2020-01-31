<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-light bg-light navbar-expand-sm">
      <router-link class="navbar-brand" to="/">
        <img src="./assets/beer.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Bar
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Accueil <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/employees">Employés</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/newsletters">Newsletters</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div><!-- .container -->
  </div>
</template>

<script>
import EmployeeService from './services/employee-service'

export default {
  name: 'app',
    provide: () => {
     return {
       employeeService: new EmployeeService()
     }
   }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
</style>
