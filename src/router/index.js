import Vue from 'vue'
import Router from 'vue-router'
import EmployeeList from '@/components/EmployeeList'

Vue.use(Router)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

export default new Router({
  routes: [
    { path: '/', redirect: '/employees' },
    { path: '/employees', name: 'EmployeeList', component: EmployeeList }
  ]
})
