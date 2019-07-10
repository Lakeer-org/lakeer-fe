<template>
<BaseModal id="differenceLayerModal">
  <template slot="title">Show underserved areas</template>
  <template slot="body">
    <div class="row">
      <div class="col-sm-6 col-xs-12">
        Buffer
        <vue-select
          v-model="differenceLayerMetric"
          :options="differenceLayerOptions"
          :searchable="false"
        />
      </div>
      <div class="col-sm-6 col-xs-12">
        Map
        <vue-select
          multiple
          v-model="differenceLayerBoundary"
          label="label"
          :options="boundaryOptions"
        />
      </div>
    </div>
  </template>
  <template slot="footer">
    <button data-dismiss="modal" type="button" class="btn btn-default" style="">Cancel</button>
    <button @click="addDifferenceLayer" type="button" class="btn btn-primary" style="">Confirm</button>
  </template>
</BaseModal>
</template>

<script>
import BaseModal from '../../base/BaseModal.vue'
import VueSelect from 'vue-select'
export default {
  name: 'DifferenceLayerModal',
  methods: {
    addDifferenceLayer() {
      if (this.differenceLayerMetric !== '' && this.differenceLayerBoundary !== []) {
        this.$store.commit('updateMetric', {
          metric: this.differenceLayerMetric.value,
          new_attrs: {difference_layer: this.differenceLayerBoundary}
        })
      }
      $('#differenceLayerModal').modal('hide')
    }
  },
  components: {BaseModal, VueSelect},
  data: () => ({
    differenceLayerMetric: '',
    differenceLayerBoundary: []
  }),
  computed: {
    differenceLayerOptions () {
      let activeCircles = this.$store.getters.activeCircles
      return activeCircles.map((circle) => ({
        label: `${circle.name} - ${circle.buffer_radius * 1000}m`,
        value: circle
      }))
    },
    boundaryOptions () {
      let boundaries = this.$store.state.index.boundaries
      return boundaries

      // .map(boundary => ({
      //   label: `${boundary.name} - ${boundary.level}`,
      //   value: boundary
      // }))
    }
  }
}
</script>
