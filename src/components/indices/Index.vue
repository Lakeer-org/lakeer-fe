<template>
  <div>
    <nav-bar></nav-bar>

    <div @contextmenu.prevent="$refs.ctxMenu.open">
      <gmap></gmap>
      <div class="nav-div">
        <left-side-panel></left-side-panel>
      </div>
      <right-options></right-options>
    </div>
    <context-menu id="context-menu" class="context-menu" ref="ctxMenu">
      <li @click="addFolder">Add a Folder</li>
      <li @click="addMetric">Add a Metric</li>
    </context-menu>
    <save-index-modal/>

    <add-layer-modal/>
    <!-- end -->
    <metric-list-modal/>
    <difference-layer-modal/>
    <heatmap-modal/>
    <raster-modal/>

    <!-- Modal -->
    <div class="modal fade" id="undeservedModal" tabindex="-1" role="dialog" aria-labelledby="undeservedLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-title" id="undeservedLabel">Show Undeserved areas</span>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="min-height: 150px;">
            <br>
            <div class="col-md-12">
              <div class="col-md-6">
                Buffer
                <select class="form-control" v-model="undeserved.buffer">
                  <option v-for="item in selected_checkboxes" :value="item" :key="item">
                   {{ item }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                Map
                <select class="form-control" v-model="undeserved.level">
                  <option v-for="item in ['Zone', 'Circle', 'Ward']" :value="item" :key="item">
                   {{ item }}
                  </option>
                </select>
              </div>
            </div>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="loadUndeservedBoundary('GHMC', 'Zone', $event)">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import NavBar from '../layouts/NavBar.vue'
import GMap from './GMap.vue'
import LeftSidePanel from './LeftSidePanel/LeftSidePanel.vue'
import RightOptions from './RightOptions.vue'
import MetricListModal from './modals/MetricListModal.vue'
import AddLayerModal from './modals/AddLayerModal.vue'
import SaveIndexModal from './modals/SaveIndexModal.vue'
import DifferenceLayerModal from './modals/DifferenceLayerModal.vue'
import HeatmapModal from './modals/HeatmapModal.vue'
import RasterModal from './modals/RasterModal.vue'
import ContextMenu from 'vue-context-menu'

export default {
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.index.has_unsaved_changes) {
      const answer = window.confirm('Do you want to save your changes before leaving?')
      if (answer) {
        $('#saveModal').modal('show')
        next(false)
      } else {
        this.$store.commit('setUnsavedChange', false) // So the other window does not trigger
        next()
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', event => {
      if (this.$store.state.index.has_unsaved_changes) {
        event.preventDefault()
        event.returnValue = ''
      }
    })
  },
  data() {
    return {
      map: 'map',
      filters: {
        boundaries: [],
        assets: [],
        grievances: [],
        heatmaps: [],
        bufferRadius: {}
      },
      ajaxLoader: true,
      selected_checkboxes: [],
      areas: [],
      undeserved: {},
      index_id: ''
    }
  },
  components: {
    NavBar,
    'gmap': GMap,
    MetricListModal,
    AddLayerModal,
    SaveIndexModal,
    DifferenceLayerModal,
    HeatmapModal,
    RasterModal,
    LeftSidePanel,
    RightOptions,
    ContextMenu
  },
  methods: {
    addFolder: function () {
      this.$store.commit('addGroup', {
        name: 'New Group', child_groups: [], child_metrics: [], is_checked: true
      })
    },
    addMetric: function () {
      $('#addLayerModal').modal('show');
    },
    downloadPdf() {
      var element = $('#lakeer-map');
      var pdfOptions = {
        orientation: "portrait", // One of "portrait" or "landscape" (or shortcuts "p" (Default), "l")
        unit: "pt",              //Measurement unit to be used when coordinates are specified. One of "pt" (points), "mm" (Default), "cm", "in"
        format: "a4"            //One of 'a3', 'a4' (Default),'a5' ,'letter' ,'legal'
      };
      var doc = new jsPDF(pdfOptions);

      var pageWidth = doc.internal.pageSize.width-20;
      var width  =  pageWidth;
      html2canvas(document.querySelector("#lakeer-map"), {
        useCORS: true,
        async:false
      }).then(canvas => {
        var imgWidth = element[0].offsetWidth
        var imgHeight = element[0].offsetHeight
        var height =  (pageWidth * imgHeight)/ imgWidth
        doc.addImage(canvas, 'PNG', 10, 30 , 550, 550);
        doc.save('lakeer.pdf');
      });
    },
    updateUrlParam() {
      var obj = this.filters
      var str = Object.keys(obj).map(function(key) {
        if (obj[key].constructor === Array) {
          return obj[key].map(function(value) {
            return key + '=' + value
          }).join('&');
        }
      }).join('&');
      window.history.replaceState(null, null, "?"+str);
    },
    loadUndeservedBoundary(boundary_name, boundary_type, event) {
      var radius = this.filters.bufferRadius[this.undeserved.buffer]
      var service_metric_value = this.undeserved.buffer
      var map = this.map
      // Remove Existing layers
      map.data.forEach(function(feature) {
        map.data.remove(feature);
      });
      for(var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
        this.removeBufferCircle(this.markers[i].service_metric)
      }

      this.areas.push(event.target.value)
      // NOTE: This uses cross-domain XHR, and may not work on older browsers.
      var boundary_layer = map.data
      // boundary_layer.loadGeoJson(
      //   this.$http.options.root+'departments?token='+this.accessToken+'&department_name='+boundary_name+'&type='+this.undeserved.level+'&radius='+radius+'&service_metric_hole_names[]='+service_metric_value
      // );

      this.boundaries.push(boundary_layer)
      map.data.addListener('mouseover', function(e) {
        map.data.overrideStyle(e.feature, {
          strokeColor: '#2a2a2a',
          strokeWeight: 2,
          zIndex: 2
        });
      });
      map.data.addListener('mouseout', function(e) {
        map.data.revertStyle();
      });
      var infoWindow = new google.maps.InfoWindow({
        content: ""
      });
      map.data.addListener('click', function(e) {
        infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +'Name: '+
          e.feature.getProperty('name') + '<br> Type: ' +
          e.feature.getProperty('type') + '</div>');

        var anchor = new google.maps.MVCObject();
        anchor.set("position", e.latLng);
        infoWindow.open(map, anchor);
      });

    },
    loadResource(resource_name, resource_type, event) {
      var map = this.map
      if (event.isTrusted) {
        this.addFilter(event.target, 'boundaries', resource_name.toLowerCase()+resource_type)
        this.updateUrlParam()
      }
      if (event.target.checked) {
        this.areas.push(event.target.value)
        // NOTE: This uses cross-domain XHR, and may not work on older browsers.
        var resource_layer = map.data
        resource_layer.loadGeoJson(
          this.$http.options.root+'public_resources?token='+this.accessToken+'&resource_name='+resource_name+'&resource_type='+resource_type
        );
        map.data.addListener('mouseover', function(e) {
          map.data.overrideStyle(e.feature, {
            strokeColor: '#2a2a2a',
            strokeWeight: 2,
            zIndex: 2
          });
        });
        map.data.addListener('mouseout', function(e) {
          map.data.revertStyle();
        });
        var infoWindow = new google.maps.InfoWindow({
          content: ""
        });
        map.data.addListener('click', function(e) {
          infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +'Name: '+
            e.feature.getProperty('name') + '<br> Type: ' +
            e.feature.getProperty('type') + '</div>');

          var anchor = new google.maps.MVCObject();
          anchor.set("position", e.latLng);
          infoWindow.open(map, anchor);
        });

      } else {
        var boundaryUnchecked = event.target.value
        this.areas.pop(event.target.value)
        map.data.forEach(function(feature) {
          if (boundaryUnchecked == feature.f.type) {
            map.data.remove(feature);
          }
        });
      }
    },
    loadGrievance(grievance_type, event) {
      if (event.target.checked) {
        if (event.isTrusted) {
          this.addFilter(event.target, 'grievances', grievance_type)
          this.updateUrlParam()
        }
        var locations = [];
        this.selected_checkboxes.push(grievance_type)
        this.$http.get('grievances?token='+this.accessToken+'&grievance_type='+grievance_type)
            .then(response => {
              var features = response.body.features
              var infowindow = new google.maps.InfoWindow();
              var marker, i;
              for (i = 0; i < features.length; i++) {
                var custom_marker = {
                  url: 'https://s3.amazonaws.com/platform.lakeer.org/map-marker-icons/hyderabad_mmts_stops.png',
                  scaledSize: new google.maps.Size(10, 10)
                };
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]),
                  map: this.map,
                  icon: custom_marker,
                  grievance_type: grievance_type
                });
                this.markers.push(marker);
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    // infowindow.setContent("Some message")
                    infowindow.setContent("<p><b> Category : </b>" + features[i].properties.category + "</p>" +
                                      "<p><b> Sub Category :</b> " + features[i].properties.sub_category + "<p>" +
                                      "<p><b> Remark :</b> " + features[i].properties.remark + "</p>");
                    infowindow.open(this.map, marker);
                  }
                })(marker, i));
              }
              this.ajaxLoader = false
            }, error => {
              console.log("Error", error)
            })
      } else {
        this.selected_checkboxes = this.selected_checkboxes.filter(function(ele){
            return ele != grievance_type;
        });
        for(var i = 0; i < this.markers.length; i++) {
          // console.log(this.markers[i].service_metric)
          if (grievance_type == this.markers[i].grievance_type) {
            this.markers[i].setMap(null)
          }
        }
      }
    },
  }
}
</script>
<style>
.context-menu li {
  width: 100%;
  color: black;
  text-align: left;
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #eee;
}
.context-menu li:hover {
  background: #eee;
  cursor: pointer;
}

</style>
