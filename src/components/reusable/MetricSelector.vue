<template>
  <div>
    <div class="available-parent-flex">

      <template v-if="show_search_bar">
        <div class="col-md-12 p-10">
            <div class="metric-search-div">
              <span class="search-icon"><i class="fa fa-search"></i></span>
              <input id="filter" type="text" placeholder="Search" name="search" class="metric-search-box">
            </div>
        </div>
      </template>

      <div class="width-100">
        <!-- Nav tabs -->
        <ul class="service_category vertical-tabs nav nav-tabs" role="tablist">
          <template v-for="(category, i) in service_categories_list">
            <li
              :key="`nav-tab-${i}`"
              role="presentation"
              :class="i == 0 ? 'active name' : 'name'"
              :data-name="category.services.map((service) => service.service_metrics.map((metric) => metric.display_name))"
              >
              <a :href="'#'+category.service_category.toLowerCase().replace(/ /g,'_')" aria-controls="home" role="tab" data-toggle="tab">
                {{ category.service_category}}
              </a>
            </li>
          </template>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <template v-for="(category, i) in service_categories_list">
            <div
              :key="`content-pane-${i}`"
              role="tabpanel"
              :class="i == 0 ? 'tab-pane active' : 'tab-pane'"
              :id="category.service_category.toLowerCase().replace(/ /g,'_')"
              >
              <ul class="services_list vertical-tabs nav nav-tabs" role="tablist">
                <template v-for="(service, j) in category.services">
                  <li
                    :key="`service-nav-${i}-${j}`"
                    role="presentation" :class="j == 0 ? 'active name' : 'name'"
                    :data-name="service.service_metrics.map((metric) => metric.display_name)">
                    <a :href="'#'+service.service_type.toLowerCase().replace(/ /g,'_')" aria-controls="home" role="tab" data-toggle="tab">
                      {{ service.service_type}}
                    </a>
                  </li>
                </template>
              </ul>
              <div class="tab-content">
                <template v-for="(service, j) in category.services">
                  <div
                    :key="`service-content-${i}-${j}`"
                    role="tabpanel" :class="j == 0 ? 'service-metric-list tab-pane active' : 'service-metric-list tab-pane'"
                    :id="service.service_type.toLowerCase().replace(/ /g,'_')">
                    <div class="list-metrics-section">
                      <div class="heading">
                        Metrics
                      </div>
                      <div class="open_all_metrics" :data-id="service.service_type.toLowerCase().replace(/ /g,'_')">
                        Select All
                      </div>
                    </div>
                    <ul class="vertical-tabs list-group">
                      <template v-for="(metric, k) in service.service_metrics">
                        <li :key="`service-tab-${k}`"
                          class="list-group-item name" :data-name="metric.display_name">
                          <div class="col-md-12 no-padding">
                            <div class="col-md-1 no-padding">
                              <input v-if="selected_metric_ids.includes(metric.id)" checked type="checkbox" name="choose_metric" value="metric" @click="addSavedMetric(metric, $event)">
                              <input v-else type="checkbox" name="choose_metric" value="metric" @click="addSavedMetric(metric, $event)">
                            </div>
                            <div class="col-md-1 no-padding" @click="newIndexWithMetric(metric)">
                              <img src="/assets/images/transport.svg" width="15">
                            </div>
                            <div class="col-md-9 no-padding" @click="newIndexWithMetric(metric)">
                              <p>
                                <b>{{ metric.display_name }}</b>
                              </p>
                              <span>{{ metric.description }}</span>
                            </div>
                            <div class="col-md-1 no-padding">
                              <img src="/assets/images/icon-info.svg" width="20" class="pull-right pointer" @click="showMetricInformation(metric)">
                            </div>
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <MetricInfoModal :metric="selected_metric"/>
  </div>
</template>

<script>
import { api } from '@/services/api.js'
import MetricInfoModal from '@/components/indices/modals/MetricInfoModal'


export default {
  name: 'MetricSelector',
  components: {
    MetricInfoModal
  },
  data() {
    return {
      selected_metric: '',
      service_categories_list: [],
      selected_metric_ids: this.$store.state.index.child_metrics.map((metric) => metric.service_metric_id)
    }
  },
  props: {
    show_search_bar: {
      type: Boolean,
      default: true
    },
    show_notifications: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addSavedMetric(metric, event) {
      var element = event.target.parentNode.parentNode.parentNode
      this.$store.commit('setNewMetricValues', {
        name: metric.display_name,
        service_metric_id: metric.id,
        geometry_type: metric.geometry_type,
        type: metric.metric_type // The type of the index_metric comes from
      })
      if (event.target.checked) {
        this.$store.dispatch('addSavedMetric')
        $(element).addClass('selected')
        if (this.$props.show_notifications) {
          this.$notify({
            group: 'metric-add',
            title: 'Important message',
            text: 'Metric added successfully.',
            duration: 10000,
            position: 'top'
          })
        }
      }
      else {
        this.$store.dispatch('removeSavedMetric')
        $(element).removeClass('selected')
        if (this.$props.show_notifications) {
          this.$notify({
            group: 'metric-add',
            title: 'Important message',
            text: 'Metric removed successfully.',
            duration: 10000,
            position: 'top'
          })
        }
      }
      // $('#metricListModal').modal('hide')
    },
    showMetricInformation(metric) {
      this.selected_metric = metric
      $('#metricInfoModal').modal('show')
    }
  },
  async mounted() {
    let service_categories = await api.get('/service_metrics/list')
    let heatmaps = await api.get('/heatmaps')
    console.log('Heatmaps =>', heatmaps)
    let heatmap_category = {
      service_category: 'Heatmaps',
      services: [
        {
          service_metrics: heatmaps.data,
          service_type: 'Population and Expenditure'
        }
      ]
    }
    let all_services = service_categories.data
    all_services.push(heatmap_category)
    this.service_categories_list = all_services
  }
}
</script>
