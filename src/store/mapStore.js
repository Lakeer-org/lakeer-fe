// import Vue from 'vue'

const mapStore = {
  state: {
    active_circles: [],
    active_points: [],
    modified_boundaries: []
  },
  mutations: {
    setActivePoints(state, points) {
      state.active_points = points
    },
    setActiveCircles(state, circles) {
      state.active_circles = circles
    },
    setModifiedBoundaries(state, modified_boundaries) {
      state.modified_boundaries = modified_boundaries
    }
  }
}

export default mapStore
