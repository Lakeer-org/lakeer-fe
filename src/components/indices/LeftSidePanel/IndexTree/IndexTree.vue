<template>
  <div class="scroll-index">
    <draggable v-model="child_groups" :options="{group: 'groups'}" style="min-height: 10px">
      <group-node
        v-for="(child_group, i) in child_groups"
        :group="child_group"
        :index="`i`"
        :key="`folder-${i}`"
        :depth="0"
        :parent="index"
        handle=".node"
        @select-node="selectNode"
        @open-settings-menu="openSettingsMenu"
      />
    </draggable>
    <draggable v-model="child_metrics" :options="{group: 'metrics'}" style="min-height: 10px">
      <metric-node
        v-for="(child_metric, i) in child_metrics"
        :metric="child_metric"
        :index="`i`"
        :key="`metric-${i}`"
        :depth="0"
        :parent="index"
        @select-node="selectNode"
        @open-settings-menu="openSettingsMenu"
      />
    </draggable>
    <div class="dropright">
      <metric-setting-dropdown v-if="selectedMetric && selectedMetric.is_checked"
        :class="{collapse: !selected, 'metric-tooltip': true}" :metric="selectedMetric"/>
      <metric-deactivated-message v-else :class="{collapse: !selected, 'metric-tooltip': true}"/>
    </div>
    <index-settings-menu
      v-if="settingsOpenNode"
      ref="indexSettingsMenu"
      :nodeType="settingsOpenNode.child_groups ? 'group' : 'metric'"
      @add-group="addGroup"
      @add-metric="addMetric"
      @delete-group="deleteGroup"
      @delete-metric="deleteMetric"
      @rename-node="renameNode"
    />
    <!-- <settings-menu ref='indexSettingsMenu' /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import GroupNode from './GroupNode.vue'
import MetricNode from './MetricNode.vue'
import IndexSettingsMenu from './IndexSettingsMenu'
import MetricSettingDropdown from '../MetricSettingDropdown.vue'
import MetricDeactivatedMessage from '../MetricDeactivatedMessage.vue'

export default {
  name: 'index-tree',
  data: () => ({
    selectedNode: null,
    settingsOpenNode: null,
    settingsOpenParent: null,
    selectedMetric: null,
    selected: false
  }),
  components: {
    draggable,
    GroupNode,
    MetricNode,
    // SettingsMenu,
    IndexSettingsMenu,
    MetricSettingDropdown,
    MetricDeactivatedMessage
  },
  computed: {
    index() {
      return this.$store.state.index
    },
    child_groups: {
      get () {
        return this.$store.state.index.child_groups
      },
      set(value) {
        this.$store.commit('updateGroups', {
          new_groups: value,
          parent: this.$store.state.index
        })
      }
    },
    child_metrics: {
      get() {
        return this.$store.state.index.child_metrics
      },
      set(value) {
        this.$store.commit('updateMetrics', {
          new_metrics: value,
          parent: this.$store.state.index
        })
      }
    }
  },
  methods: {
    selectNode(node) {
      this.selectedNode = node
      if (node.$options._componentTag === 'metric-node') {
        this.selected = node._data.selected
        this.selectedMetric = node.metric;
        const sideBarHeight = $('.fixed-sidenav')[0].offsetHeight;
        $('.dropright').css({bottom: (sideBarHeight - (node.$el.offsetTop + node.$el.offsetHeight)) + 184, top: 'unset'});
      } else {
        this.selected = false
      }
      let offsetParent = node.$el.offsetParent.__vue__
      if (offsetParent && offsetParent.$options._componentTag == "group-node") {
        $('.dropright').css({top: node.$el.offsetParent.offsetTop});
      }
    },
    addGroup() {
      this.$store.commit('addGroup', { parent: this.settingsOpenNode })
    },
    addMetric($event, value) {
      this.$store.commit('setNewMetricValues', { parent: this.settingsOpenNode })
      $('#addLayerModal').modal('show')
    },
    deleteGroup() {
      this.$store.commit('deleteGroup', {
        group: this.settingsOpenNode,
        parent: this.settingsOpenParent
      })
    },
    deleteMetric() {
      this.$store.commit('deleteMetric', {
        metric: this.settingsOpenNode,
        parent: this.settingsOpenParent
      })
    },
    renameNode() {
    },
    openSettingsMenu($event, node, parent) {
      this.settingsOpenNode = node
      this.settingsOpenParent = parent
      Vue.nextTick().then(() => this.$refs.indexSettingsMenu.open($event))
    }
  },
  watch: {
    selectedNode(new_val, old_val) {
      if (old_val !== null && old_val !== new_val) { old_val.selected = false }
    }
  }
}
</script>

<style>
.node {
  cursor: move;
  cursor: -webkit-grabbing;
}
.node:hover {
  background-color: #F4F5F7;
}

.selected_node {
  background-color: #4C9AFF;
}

.selected_node:hover {
  background-color: #4C9AFF;
}

.dropright {
  position: absolute;
  font-size: 12px;
  top: -30px;
  height: 0px;
}
.metric-node {
  position: relative;
  font-size: 12px;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.metric-tooltip {
  background-color: #fff;
  color: #000;
  border-radius: 2px;
  position: relative;
}

.index-node-icons{
  float: right;
  padding-top: 2px;
}
.index-node-icons .eye-icon {
  cursor: pointer;
}

.index-node-icons .settings-icon {
  padding: 10px 0px;
  margin-right: 5px;
  cursor: pointer;
}

.sortable-ghost {
  background-color: #ADD8E6;
}

</style>
