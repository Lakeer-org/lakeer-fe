<template>
  <path :d="d" :transform="transform" />
</template>

<script>
export default {
  props: ['d', 'transform']
}
</script>
