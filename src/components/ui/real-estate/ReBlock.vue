<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  headingTag?: 'h2' | 'h3'
  color?: string
  background?: string
  padding?: string
}>(), {
  title: 'Заголовок раздела',
  headingTag: 'h2',
  color: '#fff',
  background: '#1a1817',
  padding: '32px 24px',
})
</script>

<template>
  <section class="re-block" :style="{ color, background, padding }">
    <component :is="headingTag" class="re-block__title">{{ title }}</component>
    <div class="re-block__content"><slot>Содержимое блока</slot></div>
  </section>
</template>
