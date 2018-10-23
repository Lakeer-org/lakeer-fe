import Login from './components/auth/Login.vue'
import Dashboard from './components/dashboard/Main.vue'
import Boundary from './components/dashboard/Boundary.vue'
import UserShow from './components/user/Show.vue'

export const routes = [
  { path: '', component: Login,
    beforeEnter (to, from, next) {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  { path: '/user', component: UserShow },
  { path: '/dashboard', component: Dashboard},
  { path: '/boundary', component: Boundary},
  { path: '*', redirect: '/'}
]
