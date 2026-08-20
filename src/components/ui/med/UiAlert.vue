<script setup lang="ts">
import TriangleAlert from '@/assets/icons/triangle-alert.svg?component'

const props = defineProps({
  text: {
    type: String,
    default: 'text',
  }
})
</script>

<template>
  <div class="ui-alert">
    <TriangleAlert />
    <p class="ui-alert__text"> {{ text }} </p>
  </div>
</template>

<style scoped>

</style>
