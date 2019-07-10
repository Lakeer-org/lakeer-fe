<template>
  <div>
    <!-- <notifications group="metric-add"/> -->
    <notifications group="metric-add" position="top right">
      <template slot="body" slot-scope="props">
        <div class="notification vue-notification">
          <a class="close" @click="props.close">
            <i class="fa fa-fw fa-close"></i>
          </a>
          <div class="notification-title">{{props.item.title}}</div>
          <div>
            <span class="fa fa-check check-color"></span>
            <span v-html="props.item.text"></span>
          </div>

        </div>
      </template>
    </notifications>
    <!-- modal for add metric -->
    <BaseModal id="metricListModal">
      <template slot="title">Add metric to map</template>
      <template slot="body">
        <MetricSelector />
      </template>
      <template slot="footer">
        <button type="button" class="pull-right btn btn-primary" data-dismiss="modal">Done</button>
        <div class="pull-right metric_selected_text" v-if="this.$store.state.index.child_metrics.length == 1">{{ this.$store.state.index.child_metrics.length }} Metric selected</div>
        <div class="pull-right metric_selected_text" v-if="this.$store.state.index.child_metrics.length > 1">{{ this.$store.state.index.child_metrics.length }} Metrics selected</div>
      </template>
    </BaseModal>
    <!-- Modal for metric information -->
  </div>
</template>

<script>
import BaseModal from '@/components/base/BaseModal'
import MetricSelector from '@/components/reusable/MetricSelector'

export default {
  name: 'MetricListModal',
  components: {
    MetricSelector,
    BaseModal
  }
}
</script>

<style>
  #metricListModal {
    position: absolute !important;
    overflow: visible;
  }
  #metricListModal .modal-header {
    background-color: #FAFBFC;
    border-bottom: 0px;
  }
  #metricListModal .modal-footer {
    background-color: #FAFBFC;
    border-top: 0px;
  }
  #metricListModal .modal-dialog {
    width: 75%;
    top: 20px;
  }

  .metric-modal-body {
    height: 600px;
    overflow-y: scroll;
    padding-bottom: 300px;
  }

  .p-10 {
    padding: 10px;
  }
</style>
