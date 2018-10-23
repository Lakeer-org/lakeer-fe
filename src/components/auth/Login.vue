<template>
  <div class="main-div">
    <div class="text-center">
      <img src="assets/images/logo_transparent.png" width="25%">
    </div>
    <label class="input-labels">Email address<span id="email-alert" class="hidden">*</span></label>
    <input type="text" aria-required="true" value="" name="email" id="email" class="input-field" placeholder="Email address" v-model="user.email">
    <label class="input-labels">Password<span id="password-alert" class="hidden">*</span></label>
    <!-- <span class="forgot-psw">forgot password?</span> -->
    <input type="password" aria-required="true" value="" name="password" id="password" class="input-field" placeholder="Password" v-model="user.password">
    <button class="login-btn" id="login-btn" type="submit" @click="submitLogin">Log in</button>
    <p id="login-alert" class="hidden">Please fill in the required fields</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
          errorMessage: 'Login Failed',
          isLoginFail: false
        }
      }
    },
    methods: {
      submitLogin() {
        var email = document.getElementById('email')
        var password = document.getElementById('password')
        var alert = document.getElementById('login-alert')
        if (email.value == '') {
          document.getElementById('email-alert').classList.remove('hidden')
          alert.classList.remove('hidden')
          alert.textContent='Please fill in the required fields'
        }else if (password.value == '') {
          document.getElementById('password-alert').classList.remove('hidden')
          alert.classList.remove('hidden')
          alert.textContent='Please fill in the required fields'
        }else{
          this.$http.post('auth/login', this.user)
              .then(response => {
                localStorage.setItem('accessToken', response.body.token)
                localStorage.setItem('gender', response.body.gender)
                this.$router.push('/dashboard')
              }, error => {
                this.user.isLoginFail = true
                this.user.errorMessage = error.body.error
                document.getElementById('email-alert').classList.add('hidden')
                document.getElementById('password-alert').classList.add('hidden')
                alert.classList.remove('hidden')
                alert.textContent=this.user.errorMessage
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
