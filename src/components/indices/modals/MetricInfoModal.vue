<template>
<BaseModal id="metricInfoModal">
  <template slot="title">Metric source details</template>
  <template slot="body">
    <div class="row">
      <div class="col-sm-12 col-xs-12">
        <table class="table borderless">
          <tbody>
            <tr>
              <td class="col-md-4"><b>Metric Name</b></td>
              <td class="col-md-8">{{metric.display_name}}</td>
            </tr>
            <tr>
              <td class="col-md-4"><b>Metric Description</b></td>
              <td class="col-md-8">{{metric.description}}</td>
            </tr>
            <tr>
              <td class="col-md-4"><b>Data Source</b></td>
              <td class="col-md-8">{{metric.data_source}}</td>
            </tr>
            <tr>
              <td class="col-md-4"><b>Data Verification</b></td>
              <td class="col-md-8">{{metric.data_verification}}</td>
            </tr>
            <tr>
              <td class="col-md-4"><b>Vintage</b></td>
              <td class="col-md-8">{{metric.vintage}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <template slot="footer">
    <button data-dismiss="modal" type="button" class="btn btn-default pull-right" style="">Close</button>
  </template>
</BaseModal>
</template>

<script>
import BaseModal from '../../base/BaseModal.vue'

export default {
  name: 'MetricInfoModal',
  components: {BaseModal},
  props: ['metric']
}
</script>
<style>
#metricInfoModal h4 {
  border-bottom: 0;
}
.borderless td, .borderless th {
    border-top: 0 !important;
}
</style>
