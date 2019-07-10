<template>
  <BaseModal id="shareIndexModal">
    <template slot="title">Copy Link</template>
    <template slot="body">
      <div class="row">
        <div class="col-md-2">
          <h4>URL</h4>
        </div>
        <div class="col-md-10">
          <input class="form-control" id="current_url_input" type="" name="" :value="current_url">
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" id="copy_to_clipboard" class="btn btn-success pull-right" @click="copy_to_clipboard">
        Copy to clipboard
      </button>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  components: {
    BaseModal
  },
  computed: {
    current_url() {
      return window.location.href
    }
  },
  methods: {
    copy_to_clipboard() {
      var copyText = document.getElementById("current_url_input")
      copyText.select()
      document.execCommand("copy")
      this.$notify({
        group: 'metric-add',
        title: 'Important message',
        text: 'Copied to clipboard.',
        duration: 10000,
        position: 'top right'
      })
    }
  }
}

</script>
