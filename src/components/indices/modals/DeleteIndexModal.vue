<template>
<BaseModal id="deleteIndexModal">
  <template slot="title">Delete Analysis</template>
  <template slot="body">
    <div class="text-center">
      Are you sure, You want to delete this Analysis?
    </div>
  </template>
  <template slot="footer">
    <button data-dismiss="modal" type="button" class="btn btn-default" style="">Close</button>
    <button data-dismiss="modal" type="button" class="btn btn-default btn-danger" style="" @click="destroy_index(index)">Confirm</button>
  </template>
</BaseModal>
</template>

<script>
import BaseModal from '../../base/BaseModal.vue'

export default {
  name: 'DeleteIndexModal',
  components: {BaseModal},
  props: ['index'],
  methods: {
    destroy_index(index) {
      this.$store.commit('destroyIndex', index.id)
      location.reload()
    }
  }
}
</script>
<style>
#deleteIndexModal .modal-header {
  display: none;
}
#deleteIndexModal .modal-dialog{
  width: 500px;
}
#deleteIndexModal h4{
  border-bottom: 0px;
}
</style>
