import Vue from 'vue'
import Router from 'vue-router'
import EmployeePage from "../components/EmployeePage"
import AfterworkPage from "../components/AfterworkPage";

Vue.use(Router)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

export default new Router({
  routes: [
    { path: '/', component: AfterworkPage },
    { path: '/employees', name: 'EmployeePage', component: EmployeePage }
  ]
})
