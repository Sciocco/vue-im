import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../views/sign/signin')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/sign/signup')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/user')
    }
  ]
})
