<template>
  <div>
    <nav-bar></nav-bar>
    <div class="bg-image">
      <div class="city">
        <p class="explore-city">Explore the ease of living in your city</p>
      </div>
    </div>
    <br>
    <div class="container">
      <div class="row">
        <div>
          <!-- Nav tabs -->
          <ul class="analytics-group-title nav nav-tabs mb-15" role="tablist">
            <li role="presentation" class="active"><a href="#recommended" aria-controls="recommended" role="tab" data-toggle="tab">Recommended</a>
            </li>
            <li role="presentation"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal</a></li>
            <li role="presentation"><a href="#available_metrics" aria-controls="available_metrics" role="tab" data-toggle="tab">Available
              Metrics</a></li>
          </ul>
          <div class="col-md-12 no-padding mb-15">
            <div class="col-md-4 no-padding">
              <div class="metric-search-div">
                <span class="search-icon"><i class="fa fa-search"></i></span>
                <input id="filter" type="text" placeholder="Search" name="search" class="metric-search-box">
              </div>
            </div>
            <div class="pull-right"><a class="btn create-index-btn create-indices" href="/indices" @click="reset_index">+ Create
              analysis</a></div>
            <div class="pull-right metric_selected_text" v-if="this.$store.state.index.child_metrics.length == 1">{{
              this.$store.state.index.child_metrics.length }} Metric selected
            </div>
            <div class="pull-right metric_selected_text" v-if="this.$store.state.index.child_metrics.length > 1">{{
              this.$store.state.index.child_metrics.length }} Metrics selected
            </div>
          </div>
          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="recommended">
              <div class="available-parent-flex">
                <template v-for="(recommended, i) in recommended_indices">
                  <div class="available-child name" :data-name="recommended.name" :key="'recommended-' + i">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="/assets/images/transport.svg" width="15">
                      </div>
                      <router-link class="child-parent-2 cursor_pointer" :to="'/indices/' + recommended.id" tag="div">
                        <p class="mb2">{{ recommended.name }}</p>
                        <p class="powered-by_text mb2" v-if="recommended.description && recommended.description.length > 80">{{
                          recommended.description.substring(0,80) + '...' }}</p>
                        <p class="powered-by_text mb2" v-else>{{ recommended.description }}</p>
                      </router-link>
                      <div @click="openAnalysisDetail(recommended)">
                        <img src="/assets/images/icon-info.svg" width="20" alt="info" class="pull-right pointer">
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="personal">
              <div class="available-parent-flex">
                <template v-for="(personal_index, i) in personal_indices">
                  <div class="available-child name" :data-name="personal_index.name" :key="'personal-' + i">

                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="/assets/images/time-left.png" alt="time" width="15">
                      </div>
                      <router-link class="child-parent-2 cursor_pointer" :to="'/indices/' + personal_index.id" tag="div">
                        <p class="mb2">{{ personal_index.name }}</p>
                        <p class="location-text mb2" v-if="personal_index.description && personal_index.description.length > 80">{{
                          personal_index.description.substring(0,80) + '...' }}</p>
                        <p class="location-text mb2" v-else> {{ personal_index.description }}</p>
                      </router-link>
                      <div class="flex-column justify-content-between align-items-end">
                        <img src="/assets/images/icon-info.svg" width="20" alt="info" @click="openAnalysisDetail(personal_index)" class="pull-right pointer">
                        <div class="dropdown">
                          <span :id="`dd-${i}`" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="settings-icon pull-right" src="/assets/images/settings-dark.svg"/>
                          </span>
                          <div class="dropdown-menu  pull-right" :aria-labelledby="`dd-${i}`">
                            <a class="dropdown-item" @click="updateSelectedIndex(personal_index)">Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="available_metrics">
              <MetricSelector
                :show_search_bar="false"
                :show_notifications="false"
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteIndexModal :index="selected_index"/>
      <AnalysisDetailModal :analysis="selectedAnalysis"/>
    </div>
  </div>
</template>

<script>
import NavBar from '../layouts/NavBar.vue'
import {api} from '../../services/api.js'
import MetricSelector from '@/components/reusable/MetricSelector'
import DeleteIndexModal from '../indices/modals/DeleteIndexModal.vue'
import AnalysisDetailModal from '../indices/modals/AnalysisDetailModal.vue'

