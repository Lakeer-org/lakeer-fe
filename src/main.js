import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { store } from './store/store.js'

Vue.use(VueResource)
Vue.use(VueRouter)

// Vue.http.options.root = 'https://coyote.lakeer-staging.staging.c66.me/api/v1/';
Vue.http.options.root = 'http://localhost:3000/api/v1/';

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    Vue.http.get('auth/verify_token?token='+localStorage.getItem('accessToken'))
        .then(response => {
          if (response.body.status_message == "valid") {
            next()
          } else {
            localStorage.setItem('accessToken', '')
            this.$router.push('/')
            next()
          }
        }, error => {
          this.user.isLoginFail = true
          this.user.errorMessage = error.body.error
        })
    next()
  } else {
    if (to.path == '/'){
      next()
    }else {
      next('/')
    }

  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
