<template>
  <div class="department-boundary">
    <div>
      <p class="department-header">Department boundary</p>
    </div>
    <div class="row boundaries"></div>
    <v-multiselect
      :multiple="true"
      :searchable="false"
      :value="selectedBoundaries"
      :options="boundaries"
      :close-on-select="false"
      :clear-on-select="true"
      :hide-selected="true"
      track-by="label"
      label="label"
      selectLabel=""
      @input="updateBoundaries"
      >
    </v-multiselect>
      <!-- <ul
        v-for="boundary in boundaries"
        :key="boundary.name"
        :id="`${boundary.name}-boundary`"
        class="boundary col-xs-12 col-sm-6"
      >
        {{' '+ boundary.name}}
        <li
          class="zone-selector"
          v-for="level in boundary.levels"
          :key="level"
        >
            <input type="radio" name="department boundary" :value="`${boundary.name}->${level}`" v-model="selected_boundary">
            <label for="" class="department-list-filter"> {{' ' + level}}</label>
        </li>
      </ul> -->
  </div>
</template>
<script>
import vMultiselect from 'vue-multiselect'
export default {
  name: 'BoundarySelector',
  data: () => ({
    boundaries: [
      {name: 'GHMC', level: 'Zone'},
      {name: 'GHMC', level: 'Circle'},
      {name: 'GHMC', level: 'Ward'},
      {name: 'HMWSSB', level: 'Circle'},
      {name: 'HMWSSB', level: 'Division'},
      {name: 'HMWSSB', level: 'Sub-Division'},
      {name: 'HMWSSB', level: 'Boundary'}
    ]
    // boundaries: [
    //   {
    //     name: 'GHMC',
    //     levels: [
    //       'Zone',
    //       'Circle',
    //       'Ward'
    //     ]
    //   },
    //   {
    //     name: 'HMWSSB',
    //     levels: [
    //       'Circle',
    //       'Division',
    //       'Sub-Division',
    //       'Boundary'
    //     ]
    //   }
    // ]
  }),
  components: {
    vMultiselect
  },
  methods: {
    updateBoundaries(boundaries) {
      this.$store.commit('selectBoundaries', boundaries)
    }
  },
  computed: {
    selectedBoundaries() {
      let boundaries = this.$store.state.index.boundaries
      return boundaries.map((boundary) => {
        boundary['label'] = `${boundary.name}-${boundary.level}`
        return boundary
      })
    }
  },
  mounted() {
    this.boundaries = this.boundaries.map((boundary) => {
      boundary['label'] = `${boundary.name}-${boundary.level}`
      return boundary
    })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.department-boundary {
  /*height: 100px;*/
}

.boundaries, .boundaries > ul > li {
  color: #172B4D;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8 !important;
  display: block;
  padding: 0px 0px;
  text-align: left;
  cursor: pointer;
}
.department-list-filter {
  margin-left: 5px;
}
.department-header {
  opacity: 0.5;
  color: #172B4D;
  font-size: 12px;
  padding: 5px 10px 10px 0px;
  margin-bottom: 0px;
}
.v-select li {
  width: 100%;
  text-align: left;
}

.multiselect li {
  color: #172B4D;
  text-align: left;
  font-size: 14px;
}

</style>
