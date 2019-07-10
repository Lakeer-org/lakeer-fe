<template>
<div>
  <GmapMap
    id="lakeer-map"
    ref="lakeerMapRef"
    style="width:100%;height: 95vh;"
    :zoom="11.8"
    :center="{lat: 17.42, lng: 78.3867}"
    :options="options"
  >
    <GmapCircle
      v-for="(circle, index) in active_circles"
      v-bind="circle"
      :key="`circle-${index}`"
      >
    </GMapCircle>
    <GmapCluster>
      <GmapMarker
        v-for="(point, index) in active_markers"
        v-bind="point"
        :key="`point-${index}`"
        :clickable="true"
        @click="toggleInfoWindow(point,index)"
      />
    </GmapCluster>

    <gmap-polygon
      v-for="(polygon, index) in active_polygons"
      v-bind="polygon"
      :key="`polygon-${index}`"
      :editable="false"
      v-bind:options="polygon['options']"
      @click="toggleInfoWindow(polygon, index)"
    >
    </gmap-polygon>
    <gmap-polyline
      v-for="(polyline, index) in active_polylines"
      v-bind="polyline"
      :key="`polyline-${index}`"
      :editable="false"
      v-bind:options="polyline['options']"
      @click="toggleInfoWindow(polyline, index)"
    >
  </gmap-polyline>
    <gmap-info-window
      v-bind="infoWindow"
      @closeclick="infoWindow.opened=false"
    >
      <table class="table admin-user-table table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(info_value,info_key) in infoContent">
            <td class="text-capitalize" v-if="info_value && info_key != 'id' && info_key != '@id'">{{ info_key.split('_').join(' ').replace('Jurisdictn','Jurisdiction') }}</td>
            <td class="text-capitalize" v-if="info_value && info_key != 'id' && info_key != '@id'">{{ info_value }}</td>
          </tr>
        </tbody>
      </table>
    </gmap-info-window>
  </GmapMap>
  <div class="loader-section" v-if="ajaxLoader">
    <span class="glyphicon glyphicon-refresh"></span>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { gmapApi } from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/src/components/cluster'
import _ from 'lodash'
import Promise from 'bluebird'
import { ICON_OPTIONS } from '@/store/indexStore'
import { EXIF } from 'exif-js'
import { rasterMS } from '@/services/api'

Vue.component('GmapCluster', GmapCluster)

const earthRadii = {
  mi: 3963.1676,
  km: 6378.1,
  ft: 20925524.9,
  mt: 6378100,
  'in': 251106299,
  yd: 6975174.98,
  fa: 3487587.49,
  na: 3443.89849,
  ch: 317053.408,
  rd: 1268213.63,
  fr: 31705.3408
}

const Z_INDICES = {
  marker: 4,
  buffer: 3,
  polygon: 2,
  heatmap: 1,
  boundary: 0
}

function boundariesFromLabels(boundaryLabels) {
  return boundaryLabels.map(label => ({
    name: label.split('-')[0],
    level: label.split('-')[1],
    label: label
  }))
}

function labelsFromBoundaries(boundaries) {
  return boundaries.map(boundary => `${boundary.name}-${boundary.level}`)
}

function flatten_feature_collection(collection) { // turns any GeoJson geometry into a collection of points
  return collection.reduce((acc, feature) => {
    if (feature.geometry.type === 'Point') {
      return [...acc, {properties: feature.properties, coordinates: feature.geometry.coordinates}]
    } else if (feature.geometry.type === 'Polygon') {
      let flat_rings = feature.geometry.coordinates.reduce((acc, ring) => {
        return [...acc, ...ring]
      }, [])
      let reducedPoints = [...acc, ...flat_rings]
      return reducedPoints.map(point => ({coordinates: point, properties: 'placeholder'}))
    } else {
      return [...acc]
    }
  }, [])
}

