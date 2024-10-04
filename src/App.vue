<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-light navbar-expand">
      <router-link class="navbar-brand" to="/">
        <img src="./assets/beer.png" width="30" height="30" class="d-inline-block align-top mr-3" alt="">
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Sorties</router-link>
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

    <router-view />
  </div>
</template>

<script>
  import EmployeeService from './services/employee-service'
  import AfterworkService from "./services/afterwork-service";
  import NewsletterService from "./services/newsletter-service";

  export default {
    name: 'app',
    provide: () => {
      return {
        employeeService: new EmployeeService(),
        afterworkService: new AfterworkService(),
        newsletterService: new NewsletterService(),
      }
    }
  }
</script>

<style>

</style>
