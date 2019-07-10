const DEFAULT_COLOR_ARRAY = [ // A color-blind friendly palette that will be cycled through for the colors of new metrics
  '#006E82',
  '#8214A0',
  '#005AC8',
  '#00A0FA',
  '#FA78FA',
  '#14D2DC',
  '#AA0A3C',
  '#FA2800',
  '#0AB45A',
  '#F0F032',
  '#A0FA82',
  '#FAE6BE'
]

const NEW_METRIC_DEFAULT_VALUES = { // When adding a metric requires multiple steps, the partial new values are saved here.
  difference_layer: [],
  heatmaps: [],
  buffer_radius: 0,
  parent: null,
  service_metric_id: null,
  geometry_type: 'Point',
  type: 'service'
}

const newMetricStore = {
  state: {
    new_metric_values: {
      ...NEW_METRIC_DEFAULT_VALUES,
      color: DEFAULT_COLOR_ARRAY[0]
    },
    metric_color_index: 0
  },

  mutations: {
    setNewMetricValues(state, new_values) {
      state.new_metric_values = Object.assign(state.new_metric_values, new_values)
    },
    resetNewMetric(state) {
      state.new_metric_values = {
        ...NEW_METRIC_DEFAULT_VALUES,
        color: DEFAULT_COLOR_ARRAY[state.metric_color_index]
      }
    },

    cycleNewMetricColor(state) {
      state.metric_color_index = (state.metric_color_index + 1) % DEFAULT_COLOR_ARRAY.length
    }
  }
}

export default newMetricStore