async function get_metrics(metrics, transformer, store) {
  return Promise.map(
    metrics,
    async (metric) => {
      let feature_collection = await store.dispatch('getMetric', metric.service_metric_id)
      return flatten_feature_collection(feature_collection.features).map(point => transformer(point, metric))
    }
  ).reduce((acc, value) => [...acc, ...value], [])
}
async function get_polygons(polygons, polygon_mapper, store) {
  return Promise.map(
    polygons,
    async (polygon) => {
      let feature_collection = await store.dispatch('getPolygon', polygon.service_metric_id)
      return feature_collection.features.map(feature => polygon_mapper(feature, polygon))
    }
  ).reduce((acc, value) => [...acc, ...value])
}
async function get_polylines(polylines, polyline_mapper, store) {
  return Promise.map(
    polylines,
    async (polyline) => {
      let feature_collection = await store.dispatch('getPolygon', polyline.service_metric_id)
      return feature_collection.features.map(feature => polyline_mapper(feature, polyline))
    }
  ).reduce((acc, value) => [...acc, ...value])
}

async function activeHeatmapsWatcher(new_heatmaps, old_heatmaps) {
  // let unchangedHeatmaps = _.intersection(old_heatmaps, new_heatmaps)
  // let addedHeatmaps = _.difference(new_heatmaps, unchangedHeatmaps)
  // let removedHeatmaps = _.difference(old_heatmaps, unchangedHeatmaps)
  let modifiedHeatmaps = _.xor(new_heatmaps, old_heatmaps)
  let modifiedBoundaries = modifiedHeatmaps // BUG: Heatmap array will be empty if the boundary was deleted
    .map(metric => metric.heatmaps)
    .reduce((acc, heatmap) => _.union(acc, heatmap), [])
  // Remove and reset styles
  // Remove and reload changed boundaries
  this.loadBoundaries(this.removeBoundaries(modifiedBoundaries))
}

async function activeDifferenceLayersWatcher(new_layers, old_layers) {
  // let unchangedDifferenceLayers = _.intersection(old_layers, new_layers)
  // let addedDifferenceLayers = _.difference(new_layers, unchangedDifferenceLayers)
  // let removedDifferenceLayers = _.difference(old_layers, unchangedDifferenceLayers)

  let modifiedDifferenceLayers = _.xor(new_layers, old_layers)
  let modifiedBoundaries = modifiedDifferenceLayers
    .map(metric => metric.difference_layer)
    .reduce((acc, differenceLayer) => _.union(acc, differenceLayer), [])

  this.loadBoundaries(this.removeBoundaries(modifiedBoundaries))
}

function modifiedBoundariesWatcher (modified_boundaries) {
  if (modified_boundaries.length > 0) {
    let removedBoundaries = this.removeBoundaries(modified_boundaries)
    this.loadBoundaries(removedBoundaries)
    this.$store.commit('setModifiedBoundaries', [])
  }
}

