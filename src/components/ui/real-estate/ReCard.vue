<script setup lang="ts">
import ReRomanIndex from './ReRomanIndex.vue'

withDefaults(defineProps<{
  label?: string
  index?: number | null
  width?: string
  background?: string
}>(), {
  label: 'Card title',
  index: 1,
  width: '100%',
  background: '#1e1e1e',
})
</script>

<template>
  <article class="re-card" :style="{ width, background }">
    <header class="re-card__header">
      <ReRomanIndex v-if="index !== null" :value="index" />
      <h3>{{ label }}</h3>
    </header>
    <div class="re-card__body"><slot>Card description</slot></div>
  </article>
</template>
