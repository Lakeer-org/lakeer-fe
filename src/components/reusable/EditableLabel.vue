<template>
  <span>
    <span class="editable-label-text" v-if="!editable" @dblclick.stop="edit">{{ ` ${value}` }}</span>
    <input class="editable-label-input" v-else type="text" :value="value" @keyup.enter="save" @blur="close"/>
  </span>
</template>

<script>
export default({
  name: 'EditableLabel',
  data: () => ({
    oldValue: '',
    editable: false
  }),
  model: {
    prop: 'value',
    event: 'save'
  },
  props: {
    value: String
  },
  methods: {
    edit() {
      this.editable = true
    },
    save($event) {
      this.$emit('save', $event.target.value)
      this.editable = false
    },
    close() {
      this.editable = false
    }
  }
})

</script>

<style>
  .editable-label-text {
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 55%;
    font-weight: bold;
  }
.editable-label-input {
  width: 60%;
}
</style>
