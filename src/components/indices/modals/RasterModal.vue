<template>
<BaseModal id="rasterModal">
  <template slot="title">Show rasters</template>
  <template slot="body">
    <div class="row">
      <div class="col-sm-6 col-xs-12">
        Raster
        <vue-select
          v-model="rasterName"
          :options="rasterOptions"
          :searchable="false"
        />
      </div>
      <div class="col-sm-6 col-xs-12">
        Map
        <vue-select
          v-model="rasterColors"
          :options="rasterColorOptions"
          :getOptionLabel="option => `${option.color1} ${option.color2}`"
          >
          <template slot="selected-option" slot-scope="selectedOption">
            <span class="current-color color-picker-div" :style="{'background-color': `#${selectedOption.color1}`}"></span>
            <span class="current-color color-picker-div" :style="{'background-color': `#${selectedOption.color2}`}"></span>
          </template>
        </vue-select>
      </div>
    </div>
  </template>
  <template slot="footer">
    <button data-dismiss="modal" type="button" class="btn btn-default" style="">Cancel</button>
    <button @click="addRaster" type="button" class="btn btn-primary" style="">Confirm</button>
  </template>
</BaseModal>
</template>

<script>
import BaseModal from '../../base/BaseModal.vue'
import VueSelect from 'vue-select'
import { rasterMS } from '@/services/api'
export default {
  name: 'RasterModal',
  methods: {
    addRaster() {
      if (this.rasterName !== '' && this.rasterColors !== '') {
        this.$store.commit('addRaster', {
          name: this.rasterName,
          colors: this.rasterColors
        })
        // TODO: Add the raster
      }
      $('#rasterModal').modal('hide')
    }
  },
  components: {BaseModal, VueSelect},
  data: () => ({
    rasterName: '',
    rasterColors: '',
    rasterOptions: []
  }),
  computed: {
    rasterColorOptions () {
      return [
        {color1: '037ef0', color2: 'f85a40'},
        {color1: '000000', color2: 'ffffff'}
      ]
    }
  },

  async mounted() {
    let rasterOptions = await rasterMS.get('/rasters/')
    this.rasterOptions = rasterOptions.data.available_rasters
  }
}
</script>
