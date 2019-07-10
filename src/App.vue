<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
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

.available-service, .available-metrics{
  color: #172B4D;
  font-weight: bold;
  h4 {
    opacity: 0.4;
    font-size: 16px;
    border-bottom: 2px solid #DFE1E6;
    padding-bottom: 10px;
    font-weight: 600;
  }
  h3 {
    color: #172B4D;
    font-size: 18px;
    font-weight: bold;
    opacity: 0.8;
    text-transform: uppercase;
  }
}
</style>
