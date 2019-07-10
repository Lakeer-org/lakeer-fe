<template>
  <div>
    <notifications group="schedule-call" position="top right">
      <template slot="body" slot-scope="props">
        <div class="notification vue-notification">
          <a class="close" @click="props.close">
            <i class="fa fa-fw fa-close"></i>
          </a>
          <div class="notification-title">{{props.item.title}}</div>
          <div>
            <span class="fa fa-check check-color"></span>
            <span v-html="props.item.text"></span>
          </div>

        </div>
      </template>
    </notifications>
    <div class="modal fade" id="scheduleCallbackModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Schedule a callback.</h4>
          </div>
          <div class="modal-body">
            <p>Let us know these details, We will get back to you.</p>
            <div>
              <label>Name</label>
              <input v-model="name" id="callback-name" type="text" class="field-value form-control">
            </div>
            <br />
            <div>
              <label>Mobile Number</label>
              <input v-model="mobile_number" id="callback-number" type="text" class="field-value form-control">
            </div>
            <br />
            <div>
              <label>Reason for callback?</label>
              <input v-model="reason_for_call" id="callback-reason" type="text" class="field-value form-control">
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn save-btn" @click="saveIndex">Save as a new file</button> -->
            <button type="button" class="btn update-btn" @click="request_callback">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../../services/api.js'
import Vue from 'vue'
export default {
  name: 'ScheduleCallbackModal',
  data() {
    return {
      name: '',
      mobile_number: '',
      reason_for_call: ''
    }
  },
  methods: {
    async request_callback() {
      if (this.name.length < 1 || this.mobile_number < 1) {
        alert('Please fill Name and Mobile number')
      } else {
        let response = await api.post('users/request-callback', {name: this.name, mobile_number: this.mobile_number, reason_for_call: this.reason_for_call})
        if (response.status === 201) {
          Vue.notify({
            group: 'schedule-call',
            title: 'Important message',
            text: 'Request sent. You will receive callback from lakeer team.'
          })
          $('#callback-name, #callback-number, #callback-reason').val('')
          $('#scheduleCallbackModal').modal('hide')
          // window.setTimeout(function () {
          //   window.location.href = '/dashboard'
          // }, 2100)
        }
        else {
          alert(response.data)
        }
      }
    }

  }
}
</script>
