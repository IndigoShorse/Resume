<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'minus',
  },
  height: {
    type: [String, Number],
    default: '1em',
  },
  width: {
    type: [String, Number],
    default: '1em',
  },
})

// Динамический импорт SVG как Vue-компонентов (vite-svg-loader)
const icons = import.meta.glob('/src/assets/icons/*.svg', { query: '?component' })

const DynamicIcon = computed(() => {
  const loader = icons[`/src/assets/icons/${props.icon}.svg`]
  return loader ? defineAsyncComponent(loader as () => Promise<any>) : null
})
</script>

<template>
  <component
      :is="DynamicIcon"
      v-if="DynamicIcon"
      class="ui-icon"
      :style="{
        height: typeof height === 'string' ? height : `${height}px`,
        width: typeof width === 'string' ? width : `${width}px`,
      }"
  />
</template>
