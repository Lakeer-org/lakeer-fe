import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import indexStore from './indexStore'
import authStore from './authStore'
import geometryStore from './geometryStore'
import mapStore from './mapStore'
import newMetricStore from './newMetricStore'

Vue.use(Vuex);

const detectUnsavedChangesPlugin = store => {
  store.subscribe((mutation, state) => {
    let indexMutations = store._modules.root._children.index._rawModule.mutations;
    if (mutation.type in indexMutations) {
      let safeMutations = new Set(['setUnsavedChange', 'addIndex', 'resetIndex',
        'blankIndex', 'updateBoundaryColorCode'])
      if (!safeMutations.has(mutation.type)) {
        store.commit('setUnsavedChange', true)
      }
    }
  })
};

const vuexLocal = new VuexPersistence({
  storage: localStorage
});

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin, detectUnsavedChangesPlugin],
  // strict: process.env.NODE_ENV !== 'production',
  state: {},
  modules: {
    index: indexStore,
    auth: authStore,
    geometries: geometryStore,
    map: mapStore,
    new_metric: newMetricStore
  }
});
