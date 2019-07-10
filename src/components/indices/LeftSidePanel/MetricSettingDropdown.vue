<template>
  <base-dropright-menu>
    <template slot="content">
      <template v-if="metric.type == 'heatmap'">
        <div class="pointer-title">
          HERE BE THE HEATMAP MENU
        </div>
      </template>
      <template v-else>
      <div>
        <div class="pointer-title">
          Point properties
        </div>
        <div class="metric-settings col-md-12">
          <div class="row">

            <div class="col-sm-6">
              <div class="setting-title">Color</div>
              <div class="input-group color-picker" ref="colorpicker">
                <!-- <input class="check" type="checkbox" name="bus-stops" ref="transportBusStop" data-ref="transportBusStop" value="" id="checkbox1" @click="loadMarker('basic_service', 'public_transport', 'hyderabad_bus_stops', $event)"> -->
                <input type="text" class="form-control hidden" id="submit-color" :value="point_color" @focus="showPicker()" @input="updateFromInput" />
                <span class="current-color color-picker-div" :style="{'background-color': metric.color}" @click="togglePicker()"></span>
                <chrome-picker v-model="point_color" v-if="displayPicker" />
              </div>
            </div>

            <div class="col-sm-6">
              <div class="setting-title">Icon</div>
              <vue-select v-model="icon" :options="iconOptions" :clearable="false" :searchable="false"
                :clearSearchOnSelect="false" label="name">
                <template slot="option" slot-scope="option">
                  <div>
                    <IconBase :key="option.name" :iconColor='point_color'>
                      <icon-path v-bind="option.data" />
                    </IconBase>
                  </div>
                </template>
                <template slot="selected-option" slot-scope="selectedOption">
                  <IconBase ref='selectedIcon' :key="selectedOption.name"  :iconColor='point_color'>
                    <icon-path v-bind="selectedOption.data" />
                  </IconBase>
                </template>
              </vue-select>
            </div>

          </div>
        </div>
        <hr class="width-100"/>
        <div v-if="metric.buffer_radius > 0">
          <button type="button" class="close" style="margin-right: 10px" @click="buffer_radius = 0">&times;</button>
          <div class="pointer-title">
            Buffer properties
          </div>
          <div class="metric-settings col-md-12">
            <div class="row">
              <div class="col-md-12">
                <div class="setting-title">Access radius (km)</div>
                  <div class="row">
                    <div class="col-sm-9">
                      <input type="range" min="0.5" max="8" v-model.number="buffer_radius"/>
                    </div>
                    <div class="col-sm-3">
                      <input type="number" v-model.number.lazy="buffer_radius"/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <button type="button" class="btn btn-grey" @click="makeBufferRadius">
            + Add a buffer
          </button>
        </div>
      </div>
      </template>
    </template>
  </base-dropright-menu>
</template>
<script>
import { Chrome } from 'vue-color'
import IconBase from '@/components/icons/IconBase'
import IconPath from '@/components/icons/IconPath'
import BaseDroprightMenu from '@/components/base/BaseDroprightMenu'
import VueSelect from 'vue-select'
import { ICON_OPTIONS } from '@/store/indexStore'

