<template>
  <div :style="indent" :class="showChildren ? 'has-children' : ''">
    <div class="node group-node" @click="select">
      <span class="folder-wrapper" @click="toggleChildren()">
        <img :src="showChildren ? '/assets/images/arrow-down.svg' : '/assets/images/arrow-right.svg'" style="width: 15px;"/>
        <img :src="'/assets/images/folder-color.svg'"/>
        <editable-label class="group-metric-label" v-model="groupName"/>
      </span>
      <span class="index-node-icons">
        <span class="hover">
          <img class="settings-icon" :src="'/assets/images/settings-dark.svg'" @click="openSettingsMenu($event, group, parent)"/>
          <img class="eye-icon" :src="group.is_checked && parent_is_checked ? '/assets/images/eye_icon_dark.png' : '/assets/images/eye_icon_strike.png'" @click="toggleGroupActive(group)"/>
        </span>
        <span class="regular">
          <img class="eye-icon" :src="group.is_checked && parent_is_checked ? '/assets/images/eye_icon_dark.png' : '/assets/images/eye_icon_light.png'" @click="toggleGroupActive(group)"/>
        </span>
      </span>
    </div>
    <draggable :options="{group: 'groups', emptyInsertThreshold: 10}" v-model="child_groups" style="min-height: 8px">
      <template v-if="showChildren">
        <group-node
          v-for="(child_group, i) in child_groups"
          :group="child_group"
          :index="`${index}-${i}`"
          :key="`folder-${index}-${i}`"
          :depth="depth + 1"
          :parent="group"
          :parent_is_checked="group.is_checked && parent_is_checked"
          @select-node="selectNode"
          @open-settings-menu="openSettingsMenu"
        />
    </template>
    </draggable>
    <draggable :options="{group: 'metrics'}" v-model="child_metrics" style="min-height: 5px">
      <template v-if="showChildren">
        <metric-node
          v-for="(child_metric, i) in child_metrics"
          :metric="child_metric"
          :index="`${index}-${i}`"
          :key="`metric-${index}-${i}`"
          :depth="depth + 1"
          :parent="group"
          :parent_is_checked="group.is_checked"
          @select-node="selectNode"
          @settings-menu="openSettingsMenu"
          @activated-child="activatedChild"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import MetricNode from './MetricNode.vue'
import EditableLabel from '@/components/reusable/EditableLabel'

export default {
  components: {
    draggable,
    MetricNode,
    EditableLabel
  },
  props: {
    group: Object,
    index: String,
    depth: Number,
    parent: Object,
    parent_is_checked: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    showChildren: false,
    selected: false
  }),
  name: 'group-node',
  computed: {
    indent() {
      return { 'padding-left': `${this.depth === 0 ? '0' : '20'}px` }
    },
    child_groups: {
      get() {
        return this.group.child_groups
      },
      set(value) {
        this.$store.commit('updateGroups', {
          new_groups: value,
          parent: this.group
        })
      }
    },
    child_metrics: {
      get() {
        return this.group.child_metrics
      },
      set(value) {
        this.$store.commit('updateMetrics', {
          new_metrics: value,
          parent: this.group
        })
      }
    },
    groupName: {
      get() {
        return this.group.name
      },
      set(value) {
        this.$store.commit('updateGroup', {
          group: this.group,
          new_attrs: {name: value}
        })
      }
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    },
    toggleGroupActive(node) {
      this.$store.commit('toggleActive', node)
      // this.showChildren = !this.showChildren
    },
    select(event) { // Selects this group
      this.selected = !this.selected
      this.$emit('select-node', this)
    },
    selectNode(node) { // Bubbles a selected node to the parent
      this.$emit('select-node', node)
    },
    openSettingsMenu($event, node, parent) {
      this.$emit('open-settings-menu', $event, node, parent)
    },
    activatedChild() { // signals that a child has been activated
      this.$store.commit('forceNodeActive', this.group)
      this.$emit('activated-child')
    },
    deleteGroup(group) {
      this.$store.commit('deleteGroup', {
        group,
        parent: this.group
      })
    },
    deleteMetric(metric) {
      this.$store.commit('deleteMetric', {
        metric,
        parent: this.group
      })
    }
  }
}
</script>

<style>
  .folder-wrapper {
    justify-content: space-between;
  }

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
