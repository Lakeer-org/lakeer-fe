<template>
<BaseModal id="heatmapModal">
  <template slot="title">Create heatmap</template>
  <template slot="body">
    <div class="row">
      <div class="col-sm-6 col-xs-12">
        Metric
        <vue-select
          v-model="heatmapMetric"
          :options="heatmapOptions"
          :searchable="false"
        />
      </div>
      <div class="col-sm-6 col-xs-12">
        Map
        <vue-select
          multiple
          v-model="selectedBoundary"
          label="label"
          :options="boundaryOptions"
          :searchable="false"
        />
      </div>
    </div>
  </template>
  <template slot="footer">
    <button data-dismiss="modal" type="button" class="btn btn-default" style="">Cancel</button>
    <button @click="addHeatmap" type="button" class="btn btn-primary" style="">Confirm</button>
  </template>
</BaseModal>
</template>

<script>
import BaseModal from '../../base/BaseModal.vue'
import VueSelect from 'vue-select'
export default {
  name: 'HeatmapModal',
  methods: {
    addHeatmap() {
      if (this.heatmapMetric !== '' && this.selectedBoundary !== '') {
        this.$store.commit('updateMetric', {
          metric: this.heatmapMetric.value,
          new_attrs: {heatmaps: this.selectedBoundary}
        })
        // this.$store.commit('updateHeatmap', {
        //   metric: this.heatmapMetric.value,
        // })
      }
      $('#heatmapModal').modal('hide')
      //location.reload()
    }
  },
  components: {BaseModal, VueSelect},
  data: () => ({
    heatmapMetric: '',
    selectedBoundary: []
  }),
  computed: {
    heatmapOptions () {
      let activeMetrics = this.$store.getters.activeMetrics
      // let metric = {
      //   buffer_radius: 0,
      //   color: "#FF0000",
      //   difference_layer: [],
      //   geometry_type: "Point",
      //   heatmaps: [],
      //   icon: "unsupported",
      //   is_checked: true,
      //   name: "Population",
      //   service_metric_id: "population",
      //   type: "metric"
      // }
      // let metricList = [...activeMetrics, metric]
      // metricList = [...metricList, {...metric, name: 'Expenditure', service_metric_id: 'expenditure'}]
      // return metricList.map((metric) => ({
      return activeMetrics.map((metric) => ({
        label: `${metric.name}`,
        value: metric
      }))
    },
    boundaryOptions () {
      let boundaries = this.$store.state.index.boundaries
      return boundaries
    }
  }
}
</script>
