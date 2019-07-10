import { api } from '../services/api'
import router from '../router'
import Vue from 'vue'

import _ from 'lodash'

// Icon options
import IconCircle from '@/components/icons/IconCircle.js'
import IconMarker from '@/components/icons/IconMarker.js'

export const ICON_OPTIONS = {
  'circle': IconCircle,
  'marker': IconMarker
}

const EMPTY_VALUES = {
  name: '',
  id: null,
  description: '',
  child_groups: [],
  child_metrics: [],
  owner_id: '',
  boundaries: [],
  selectedRasters: [], // TODO: Document
  boundaryColorCodeRange: [],
  //  activeHeatmaps: [], // Obsolete when heatmaps are moved to metrics
  has_unsaved_changes: false
}

const DEFAULT_STARTING_VALUES = {
  ...EMPTY_VALUES,
  name: 'New Analysis',
  boundaries: [
    {
      name: 'GHMC',
      level: 'Zone',
      label: 'GHMC-Zone'
    }
  ]
}

const store = {
  state: EMPTY_VALUES,
  actions: {
    async loadIndex (context) {
      let index_id = router.currentRoute.params.id
      /* eslint-disable-next-line eqeqeq */ // We need null != undefined to be false
      if (index_id != context.state.id) { // Checks if the saved index is different from the current id
        if (index_id === undefined) {
          let user_id = context.rootState.auth.user_id
          context.commit('resetIndex', user_id)
        } else {
          try {
            let response = await api.get(`indices/${index_id}`)
            context.commit('addIndex', response.data)
          } catch (e) {
            Vue.notify({
              group: 'metric-add',
              title: 'Important message',
              text: 'Requested page not found, Please wait we are redirecting.'
            })
            window.setTimeout(function () {
              window.location.href = '/dashboard'
            }, 2100)
          }
        }
      }
    },
    async create_or_update_index (context) {
      let response
      // Updates the current index if the user owns it, otherwise creates a new one
      if (context.state.owner_id === context.rootState.auth.user_id && context.state.id !== null) {
        response = await api.put(`indices/${context.state.id}`, context.state)
      } else {
        response = await api.post('indices/', context.state)
      }
      // context.commit('addIndex', response.data) //To reload the index based on the returned results
      // The above line is unneeded if we are leaving the index immediately after saving
      context.commit('setUnsavedChange', false)
      Vue.notify({
        group: 'metric-add',
        title: 'Important message',
        text: 'Your analysis is saved. Please wait we are redirecting.'
      })
      window.setTimeout(function () {
        window.location.href = '/dashboard'
      }, 2100)
    },
    addSavedMetric(context) {
      context.commit('addMetric', context.rootState.new_metric.new_metric_values)
      context.commit('cycleNewMetricColor')
      context.commit('resetNewMetric')
    },
    removeSavedMetric(context) {
      context.commit('removeMetric', context.rootState.new_metric.new_metric_values)
      context.commit('resetNewMetric')
    }
  },
  mutations: {
    setUnsavedChange(state, new_value = true) {
      state.has_unsaved_changes = new_value
    },
    resetIndex(state, user_id) {
      Object.assign(state, {
        ...DEFAULT_STARTING_VALUES,
        owner_id: user_id
      })
    },
    blankIndex(state) {
      Object.assign(state, {...EMPTY_VALUES})
    },
    removeHeatmap(state, heatmap_metric) {
      // state.activeHeatmaps = []
      state.boundaryColorCodeRange = []
      heatmap_metric.heatmaps = []
    },
    async destroyIndex(state, index_id) {
      let response = await api.delete('indices/' + index_id)
    },
    addIndex(state, payload) {
      state.name = payload.name
      state.id = payload.id
      state.description = payload.description
      state.child_groups = payload.child_groups
      state.child_metrics = payload.child_metrics
      state.owner_id = payload.owner_id
      state.boundaries = payload.boundaries
      state.has_unsaved_changes = false
      state.selectedRasters = payload.selectedRasters || []
    },
    addGroup(state, {parent, new_group = {}}) {
      let {
        name = 'New Group',
        child_groups = [],
        child_metrics = [],
        is_checked = false
      } = new_group
      if (parent == null) { parent = state }
      parent.child_groups.push({name, child_groups, child_metrics, is_checked})
      // console.log(state.child_groups)
    },
    addMetric(state, new_metric = {}) {
      let {
        name = 'New metric',
        type = 'service',
        geometry_type = 'Point',
        is_checked = false,
        icon = 'circle',
        color = '#FF0000',
        buffer_radius = 0,
        service_metric_id = null,
        difference_layer = [],
        heatmaps = [],
        parent = null
      } = new_metric // destructures the received new_metric with default values
      if (parent == null) { parent = state }
      parent.child_metrics.push({
        name,
        type,
        is_checked,
        icon,
        color,
        buffer_radius,
        service_metric_id,
        difference_layer,
        heatmaps,
        geometry_type
      }) // restructures the metric. THis makes sure no unsupported data is added to the new metric
    },
    removeMetric(state, new_metric = {}) {
      let {
        service_metric_id = null,
        parent = null
      } = new_metric // destructures the received new_metric with default values
      if (parent == null) { parent = state }
      parent.child_metrics.splice(
        parent.child_metrics.findIndex(
          metric => metric.service_metric_id === service_metric_id
        ), 1
      ) // restructures the metric. THis makes sure no unsupported data is added to the new metric
    },
    /**
     * Adds the currently saved metric in new_metric_value to the index
    */
    updateGroups(state, {parent, new_groups}) {
      parent.child_groups = new_groups
    },
    updateMetric(state, {metric, new_attrs}) {
      for (let key in new_attrs) {
        if (key === 'color') {
          // UGLY HACK to force reload whenever the color changes, this should be replaced later with more time
          metric.buffer_radius = metric.buffer_radius + 0.1
          metric.buffer_radius = metric.buffer_radius - 0.1
        }
        if (key === 'difference_layer') {
          metric.difference_layer.push(...new_attrs[key])
        } else if (key === 'heatmaps') {
          metric.heatmaps.push(...new_attrs[key])
        } else if (key === '') {

        } else {
          metric[key] = new_attrs[key]
        }
      }
    },
    updateGroup(state, {group, new_attrs}) {
      for (let key in new_attrs) {
        group[key] = new_attrs[key]
      }
    },
    updateMetrics(state, {parent, new_metrics}) {
      parent.child_metrics = new_metrics
    },
    updateHeatmap(state, {metric}) {
      //state.activeHeatmaps = [metric.service_metric_id]
    },
    deleteGroup(state, {group, parent}) {
      let index = parent.child_groups.indexOf(group)
      parent.child_groups.splice(index, 1)
      // parent.child_groups = parent.child_groups.filter(filtered_group => filtered_group.name !== group.name)
    },
    deleteMetric(state, {metric, parent}) {
      parent.child_metrics = parent.child_metrics.filter(filtered_metric => filtered_metric.name !== metric.name)
    },
    forceNodeActive(state, node) {
      node.is_checked = true
    },
    toggleActive(state, node) {
      function toggleActiveHelper(node, activeStatus) {
        // base case
        node.is_checked = activeStatus
        // recursive case
        if (node.child_groups) {
          for (let group of node.child_groups) {
            toggleActiveHelper(group, activeStatus)
          }
        }
        if (node.child_metrics) {
          for (let metric of node.child_metrics) {
            toggleActiveHelper(metric, activeStatus)
          }
        }
      }
      toggleActiveHelper(node, !node.is_checked)
      if ((node.is_checked === false) && (node.heatmaps !== undefined && node.heatmaps.length > 0)) {
        state.boundaryColorCodeRange = []
      }
    },
    toggleEditing(state, action) {
      state.groups.map((t, i) => {
        if (action.index.id === t.id) {
          state.groups[i].editing = !state.groups[i].editing
        }
      })
    },
    selectBoundaries(state, boundaries) {
      state.boundaries = boundaries
    },
    addRaster(state, {name, colors}) {
      state.selectedRasters.push({name, colors})
    },
    removeRaster(state, {name}) {
      let rasterIndex = _.findIndex(state.selectedRasters, raster => raster.name === name)
      state.selectedRasters.splice(rasterIndex)
      // TODO: Add a way to delete a raster based on its name
    },
    updateBoundaryColorCode(state, colorCodeRange) {
      state.boundaryColorCodeRange = colorCodeRange
    }
  },

  getters: {
    activeMetrics(state) {
      function get_active_metrics (root) {
        // Recursive case: Calls all the active child_groups, and then asks them for their active metrics using this method recursively
        let active_submetrics = root.child_groups
          .filter(group => group.is_checked && group.child_metrics != null)
          .map(group => get_active_metrics(group))
          .reduce((acc, value) => [...acc, ...value], [])
        // Base case: gets an array of all metrics in the current level which are currently active, appends it to the child_groups, and returns
        let active_metrics = root.child_metrics.filter(metric => metric.is_checked)
        return [...active_metrics, ...active_submetrics]
      }
      return get_active_metrics(state)
    },
    activeServiceMetrics(state, getters) {
      return getters.activeMetrics.filter(
        metric => metric.type === 'service'
      )
    },
    activeMarkers(state, getters) {
      // #HACK to force a state change whenever the color or the icon of an active marker changes, we add a superfluous filter
      return getters.activeServiceMetrics.filter(
        metric => metric.color != null && metric.icon != null && metric.geometry_type === 'Point' &&
                  metric.heatmaps !== undefined && metric.heatmaps.length === 0
      )
    },
    activePolygons(state, getters) {
      // #HACK to force a state change whenever the color of an active marker changes, we add a superfluous filter
      return getters.activeServiceMetrics.filter(
        metric => (metric.color != null && (metric.geometry_type === 'Polygon' || metric.geometry_type === 'MultiLineString'))
      )
    },
    activePolylines(state, getters) {
      // #HACK to force a state change whenever the color of an active marker changes, we add a superfluous filter
      return getters.activeServiceMetrics.filter(
        metric => (metric.color != null && (metric.geometry_type === 'LineString'))
      )
    },
    activeCircles(state, getters) {
      return getters.activeServiceMetrics.filter(metric => metric.difference_layer.length === 0 && metric.buffer_radius > 0)
    },
    activeDifferenceLayers(state, getters) {
      return getters.activeServiceMetrics.filter(metric => metric.difference_layer.length > 0 && metric.buffer_radius > 0)
    },
    activeHeatmaps(state, getters) {
      return getters.activeMetrics
        .filter(metric => metric.type === 'heatmap' ||
                          (metric.heatmaps !== undefined && metric.heatmaps.length > 0))
        // .filter(metric => _.intersection(metric.heatmaps, state.boundaries).length > 0)
    },
    activeTrafficLayer(state, getters) {
      return getters.activeServiceMetrics.filter(metric => metric.name === 'Live Traffic').length > 0
    },
    colorCodeRange(state, getters) {
      return state.boundaryColorCodeRange
    }

  }
}

export default store
