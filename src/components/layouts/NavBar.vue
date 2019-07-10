<template>
  <div>
    <ul class="nav-bar">
      <li class="nav-logo tooltip cursor_pointer">
        <!-- <router-link to="/dashboard"><img src="/assets/images/white_logo_transparent.png" width="70px"></router-link> -->
        <router-link to="/dashboard"><img src="/assets/images/white_logo_transparent.png" width="70px"></router-link>
        <span class="tooltiptext">Home</span>
      </li>
      <li class="nav-header"><img src="/assets/images/citysight-wordmark.svg"></li>
      <li class="nav-icons">
        <ul>
          <li class="dropdown call-btn-dropdown tooltip">
            <a class="cursor_pointer dropdown-toggle nav-btn" type="button" data-toggle="dropdown">
              <img src="/assets/images/call-icon-white.svg" height="15" width="15">
            </a>
            <span class="tooltiptext">Call</span>
            <ul class="dropdown-menu">
              <li>Call us on</li>
              <li><a href="tel:+91994-009-9123">+91 8790822099</a></li>
              <li data-toggle="modal" data-target="#scheduleCallbackModal"><a href="#">Schedule a callback</a></li>
            </ul>
          </li>
          <!-- <li class="fa fa-warning nav-btn"></li> -->
          <li class="tooltip" @click="logout">
            <a class="fa fa-sign-out cursor_pointer nav-btn "></a>
            <span class="tooltiptext">Logout</span>
          </li>
          <li class="profile cursor_pointer tooltip">
            <img src="/assets/images/user.svg" height="15" width="15">
            <span class="tooltiptext">Profile</span>
          </li>
        </ul>
      </li>
    </ul>
    <ScheduleCallbackModal />
  </div>
</template>
<script>
import ScheduleCallbackModal from './ScheduleCallbackModal.vue'
export default {
  components: {
    ScheduleCallbackModal
  },
  data() {
    return {
      gender: localStorage.getItem('gender')
    }
  },
  methods: {
    logout() {
      localStorage.setItem('vuex', '')
      location.href = '/'
    }
  }
}
</script>
