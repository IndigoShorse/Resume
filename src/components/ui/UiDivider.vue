<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '450px',
  },
  marginBottom: {
    type: Number,
    default: 12,
  }
})
</script>

<template>
  <div
      class="ui-divider"
      :style="`width: ${width}; margin-bottom: ${marginBottom}px;`"
  />
</template>

<style scoped>

</style>
