import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditEmployee from '@/components/EditEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import NewEmployee from '@/components/NewEmployee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee
    },
    {
      path: '/view/:employee_id',
      name: 'view-employee',
      component: ViewEmployee
    },
    {
      path: '/github',
      beforeEnter() { location.href = 'http://github.com' }
    }
  ]
})
