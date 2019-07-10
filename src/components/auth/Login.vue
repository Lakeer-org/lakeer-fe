<template>
  <div class="main-div">
    <div class="text-center">
      <img src="/assets/images/logo_transparent.png" alt="lakeer-logo" width="25%">
    </div>
    <label for="email" class="input-labels">Email address</label>
    <input type="text" aria-required="true" name="email" id="email" class="input-field" placeholder="Email address"
           v-model="user.email">
    <label for="password" class="input-labels">Password<span id="password-alert" class="hidden">*</span></label>
    <!-- <span class="forgot-psw">forgot password?</span> -->
    <input type="password" aria-required="true" name="password" id="password" class="input-field" placeholder="Password"
           v-model="user.password">
    <button class="login-btn" id="login-btn" type="submit" @click="submitLogin">Log in</button>
    <p v-if="errorMessage" id="login-alert">{{errorMessage}}</p>
  </div>
</template>

<script>
  import {api} from '../../services/api.js'

  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
          errorMessage: 'Login Failed',
          isLoginFail: false
        },
        errorMessage: ''
      }
    },
    methods: {
      submitLogin() {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        if (email.value === '' || password.value === '') {
          this.errorMessage = 'Please fill all the above fields';
        } else {
          api.post('auth/login', this.user)
            .then(response => {
              this.$store.commit('setCurrentUser', {
                access_token: response.data.token,
                gender: response.data.gender,
                user_id: response.data.user_id,
                logged_in: true
              });
              this.$router.push('/dashboard')
              // this.$router.go(-1)
            }, error => {
              this.$store.commit('logout');
              this.user.isLoginFail = true;
              this.user.errorMessage = 'Invalid credentials';
              this.errorMessage = 'Invalid credentials';
            })
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
