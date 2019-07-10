<template>
  <context-menu class="context-menu" ref="indexSettingsMenu">
    <li v-if="nodeType=='group'" @click="$emit('add-group')">Create Folder</li>
    <li v-if="nodeType=='group'" @click="$emit('add-metric')">Add Metric</li>
    <li v-if="nodeType=='group'" @click="$emit('delete-group')">Delete</li>
    <li v-if="nodeType=='metric'" @click="$emit('delete-metric')">Delete</li>
    <li v-if="nodeType=='group'" @click="$emit('edit-node')">Rename</li>
  </context-menu>
</template>

<script>
import ContextMenu from 'vue-context-menu'

export default {
  components: {
    ContextMenu
  },
  props: {
    nodeType: String
  },
  methods: {
    open($event) {
      this.$refs.indexSettingsMenu.open($event)
    }
  }
}

</script>

<style>
</style>
