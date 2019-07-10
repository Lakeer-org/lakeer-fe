<template>
  <div>
    <div class="node metric-node"  @click="select" :style="indent" :class="{selected_node: selected}">
      <img :src="'/assets/images/layer-color.svg'"/>
      <span class="index-metric-label" :style="textStyle">{{ ` ${metric.name}`}}</span>
      <span class="index-node-icons">
        <span class="hover">
          <img class="settings-icon" :src="selected ? '/assets/images/settings-light.svg' : '/assets/images/settings-dark.svg'" @click.prevent.stop="openSettingsMenu($event, metric, parent)"/>
          <img class="eye-icon" :src="selected ? '/assets/images/eye_icon_light.png' : (metric.is_checked && parent_is_checked ? '/assets/images/eye_icon_dark.png' : '/assets/images/eye_icon_strike.png')" @click="toggleActive(metric)"/>
        </span>
        <span class="regular">
          <img class="eye-icon" :src="metric.is_checked && parent_is_checked ? '/assets/images/eye_icon_dark.png' : '/assets/images/eye_icon_light.png'" @click="toggleActive(metric)"/>
        </span>
      </span>
    </div>
    <!-- <div class="dropright">
      <metric-setting-dropdown
        v-if="metric.is_checked"
        :class="{collapse: !selected, 'metric-tooltip': true}"
        :metric="metric"
      />
      <metric-deactivated-message
        v-else
        :class="{collapse: !selected, 'metric-tooltip': true}"
      />
    </div> -->
  </div>
</template>
<script>
import MetricSettingDropdown from '../MetricSettingDropdown.vue'
import MetricDeactivatedMessage from '../MetricDeactivatedMessage.vue'

export default {
  name: 'metric-node',
  data: () => ({
    selected: false
  }),
  components: {
    MetricSettingDropdown,
    MetricDeactivatedMessage
  },
  computed: {
    indent() {
      return { 'padding-left': `10px` }
    },
    textStyle() {
      return {
        'font-size': `${Math.pow(0.9, this.depth)}em`,
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': 'inline-block',
        'width': '60%',
        'vertical-align': 'middle',
        'white-space': 'nowrap'
      }
    }
  },
  methods: {
    select(event) {
      this.selected = !this.selected
      this.$emit('select-node', this)
    },
    openSettingsMenu($event, node, parent) {
      this.$emit('open-settings-menu', $event, node, parent)
    },
    toggleActive(metric) {
      if (!metric.is_checked) {
        this.$emit('activated-child')
      }
      this.$store.commit('toggleActive', metric)
    }
  },
  props: {
    metric: Object,
    index: String,
    depth: Number,
    parent: Object,
    parent_is_checked: {
      type: Boolean,
      default: true
    }
  }
}

</script>
<style>
.node:hover > .index-node-icons > .hover {
  display: block;
}
.hover {
  display: none;
}
.node:hover > .index-node-icons > .regular {
  display: none;
}

</style>