export default {
  data() {
    return {
      displayPicker: false,
      selectedIcon: ICON_OPTIONS['circle'],
      iconOptions: Object.entries(ICON_OPTIONS).map(entry => ({name: entry[0], data: entry[1]}))
    }
  },
  components: {
    'chrome-picker': Chrome,
    IconBase,
    IconPath,
    BaseDroprightMenu,
    VueSelect
  },
  props: ['metric'],
  computed: {
    point_color: {
      get() {
        return this.metric.color
      },
      set(new_color) {
        this.$store.commit('updateMetric', {
          metric: this.metric,
          new_attrs: {color: new_color.hex}
        })
      }
    },
    buffer_radius: {
      get() {
        return this.metric.buffer_radius
      },
      set(new_radius) {
        this.$store.commit('updateMetric', {
          metric: this.metric,
          new_attrs: {buffer_radius: new_radius}
        })
      }
    },
    icon: {
      get() {
        let icon = this.metric.icon
        if (icon in ICON_OPTIONS) {
          return {name: icon, data: ICON_OPTIONS[icon]}
        } else {
          return {name: 'circle', data: ICON_OPTIONS['circle']}
        }
      },
      set(new_icon) {
        this.selectedIcon = new_icon
        this.$store.commit('updateMetric', {
          metric: this.metric,
          new_attrs: {icon: new_icon.name}
        })
      }
    },
    difference_layer: {
      get() {
        return this.metric.difference_layer
      },
      set(new_value) {
        this.$store.commit('updateMetric', {
          metric: this.metric,
          new_attrs: {difference_layer: new_value}
        })
      }
    }
  },
  mounted() {},
  methods: {
    showPicker() {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
    },
    hidePicker() {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    updateFromInput() {
      this.updateColors(this.colorValue)
    },
    documentClick(e) {
      let el = this.$refs.colorpicker,
        target = e.target
      if (el !== target && !el.contains(target)) {
        this.hidePicker()
      }
    },
    makeBufferRadius() {
      this.$store.commit('updateMetric', {
        metric: this.metric,
        new_attrs: {buffer_radius: 1}
      })
    }
  }
}
</script>

<style lang="scss">

.v-select .selected-tag {
  width: 90% !important
}

$white: #fff;
$black: #000;
$grey: #eee;
$lightBlue: #03a9f4;
$orange: #ff9800;
$amber: #ffc107;
$green: #4caf50;
$teal: #009688;
$cyan: #00bcd4;
$indigo: #3f51b5;
$deepPurple: #673ab7;
$pink: #e91e63;
$red: #f44336;
$yellow: #ffeb3b;
$lime: #cddc39;
$brown: #795548;

.pointer-title {
  height: 20px;
  color: #172B4D;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 5px;
}

.setting-title {
  color: #172B4D;
  font-size: 12px;
  line-height: 20px;
}

.color-picker-div {
  height: 30px !important;
  width: 60px !important;
}

// Slider css
$background-slider: #f6f6f6;
$background-filled-slider: #737c81;

$slider-height: 4px;
$thumb-width: 12px;
$thumb-height: 12px;
$thumb-radius: 50%;
$thumb-background: #FFFFFF;
$thumb-border: 1px solid #777;
$shadow-size: -4px;
$fit-thumb-in-slider: -5px;

$slider-border-width: 1px !default;
$slider-border-color: #d5d5d5 !default;

@function
makelongshadow($color, $size) {
  $val: 5px 0 0 $size $color;
  @for $i from 6 through 150 {
    $val: #{$val}, #{$i}px 0 0 $size #{$color};
  }
  @return $val;
}

input[type="range"] {
  appearance: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  height: 100%;
  min-height: 20px;
  overflow: hidden;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background: $background-filled-slider;
    height: $slider-height;
    border: $slider-border-width solid $slider-border-color;
  }
  &::-webkit-slider-thumb {
    width: $thumb-width;
    height: $thumb-height;
    appearance: none;
    background: $thumb-background;
    border-radius: $thumb-radius;
    box-shadow: makelongshadow($background-slider, $shadow-size);
    margin-top: $fit-thumb-in-slider;
    border: $thumb-border;
  }
}
.btn-grey {
  height: 32px;
  width: 114px;
  border-radius: 2px;
  background-color: #EBECF0;
}

.metric-settings {
  padding-bottom: 10px;
  input {
    width: 100%
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
}

.v-select input[type=search] {
  display: none !important;
}
.v-select .vs__actions {
  min-height: 30px;
}

  .color-picker .vc-chrome {
    top: unset;
    bottom: -85px;
    left: 120px;
    z-index: 1001;
  }
</style>
