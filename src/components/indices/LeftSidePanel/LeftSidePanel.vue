<template>
  <div class="fixed-sidenav">
    <div class="index-section">
      <div class="index-title">
        <p class="index-name" v-show="!showField('name')" @click="focusField('name')">{{index.name}}</p>
        <input v-model="index.name" v-show="showField('name')" id="user-name" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField">
        <p class="fa fa-map-marker location-lable"> Hyderabad, India</p>
      </div>
    </div>
    <div class="sidenav-content p15">
      <boundary-selector/>
      <!-- <div class="location-search">
        <input type="text" id="autocomplete_search" class="location-input" placeholder="Search.." name="search">
      </div> -->

      <index-tree/>
    </div>

    <div class="add-layer">
      <button type="button" class="btn add-layer-btn" @click="addMetric">
        + Add a Layer
      </button>
    </div>
  </div>
</template>

<script>
import IndexTree from './IndexTree/IndexTree.vue'
import BoundarySelector from './BoundarySelector.vue'
import { mapState } from 'vuex'

export default {
  data(){
    return {
      editField : ''
    }
  },
  components: {
    IndexTree,
    BoundarySelector
  },
  methods: {
    focusField(name){
      this.editField = name;
    },
    blurField(){
      this.editField = '';
    },
    showField(name){
      return (this.index[name] == '' || this.editField == name)
    },
    addMetric: function () {
      $('#addLayerModal').modal('show')
    },
  },
  computed: {
    ...mapState([
      'index'
    ])
  },
  watch: {
  	map: function(newVal, oldVal) { // watch it
    }
  },
}
</script>

<style>
.location-search {
  margin-bottom: 10px;
}
</style>
