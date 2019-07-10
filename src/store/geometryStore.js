import Vue from 'vue'
import { api } from '../services/api'

export default {
  state: {
    service_metrics: {},
    boundaries: {}
  },
  actions: {
    async getMetric(context, metric_id) {
      // if (!context.state.service_metrics[metric_id]) {
      //   let response = await api.get(`service_metrics/${metric_id}`)
      //   context.commit('saveServiceMetric', {
      //     id: metric_id,
      //     data: response.data
      //   })
      // }
      // return context.state.service_metrics[metric_id]
      let response = await api.get(`service_metrics/${metric_id}`)
      return response.data
    },
    async getPolygon(context, metric_id) {
      let response = await api.get(`service_metrics/${metric_id}`)
      return response.data
    },
    async getBoundary(context, {name, level, difference_layers, heatmap_id = null, heatmap_type = null}) {
      //if (!context.state.boundaries[name] && !context.state.boundaries[name][level]) {
      let difference_layer_ids = []
      let difference_layer_radii = []
      // let numpoint_ids = numpoints
      // let numpoint_id = numpoints.map(heatmapMetric => heatmapMetric.service_metric_id)
      difference_layers.forEach((layer) => {
        difference_layer_ids.push(layer.service_metric_id)
        difference_layer_radii.push(layer.buffer_radius)
      })
      let response = await api.get('departments', {params: {
        department_name: name,
        type: level,
        difference_layer_ids,
        difference_layer_radii,
        heatmap_id,
        heatmap_type
      }})
      return response.data
    }
  },
  mutations: {
    saveServiceMetric(state, payload) {
      Vue.set(state.service_metrics, payload['id'], payload['data'])
    },
  }
}
