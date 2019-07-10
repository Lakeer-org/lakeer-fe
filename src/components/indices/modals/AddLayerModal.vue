<template>
  <BaseModal id="addLayerModal">
    <template slot="title">Add layer to map</template>
    <template slot="body">
      <div class="row">
        <div class="col-xs-6 col-md-4" @click="openMetricModal">
            <img src="/assets/images/metric-layer.jpg" style="width:100%;">
          <div class="layer-content">
            <p class="layer-title">Add a metric</p>
            <p class="layer-desc">Choose a metric from the list of public services available on the platform.</p>
          </div>
        </div>

        <div class="col-xs-6 col-md-4" @click="openDifferenceLayerModal">
          <img src="/assets/images/difference-layer.jpg" style="width:100%;">
          <div class="layer-content">
            <p class="layer-title">Create a difference layer</p>
            <p class="layer-desc">Subtract a buffer layer from a boundary to find the areas which are not served.</p>
          </div>
        </div>

        <div class="col-xs-6 col-md-4"  @click="openHeatmapModal">
          <img src="/assets/images/difference-layer.jpg" style="width:100%;">
          <div class="layer-content">
            <p class="layer-title">Create a heatmap</p>
            <p class="layer-desc">Create a heatmap based on the number of points inside each department subdivision</p>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-xs-6 col-md-4"  @click="openRasterModal">
          <img src="/assets/images/difference-layer.jpg" style="width:100%;">
          <div class="layer-content">
            <p class="layer-title">Add a raster file</p>
            <p class="layer-desc">Add a colored background to the current map</p>
          </div>
        </div>
      </div> -->
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  components: {BaseModal},
  methods: {
    openMetricModal() {
      $('#addLayerModal').modal('hide')
      $('#metricListModal').modal('show')
    },
    openBufferRadiusModal() {
      this.$store.commit('setNewMetricValues', {buffer_radius: 1})
      $('#addLayerModal').modal('hide')
      $('#metricListModal').modal('show')
    },
    openDifferenceLayerModal() {
      $('#addLayerModal').modal('hide')
      $('#differenceLayerModal').modal('show')
    },
    openHeatmapModal() {
      $('#addLayerModal').modal('hide')
      $('#heatmapModal').modal('show')
    },
    openRasterModal() {
      $('#addLayerModal').modal('hide')
      $('#rasterModal').modal('show')
    }
  }
}
</script>

<style>

.layer-icons{
  background-color: #f4f5f7;
  padding: 5px;
}
.layer-icons > img{
  padding: 10px;
}

#addLayerModal > .modal-dialog > .modal-content > .modal-header, #addmetricModal > .modal-dialog > .modal-content > .modal-header {
  background-color: #fafbfc;
  color: #172B4D;
  font-size: 18px;
  font-weight: 600;
  border: none;
}

#addLayerModal > .modal-dialog > .modal-content > .modal-body {
  position: relative;
  padding: 50px 65px;
  height: 265px;
}
</style>
