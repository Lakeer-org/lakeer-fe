<template>
  <base-dropright-menu>
    <template slot="content">
      Click the <img src="/assets/images/eye_icon_dark.png"/> to activate this metric
    </template>
  </base-dropright-menu>
</template>

<script>
import BaseDroprightMenu from '@/components/base/BaseDroprightMenu'

export default {
  name: 'MetricDeactivatedMessage',
  components: {
    BaseDroprightMenu
  }
}
</script>