export default {
  data() {
    return {
      personal_indices: [],
      recommended_indices: [],
      service_categories_list: [],
      selected_index: '',
      selectedAnalysis: {},
      ajaxLoader: false,
      metric_selected_count: this.$store.state.index.child_metrics.length
    }
  },
  components: {
    'nav-bar': NavBar,
    DeleteIndexModal,
    AnalysisDetailModal,
    MetricSelector
  },
  methods: {
    reset_index() {
      // this.$store.commit('resetIndex', this.$store.state.auth.user_id)
    },
    updateSelectedIndex(index) {
      this.selected_index = index;
      $('#deleteIndexModal').modal('show')
    },
    openAnalysisDetail(analysis) {
      this.selectedAnalysis = analysis;
      $('#analysisDetailModal').modal('show')
    }
  },
  async mounted() {
    this.ajaxLoader = true;
    this.$store.commit('resetIndex', this.$store.state.auth.user_id);
    api.get('indices')
      .then(response => {
        this.personal_indices = response.data
      }, error => {
        console.log(error)
      });
    await api.get('indices/recommended')
      .then(response => {
        this.recommended_indices = response.data
      }, error => {
        console.log(error)
      })
    this.ajaxLoader = false
  }
}
</script>

<style lang="scss">
  .analytics-group-title > li.active > a, .analytics-group-title > li.active > a:hover {
    color: #172B4D;
    box-shadow: inset 0 -2px 0 0 #005588;
    border: 0;
  }

  .analytics-group-title > li > a {
    color: #172B4D;
  }

  .analytics-group-title > li > a:hover {
    box-shadow: inset 0 -2px 0 0 #005588;
    border: 0;
    cursor: pointer;
    background-color: white;
  }

  .metric-dropdown-icon {
    padding: 6px 1px;
  }

  .dropdown-item {
    width: 100%;
    float: left;
    padding: 10px 5px;
  }

  .available-metrics {
    h5 {
      width: 100%
    }

    .available-metric {
      cursor: pointer;
    }
  }

  .width-100 {
    width: 100%;
  }

  .vertical-tabs {
    float: left;
    border-bottom: 0;
    width: 33.3%;
    border: 1px solid rgba(193, 199, 208, 0.44);
    min-height: 450px;

    li {
      float: none;
      margin: 0;

      a {
        color: #172B4D;
        margin-right: 0;
        border: 0;
        border-radius: 0;
        text-align: left;
        height: 50px;
        padding: 15px 15px;

        &:hover {
          background-color: rgba(223, 225, 230, 0.3);
        }

        &:focus {
          background-color: rgba(223, 225, 230, 0.3);
        }
      }
    }
  }

  .vertical-tabs.list-group {
    min-height: 424px;
    height: 424px;
    overflow: scroll;

    li {
      color: #333;
      height: 90px;
      text-align: left;

      a, a:hover, a:focus {
        border: 0;
        background-color: rgba(223, 225, 230, 0.3);
      }

      span {
        color: #172B4D;
        opacity: 0.6;
        font-size: 12px;
      }
    }
  }

  .service_category li.active, .services_list li.active {
    a, a:hover, a:focus {
      border: 0;
      background-color: rgba(223, 225, 230, 0.3);
    }
  }

  .metric_selected_text {
    color: #172B4D;
    opacity: 0.6;
    font-size: 12px;
    padding: 5px;
    margin-right: 5px;
  }

  .list-metrics-section {
    border: 1px solid #ccc;
    float: left;
    width: 33.3%;
    font-size: 10px;
    padding: 5px;

    .heading {
      opacity: 0.4;
      color: #172B4D;
      float: left;
    }

    .open_all_metrics {
      color: #2684FF;
      float: right;
    }

  }

  .list-group-item {
    border: 0;
    border-bottom: 1px solid rgba(193, 199, 208, 0.44);
    border-radius: 0 !important;

    &:hover {
      background-color: rgba(223, 225, 230, 0.3);
    }

    p {
      padding: 0px;
    }
  }

  .list-group-item.selected {
    background-color: rgba(223, 225, 230, 0.3);
  }

  .nav-tabs > li {
    margin-bottom: -3px;
  }

  #filter {
    border: 0;
    box-shadow: none;
  }

  #filter:active, #filter:focus {
    outline: 0px !important;
    -webkit-appearance: none;
  }

</style>
