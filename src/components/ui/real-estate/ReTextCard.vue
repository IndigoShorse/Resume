<script setup lang="ts">
import ReRomanIndex from './ReRomanIndex.vue'

withDefaults(defineProps<{
  index?: number
  label?: string
  align?: 'left' | 'center' | 'right'
}>(), {
  index: 1,
  label: 'Scenario title',
  align: 'left',
})
</script>

<template>
  <article class="re-text-card" :class="`re-text-card--${align}`">
    <header class="re-text-card__header">
      <ReRomanIndex :value="index" size="xl" />
      <h3>{{ label }}</h3>
    </header>
    <div class="re-text-card__body"><slot>Scenario description</slot></div>
  </article>
</template>