export default {
  data: () => ({
    mapRef: null,
    initializing: true,
    // For different loaders
    loading: {
      circles: false,
      markers: false,
      boundaries: false,
      raster: false
    },
    // For the info window
    infoWindow: {
      position: null,
      opened: false,
      options: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    },
    currentMarkerId: null,
    infoContent: {},
    active_markers: [],
    active_circles: [],
    visibleOverlays: {}, // This attribute saves all currently selected rasters
    visibleBoundaries: {}, // This attribute saves all currently selected boundaries
    appliedStyles: {}, // This attribute saves all styles that should be applied on top of boundaries
    active_polygons: [],
    active_polylines: [],
    active_traffic_layer: false,
    trafficLayer: '',
    polygon_layers: [],
    polyline_layers: [],
    options: {
      fullscreenControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: 3
      },
      styles: [
        { 'stylers': [{ 'saturation': -100 }] },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [{ 'color': '#0099dd' }]
        },
        {
          'elementType': 'labels',
          'stylers': [{ 'visibility': 'off' }]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [{ 'color': '#aadd55' }]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels',
          'stylers': [{ 'visibility': 'on' }]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.text',
          'stylers': [{ 'visibility': 'on' }]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text',
          'stylers': [{'visibility': 'on'}]
        }
      ]
    }
  }),
  computed: {
    google: gmapApi,
    activeMetrics: function () {
      return this.$store.getters.activeMetrics
    },
    activeMarkers: function () {
      return this.$store.getters.activeMarkers
    },
    activePolygons: function () {
      return this.$store.getters.activePolygons
    },
    activePolylines: function () {
      return this.$store.getters.activePolylines
    },
    activeCircles: function () {
      return this.$store.getters.activeCircles
    },
    activeDifferenceLayers: function () {
      return this.$store.getters.activeDifferenceLayers
    },
    activeHeatmaps: function () {
      return this.$store.getters.activeHeatmaps
      //return this.$store.state.activeHeatmaps
    },
    storeBoundaries: function () {
      return this.$store.state.index.boundaries
    },
    selectedRasters: function () {
      return this.$store.state.index.selectedRasters
    },
    ajaxLoader() {
      return this.loading.circles || this.loading.markers || this.loading.boundaries || this.loading.raster
    },
    activeTrafficLayer: function () {
      return this.$store.getters.activeTrafficLayer
    },
    modifiedBoundaries: function () {
      return this.$store.state.map.modified_boundaries
    }
  },

  async beforeCreate() {
    // this.$store.commit('blankIndex') // resets the index to a completely blank state so nothing is loaded that doesn't have to
  },

  created() {
    this.debouncedReloadStoreBoundaries = _.debounce(this.reloadStoreBoundaries, 1500)
  },

  async mounted() {
    await this.$store.dispatch('loadIndex')
    await this.$gmapApiPromiseLazy() // Waits until the google API is available
    this.mapRef = await this.$refs.lakeerMapRef.$mapPromise
    this.loadMarkersAndCircles()
    if (this.storeBoundaries) {
      await this.loadBoundaries(this.storeBoundaries)
    } else {
      this.initializing = false
    }
    if (this.selectedRasters) {
      this.loadRasters(this.selectedRasters)
    }
    this.$watch('activeHeatmaps', activeHeatmapsWatcher)
    this.$watch('activeDifferenceLayers', activeDifferenceLayersWatcher)
    this.$watch('storeBoundaries', this.debouncedReloadStoreBoundaries)
    this.$watch('modifiedBoundaries', modifiedBoundariesWatcher)
    // TODO: Use the same logic for boundary watcher
  },

  beforeDestroy() {

  },

  watch: {
    activeTrafficLayer: function (active_traffic_layer) {
      this.load_traffic_layer(active_traffic_layer)
    },
    activeCircles: function (active_circles) {
      this.load_circles(active_circles)
    },
    activeMarkers: function (active_markers) {
      this.load_markers(active_markers)
    },
    activePolygons: function (active_polygons) {
      this.removePolygons().then(() => {
        this.load_polygons(active_polygons)
      })
    },
    activePolylines: function (active_polylines) {
      this.removePolylines().then(() => {
        this.load_polylines(active_polylines)
      })
    },
    selectedRasters: function (rasters) {
      let oldRasterKeys = _.keys(this.visibleOverlays)
      let currentRasterKeys = rasters.map(raster => raster.name)
      let unchangedRasterKeys = _.intersection(oldRasterKeys, currentRasterKeys)
      let addedRasterKeys = _.difference(currentRasterKeys, unchangedRasterKeys)
      let removedRasterKeys = _.difference(oldRasterKeys, unchangedRasterKeys)

      this.removeRasters(removedRasterKeys)
      this.loadRasters(rasters.filter(raster => addedRasterKeys.includes(raster.name)))
    }
  },
  methods: {
    toggleInfoWindow(marker, id) {
      this.infoWindow.position = marker.position
      this.infoContent = marker.properties
      this.infoWindow.opened = false
      if (this.currentMarkerId === id) {
        this.infoWindow.opened = !this.infoWindow.opened
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWindow.opened = true
        this.currentMarkerId = id
      }
    },

    async load_traffic_layer(active_layer) {
      if (active_layer) {
        this.trafficLayer.setMap(this.mapRef)
      } else {
        this.trafficLayer.setMap(null)
      }
    },

    async loadBoundaries(newBoundaries) {
      await Promise.each(newBoundaries, async boundary => {
        let polygons = await this.loadBoundary(boundary)
        if (polygons) {
          this.visibleBoundaries[`${boundary.name}-${boundary.level}`] = polygons
        }
      })
      this.initializing = false
    },

    removeBoundaries(removedBoundaries) {
      let final_removed_boundaries = []
      removedBoundaries.forEach((boundary) => {
        let polygons = this.visibleBoundaries[boundary.label]
        if (polygons) {
          polygons.forEach((polygon) => this.mapRef.data.remove(polygon))
          delete this.visibleBoundaries[boundary.label]
          final_removed_boundaries.push(boundary)
        }
        // polygons.forEach(polygon => { polygon.setMap(null) })
      })
      return final_removed_boundaries
    },

    async removePolygons() {
      this.polygon_layers.map((polygon_layer) => {
        polygon_layer.setMap(null)
      })
      this.polygon_layers = []
    },

    async removePolylines() {
      this.polyline_layers.map((polyline_layer) => {
        polyline_layer.setMap(null)
      })
      this.polyline_layers = []
    },

    async loadBoundary({name, level, label}) {
      function getBoundaryModifiers({name, level}, modifierList, attr) {
        /**
        * Gets all the metrics that are acting as a modifier (like a difference layer or a heatmap) of the given boundary
        * @name: the name of the boundary (ex: GHMC)
        * @level: the level inside the boundary (ex: circle, ward)
        * @modifierList: the list of all metrics that could be acting as a modifier for this metric
        * @attr: the attribute inside each metric that will be used to find the boundary (ex: heatmaps, difference_layers)
        */
        return modifierList.filter((modifier) => {
          let boundaryList = modifier[attr]
            .filter((boundary) => boundary.name === name && boundary.level === level)
          return boundaryList.length > 0
        })
      }

      this.loading.boundaries = true
      let map = this.mapRef
      let boundaryDifferenceLayers = getBoundaryModifiers({name, level}, this.activeDifferenceLayers, 'difference_layer')
      let boundaryHeatmaps = getBoundaryModifiers({name, level}, this.activeHeatmaps, 'heatmaps')
      let heatmap_id
      let heatmap_type
      if (boundaryHeatmaps.length > 0) {
        if (boundaryHeatmaps.length > 1) {
        }
        heatmap_type = boundaryHeatmaps[0].type
        if (heatmap_type === 'service') {
          heatmap_id = boundaryHeatmaps[0].service_metric_id
        } else if (heatmap_type === 'heatmap') {
          heatmap_id = boundaryHeatmaps[0].service_metric_id
        }
      }
      // let boundaryHeatmaps = this.$store.state.index.activeHeatmaps
      let boundary_geojson = await this.$store.dispatch('getBoundary', {
        name: name,
        level: level,
        difference_layers: boundaryDifferenceLayers,
        heatmap_id,
        heatmap_type
      })
      let polygons
      // HACK: Checks at the end of the async operation if the boundary should
      // still be loaded. If not, does nothing
      if (this.storeBoundaries.map(boundary => boundary.label).includes(label)) {
        polygons = map.data.addGeoJson(boundary_geojson)

        // Resets or redraws special heatmap styles, if any
        delete this.appliedStyles[label]
        if (boundaryHeatmaps.length > 0) {
          this.applyHeatMap({gmapBoundary: boundary_geojson, dataLayer: map.data, boundary: {name, level, label}})
        }
        this.resetStyles(map.data)

        map.data.addListener('mouseover', function (e) {
          map.data.overrideStyle(e.feature, {
            strokeColor: '#2a2a2a',
            strokeWeight: 2,
            zIndex: Z_INDICES.boundary
          })
        })
        map.data.addListener('mouseout', function (e) {
          map.data.revertStyle()
        })
        let infoWindow = new this.google.maps.InfoWindow({
          content: ''
        })
        map.data.addListener('click', e => {
          let info_content = '<table class="table admin-user-table table-hover">' +
            '<thead class="thead-dark"><tr><th>Key</th><th>Value</th></tr></thead></thead><tbody>'

          e.feature.forEachProperty(function(value, property) {
            if (value && (String(value).toLocaleLowerCase() != 'null')) {
              info_content += '<tr><td class="text-capitalize col-md-4">'+property.split('_').join(' ')+'</td>' +
                '<td class="text-capitalize col-md-8">' + value + '</td>'
            }
          })
          info_content += '</tbody></table>'
          infoWindow.setContent(info_content)

          let anchor = new this.google.maps.MVCObject()
          anchor.set('position', e.latLng)
          infoWindow.open(map, anchor)
        })
      }

      this.loading.boundaries = false
      return polygons
    },

    resetStyles(map_data) {
      map_data.setStyle({})
      // The following function gets all values from the appliedStyles array
      let styleKeys = Object.keys(this.appliedStyles)
      styleKeys.forEach(key => {
        map_data.setStyle(this.appliedStyles[key])
      })
    },

    async loadRasters(activeRasters) {
      this.loading.raster = true
      await Promise.each(activeRasters, async raster => {
        let response = await rasterMS.get(`/rasters/${raster.name}`, {
          params: {
            color1: raster.colors.color1,
            color2: raster.colors.color2
          }
        })
        let bounds = response.data.position
        let overlayOpts = {
          opacity: 1
        }
        let overlay = new this.google.maps.GroundOverlay(
          response.data.url,
          bounds,
          overlayOpts
        )
        overlay.setMap(this.mapRef)
        this.visibleOverlays[raster.name] = overlay
      })
      this.loading.raster = false
    },

    removeRasters(removedKeys) {
      removedKeys.forEach((key) => {
        let overlay = this.visibleOverlays[key]
        overlay.setMap(null)
        delete this.visibleOverlays[key]
      })
      // loop through all removed ra
    },

    async load_polygons(active_polygons) {
      function transformCoordinates(array) {
          if (typeof array[0] === 'object') {
            return array.map(a => {
              return transformCoordinates(a);
            })
          } else {
            return { lat: array[1], lng: array[0] }
          }
      }
      function polygon_mapper(feature, metric) {
        let paths = transformCoordinates(feature.geometry.coordinates)
        if (paths.constructor === Array) {
          let updated_polygon_data = {}
          if (feature.geometry.type === "LineString") {
            updated_polygon_data = {
              path: paths,
              options: { strokeColor: metric.color, zIndex: Z_INDICES.polygon },
              properties: feature.properties,
              position: paths[0]
            }
          } else {
            updated_polygon_data = {
              paths: paths,
              options: { strokeColor: metric.color, zIndex: Z_INDICES.polygon },
              properties: feature.properties,
              position: paths[0][0]
            }
          }
          return updated_polygon_data;
        } else {
          return {
            paths: []
          };
        }

        // let polygon_layer = new google.maps.Data();
        // polygon_layer.addGeoJson(feature_collection)
        // polygon_layer.setStyle({
        //   strokeColor: `#${metric.color.substring(1)}`,
        //   fillColor: `#${metric.color.substring(1)}`,
        //   strokeWeight: 5,
        //   zIndex: 3
        // });
        // let infoWindow = new this.google.maps.InfoWindow({
        //   content: 'default'
        // })
        // polygon_layer.addListener('click', e => {
        //   let info_content = '<table class="table admin-user-table table-hover">' +
        //     '<thead class="thead-dark"><tr><th>Key</th><th>Value</th></tr></thead></thead><tbody>'
        //
        //   e.feature.forEachProperty(function(value,property) {
        //     if (value && (value.toLocaleLowerCase() != 'null')) {
        //       info_content += '<tr><td class="text-capitalize">'+property+'</td>' +
        //         '<td class="text-capitalize">' + value + '</td>'
        //     }
        //
        //   });
        //   info_content += '</tbody></table>'
        //   infoWindow.setContent(info_content)
        //
        //   let anchor = new this.google.maps.MVCObject()
        //   anchor.set("position", e.latLng)
        //   infoWindow.open(map, anchor)
        // })
        // polygon_layer.setMap(map)
        // this.polygon_layers.push(polygon_layer)
      }
      this.active_polygons = await get_polygons(active_polygons, polygon_mapper.bind(this), this.$store)
    },

    async load_polylines(active_polylines) {
      function transformCoordinates(array) {
        if (typeof array[0] === 'object') {
          return array.map(a => {
            return transformCoordinates(a);
          })
        } else {
          return { lat: array[1], lng: array[0] }
        }
      }
      function polyline_mapper(feature, metric) {
        let paths = transformCoordinates(feature.geometry.coordinates)
        if (paths.constructor === Array) {
          let updated_polygon_data = {
            path: paths,
            options: { strokeColor: metric.color, zIndex: Z_INDICES.polygon },
            properties: feature.properties,
            position: paths[0]
          }
          return updated_polygon_data
        } else {
          return {
            paths: []
          }
        }
      }
      this.active_polylines = await get_polylines(active_polylines, polyline_mapper.bind(this), this.$store)
    },

    applyHeatMap({gmapBoundary, boundary, dataLayer}) {
      // helpers
      function heatMapColorFunction({colors, min = 0, max}) {
        if (!colors) {
          colors = ['#e55800', '#dd9100', '#d5c600', '#a5ce00', '#69c600', '#31bf00']
        }
        let ranges = colors.length   // Amount of elements to be returned.
        let range = (max - min) / ranges       // Difference between min and max
        let scales = colors.map((color, i) => ({
          min: Math.ceil(min + range * i),
          max: Math.ceil(min + range * (i+1)),
          colorCode: color
        }))
        return scales
      }
      function colorFunction(scales, numpoints) {
        for (let scale of scales) {
          if (numpoints >= scale.min && numpoints <= scale.max) {
            return scale.colorCode
          }
        }
      }
      let numpoints_arr = gmapBoundary.features.map(feature => feature.properties.numpoints)
      let maxValue = numpoints_arr.reduce((a, b) => Math.max(a, b), 0) // Getting Average of numpoint
      let scales = heatMapColorFunction({max: maxValue})
      this.$store.commit('updateBoundaryColorCode', scales)
      this.appliedStyles[boundary.label] = feature => {
        if (feature.l.boundary === boundary.name && feature.l.level === boundary.level) {
          return {
            fillColor: colorFunction(scales, feature.l.numpoints), // call function to get color for state based on the COLI (Cost of Living Index)
            fillOpacity: 0.8,
            strokeColor: '#b3b3b3',
            strokeWeight: 1,
            zIndex: Z_INDICES.heatmap
          }
        }
      }
    },

    async load_markers(active_metrics) {
      function plant_survival_color(value) {
        if (value < 10) {
          return '#FF0000'
        } else if (value < 20) {
          return '#FF3300'
        } else if (value < 30) {
          return '#FF7700'
        } else if (value < 40) {
          return '#FFBB00'
        } else if (value < 50) {
          return '#FFFF00'
        } else if (value < 60) {
          return '#CCFF00'
        } else if (value < 70) {
          return '#99FF00'
        } else if (value < 80) {
          return '#66FF00'
        } else if (value < 90) {
          return '#33FF00'
        } else if (value <= 100) {
          return '#00FF00'
        }
      }
      // Helpers
      function marker_transformer(point, metric) {
        let fill_color
        if (point.properties && point.properties['No of Plants Planted']) {
          let plant_survival_percent = Math.ceil((point.properties['No of Plants Survived'] / point.properties['No of Plants Planted']) * 100)
          fill_color = plant_survival_color(plant_survival_percent)
          point.properties['Percentage of plants survived'] = plant_survival_percent
        } else {
          fill_color = `#${metric.color.substring(1)}`
        }
        let markerIcon
        if (metric.icon in ICON_OPTIONS) {
          markerIcon = ICON_OPTIONS[metric.icon]
        } else {
          markerIcon = ICON_OPTIONS['circle']
        }
        let g_point = {
          name: metric.name,
          type: metric.type,
          metric_id: metric.service_metric_id,
          properties: point.properties,
          position: {lat: point.coordinates[1], lng: point.coordinates[0]},
          icon: {
            // url: 'https://s3.amazonaws.com/platform.lakeer.org/map-marker-icons/circle.svg',
            path: markerIcon.d,
            // scaledSize: new this.google.maps.Size(10, 10),
            fillColor: fill_color,
            fillOpacity: 1,
            strokeColor: 'red',
            scale: markerIcon.scale || 1,
            strokeWeight: 0
          }
        }
        // Vue.set(g_point, 'icon', `http://www.googlemapsmarkers.com/v1/${metric.color.substring(1)}`)
        let options = {
          zIndex: Z_INDICES.marker
        }
        Vue.set(g_point, 'options', options)
        return g_point
      }
      this.loading.markers = true
      await this.$nextTick()
      this.active_markers = await get_metrics(active_metrics, marker_transformer.bind(this), this.$store)
      await this.$nextTick()
      setTimeout(() => { this.loading.markers = false }, this.active_markers.length * 0)
    },

    async load_circles(active_circles) {
      // Helpers
      function circle_transformer(data, buffer_metric) {
        const unitKey = 'km'
        let g_circle = {
          radius: (buffer_metric.buffer_radius / earthRadii[unitKey]) * earthRadii['mt'],
          center: {lat: data.coordinates[1], lng: data.coordinates[0]},
          name: buffer_metric.name,
          clickable: true,
          draggable: false,
          editable: false
        }
        let options = {
          fillOpacity: 0.5,
          strokeColor: '#4baf50',
          strokeOpacity: 0.62,
          strokeWeight: 1,
          fillColor: buffer_metric.color,
          zIndex: Z_INDICES.buffer
        }
        Vue.set(options, 'fillColor', buffer_metric.color)
        Vue.set(g_circle, 'options', options)
        return g_circle
      }

      this.loading.circles = true
      await this.$nextTick()
      this.active_circles = await get_metrics(active_circles, circle_transformer, this.$store)
      await this.$nextTick()
      this.loading.circles = false
    },

    loadMarkersAndCircles() {
      this.load_markers(this.activeMarkers)
      this.load_circles(this.activeCircles)
      this.trafficLayer = new this.google.maps.TrafficLayer()
      this.load_traffic_layer(this.active_traffic_layer)
      this.load_polygons(this.activePolygons)
      this.load_polylines(this.activePolylines)
    },

    reloadStoreBoundaries(boundaries) {
      let oldBoundaryKeys = _.keys(this.visibleBoundaries) // All boundaries currently loaded in the map
      let currentBoundaryKeys = labelsFromBoundaries(boundaries) // Keys of the boundaries in the store
      let unchangedBoundaryKeys = _.intersection(oldBoundaryKeys, currentBoundaryKeys) // Keys of the boundaries that are both in the store and in the gmap
      let addedBoundaryKeys = _.difference(currentBoundaryKeys, unchangedBoundaryKeys)// Keys of the boundaries that are in the store, but not yet in the gmap
      let removedBoundaryKeys = _.difference(oldBoundaryKeys, unchangedBoundaryKeys)// Keys of the boundaries that are still in the gmap, but no longer in the store
      this.removeBoundaries(boundariesFromLabels(removedBoundaryKeys)) // Deletes the obsolete boundaries from the gmap
      this.loadBoundaries(boundaries.filter(boundary => addedBoundaryKeys.includes(`${boundary.name}-${boundary.level}`))) // Loads those boundaries from the store that aren't still on the heatmap
    }
  }
}

</script>
