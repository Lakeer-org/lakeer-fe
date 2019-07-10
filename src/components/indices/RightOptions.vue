<template>
  <div class="right-options">
    <div>
      <div class="share-div" @click="openShareIndexModal">
        <img src="/assets/images/share_icon.png">
      </div>
      <div class="save-div" data-toggle="modal" data-target="#saveModal">
        <img src="/assets/images/save_icon.png">
      </div>
      <div class="legend-menu-div">
        <img src="/assets/images/list_icon.svg">
      </div>
    </div>
    <div class="legend-div hidden">
      <div class="legend-head">
        <p>Legend<span class="pull-right cursor_pointer close close-legend">x</span></p>
      </div>
      <div class="legend-body">
        <template v-for="(metric, i) in active_metrics">
          <div v-if="metric.name.toLowerCase().indexOf('plants planted') >= 0" class="heatmap-range-div" :key="i">
            <p class="heatmap-title">Planted Plants</p>
            <div style="display: flex; padding: 0px 4px;">
              <template v-for="(range, j) in [10,20,30,40,50,60,70,80,90,100]" :class="{j}">
                <div class="color_range" :key="j">
                  <p class="color-container" :style="{backgroundColor: plant_survival_color(range)}"> </p>
                  <p class="text-center temp-degree" >
                    {{ range -10 }} - {{ range }}
                  </p>
                </div>
              </template>
            </div>
          </div>
          <div v-else class="legend-square-div" :key="i+'metric'">
            <span class="legend-square-box" :style="{'background-color': metric.color}"></span><span class="legend-text">{{metric.name}}</span>
          </div>
        </template>

        <template v-for="(raster, i) in selectedRasters">
          <div :key="i+'raster'" class="legend-square-div">
            <span class="legend-text">{{raster.name}}</span>
            <div class="gradient-container">
              <gradient :color1="raster.colors.color1" :color2="raster.colors.color2"></gradient>
              <span class="legend-scale scale-min">1</span><span class="legend-scale scale-med">4</span><span class="legend-scale scale-max">7</span>
            </div>
            <span class="pull-right cursor_pointer close" @click="removeRaster(raster)">x</span>
          </div>
        </template>

        <template v-for="(heatmap, i) in selectedHeatmaps">
          <div class="heatmap-legend" v-if="colorCodeRange.length > 0" :key="i">
            <p>Heatmap <a class="pull-right pointer" @click="removeHeatmap(heatmap)">Remove</a></p>
            <div class="parent-temp-flex">
              <template v-for="(range, j) in colorCodeRange" :class="{j}">
                <div class="child-1" :key="j">
                  <p class="color-container" :style="{backgroundColor: range.colorCode}"> </p>
                  <p  class="text-center temp-degree" >
                    {{ range.min }} - {{ range.max }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </template>

      </div>
      <!-- <div class="green-cover-div">
        <p>Green cover</p>
        <div class="parent-green-cover-flex">
          <p class="grren-cover-range">0</p>
          <div class="child-1">
          </div>
          <div class="child-2">
          </div>
          <div class="child-3">
          </div>
          <div class="child-4">
          </div>
          <p class="green-cover-range">100</p>
        </div>
      </div> -->

    </div>
    <shareIndexModal id="shareIndexModal"></shareIndexModal>
  </div>

</template>

<script>
import Gradient from '@/components/reusable/Gradient'
import ShareIndexModal from '@/components/indices/modals/ShareIndexModal'
export default {
  components: {
    Gradient,
    ShareIndexModal
  },
  computed: {
    current_url() {
      return window.location.href
    },
    active_metrics() {
      return this.$store.getters.activeMetrics
    },
    colorCodeRange() {
      return this.$store.getters.colorCodeRange
    },
    selectedRasters() {
      return this.$store.state.index.selectedRasters
    },
    selectedHeatmaps() {
      return this.$store.getters.activeHeatmaps
    }
  },
  methods: {
    openShareIndexModal() {
      if (this.$router.currentRoute.params.id == null) {
        alert('Please save the index first before sharing it')
      } else {
        $('#shareIndexModal').modal('show')
      }
    },
    plant_survival_color(value) {
      if ( value < 10 ) {
        return "#FF0000"
      } else if (value < 20) {
        return "#FF3300"
      } else if (value < 30) {
        return "#FF7700"
      } else if (value < 40) {
        return "#FFBB00"
      } else if (value < 50) {
        return "#FFFF00"
      } else if (value < 60) {
        return "#CCFF00"
      } else if (value < 70) {
        return "#99FF00"
      } else if (value < 80) {
        return "#66FF00"
      } else if (value < 90) {
        return "#33FF00"
      } else if (value <= 100) {
        return "#00FF00"
      }
    },
    removeHeatmap(heatmap_metric) {
      this.$store.commit('setModifiedBoundaries', heatmap_metric.heatmaps)
      this.$store.commit('removeHeatmap', heatmap_metric)
    },
    removeRaster(raster) {
      this.$store.commit('removeRaster', raster)
    }
  }
}
</script>
<style>
.heatmap-range-div {
  /*display: flex;*/
  padding: 0px 5px;
}
.heatmap-title {
  padding: 5px !important;
  font-size: 12px;
  color: #172B4D;
}
.color_range:first-child > .color-container{
  border-radius: 5px 0px 0px 5px;
}
.color_range:last-child > .color-container{
  border-radius: 0 5px 5px 0;
}
.color_range {
  width: 30px;
}
.color-container {
  height: 10px;
}

.right-options {
  position: absolute;
  top: 110px;
  right: 10px;
}
.save-div, .share-div, .legend-menu-div {
  text-align: right;
  margin-bottom: 5px;
  border-radius: 2px;
  cursor: pointer;
}
.save-div  > img, .share-div > img, .legend-menu-div > img{
  width: 40px;
  height: 40px;
  padding: 13px;
  background-color: #fff;
  border-radius: 2px;
}
.save-div > span, .share-div > span {
  vertical-align: middle;
  background-color: #fff;
  font-size: 10px;
  padding: 5px;
}
.legend-menu-div > span {
  background-color: #fff;
  font-size: 12px;
  padding: 5px;
}

.legend-square-div {
  border-bottom: 1px solid #DFE1E6;
  padding: 10px 12px;
  font-size: 12px;
  color: #172B4D;
}
.legend-square-box{
  padding: 2px 10px;
  background-color: black;
  border-radius: 4px;
}
.legend-text {
  padding: 0px 12px;
}

.legend-scale {
  position: absolute;
  font-size: 0.8em;
  bottom: 2px;
}

.scale-min {
  left: 0
}

.scale-med {
  right: 25%;
  left: 25%;
  text-align: center
}

.scale-max {
  right: 0
}

.gradient-container {
  display: inline-block;
  width: 50%;
  position: relative;
  padding-bottom: 15px
}

.heatmap-legend, .green-cover-div {
  padding: 0px 15px;
}
.heatmap-legend > p {
  margin: 0px;
}

</style>
