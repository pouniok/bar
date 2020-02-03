import Vue from 'vue'
import Router from 'vue-router'
import EmployeePage from "../components/EmployeePage"
import AfterworkPage from "../components/AfterworkPage";
import NewsletterPage from "../components/NewsletterPage";

Vue.use(Router)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

export default new Router({
  routes: [
    { path: '/', redirect: '/sorties' },
    { path: '/sorties', component: AfterworkPage },
    { path: '/employees', component: EmployeePage },
    { path: '/newsletters', component: NewsletterPage },
  ]
})
