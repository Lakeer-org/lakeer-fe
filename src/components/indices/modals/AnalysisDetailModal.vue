<template>
  <BaseModal id="analysisDetailModal">
    <template slot="title">Analysis details</template>
    <template slot="body">
      <div class="row">
        <div class="col-sm-12 col-xs-12">
          <table class="table borderless">
            <tbody>
            <tr>
              <td class="col-md-4"><b>Analysis Name</b></td>
              <td class="col-md-8">{{analysis.name}}</td>
            </tr>
            <tr>
              <td class="col-md-4"><b>Analysis Description</b></td>
              <td class="col-md-8">{{analysis.description}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button data-dismiss="modal" type="button" class="btn btn-default pull-right">Close</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '../../base/BaseModal.vue'

  export default {
    name: 'AnalysisDetailModal',
    components: {BaseModal},
    props: ['analysis'],
  }
</script>
<style>
  #analysisDetailModal h4 {
    border-bottom: 0;
  }

  .borderless td, .borderless th {
    border-top: 0 !important;
  }
</style>
