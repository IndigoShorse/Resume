<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  headingTag?: 'h2' | 'h3'
  color?: string
  background?: string
  padding?: string
}>(), {
  title: 'Section heading',
  headingTag: 'h2',
  color: '#fff',
  background: '#1a1817',
  padding: '32px 24px',
})
</script>

<template>
  <section class="re-block" :style="{ color, background, padding }">
    <component :is="headingTag" class="re-block__title">{{ title }}</component>
    <div class="re-block__content"><slot>Block content</slot></div>
  </section>
</template>
