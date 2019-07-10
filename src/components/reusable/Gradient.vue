<template>
  <div style="display: inline-block; width: 100%">
    <template v-for="(color, i) in colorArray">
      <span class="grad-step" :style="{backgroundColor: color}" :key="i"></span>
    </template>
  </div>
</template>

<script>
import chroma from 'chroma-js'
export default {
  data: () => ({
    steps: 7
  }),
  props: {
    color1: String,
    color2: String
  },
  computed: {
    colorArray() {
      function zeroize(number) {
        if (isNaN(number)) {
          return 0
        } else return number
      }
      let color1HSL = chroma(`#${this.color1}`).hsl()
      let color2HSL = chroma(`#${this.color2}`).hsl()
      let h_diff = (zeroize(color2HSL[0]) - zeroize(color1HSL[0])) / (this.steps - 1)
      let s_diff = (color2HSL[1] - color1HSL[1]) / (this.steps - 1)
      let l_diff = (color2HSL[2] - color1HSL[2]) / (this.steps - 1)
      let scale = [`#${this.color1}`]
      for (let i = 0; i < this.steps - 1; i++) {
        color1HSL[0] += h_diff
        color1HSL[1] += s_diff
        color1HSL[2] += l_diff
        scale.push(chroma.hsl(color1HSL).hex())
      }
      return scale
    }
  }
}
</script>

<style>
.grad-step {
  display: inline-block;
  height: 20px;
  width: 14.28%
}
</style>
