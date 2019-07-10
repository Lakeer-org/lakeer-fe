<template>
  <div class="modal fade" id="saveModal" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Save Changes</h4>
        </div>
        <div class="modal-body">
          <p>Do you want to update the existing analysis "{{ index.name}}"?</p>
          <div>
            <label>Name</label>
            <input v-model="index.name" id="index-name" type="text" class="field-value form-control">
          </div>
          <div>
            <label>Description</label>
            <input v-model="index.description" id="index-description" type="text" class="field-value form-control">
          </div>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn save-btn" @click="saveIndex">Save as a new file</button> -->
          <button type="button" class="btn update-btn" @click="saveIndex">Update Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    saveIndex() {
      if (this.$store.state.index.name.length > 0) {
        this.$store.dispatch('create_or_update_index')
      } else {
        alert('Index name cannot be blank')
      }
    }
  },
  computed: {
    ...mapState([
      'index'
    ])
  }
}
</script>

<style>
#saveModal > .modal-dialog > .modal-content > .modal-footer {
  background-color: #f4f6f8;
  border-top: none;
}
#saveModal > .modal-dialog > .modal-content > .modal-body > p {
  font-size: 18px;
  color: #172B4D;
}
#saveModal > .modal-dialog > .modal-content > .modal-header > h4 {
  color: #172B4D;
  font-size: 18px;
  font-weight: 600;
}
#saveModal > .modal-dialog > .modal-content > .modal-header > .close {
  opacity: 1.6;
  font-weight: normal;
}
</style>
