import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/auth/Login.vue'
import Dashboard from './components/dashboard/Main.vue'
import Index from './components/indices/Index.vue'
import UserShow from './components/user/Show.vue'

import { store } from './store/store.js'
import { api } from './services/api.js'


Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Login,
    beforeEnter (to, from, next) {
      const accessToken = store.state.auth.access_token;
      if (accessToken) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  { path: '/user', component: UserShow },
  { path: '/dashboard', component: Dashboard },
  { path: '/indices/:id?', component: Index },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.params.id) {
    localStorage.setItem('pathToRedirect', to.fullPath)
  }
  const accessToken = store.state.auth.access_token
  if (accessToken) {
    api.get('auth/verify_token')
      .then(response => {
        if (response.data.status_message === 'valid') {
          const redirectPath = localStorage.getItem('pathToRedirect')
          if (redirectPath) {
            localStorage.removeItem('pathToRedirect')
            next(redirectPath)
          } else {
            next()
          }
        } else {
          store.commit('logout')
          router.push('/')
          next()
        }
      }, error => {
        this.user.isLoginFail = true
        this.user.errorMessage = error.body.error
      })
    next()
  } else {
    to.path === '/' ? next() : next('/')
  }
})

export default router;
