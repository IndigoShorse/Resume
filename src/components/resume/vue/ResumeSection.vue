<script setup lang="ts">
// Диспетчер: одна текстовка (section) — сменная обёртка (mode).
// Новый режим = новый рендерер в карте renderers + пункт в config.ts.
import type { Component } from 'vue'
import { computed } from 'vue'
import type { ResumeSectionData } from '@/data/resume'
import type { ResumeMode } from '@/data/modes'
import PlainSection from './renderers/PlainSection.vue'
import CardSection from './renderers/CardSection.vue'
import CarouselSection from './renderers/CarouselSection.vue'

const renderers: Record<ResumeMode, Component> = {
  plain: PlainSection,
  cards: CardSection,
  carousel: CarouselSection,
}

const props = defineProps({
  section: {
    type: Object as () => ResumeSectionData,
    required: true,
  },
  mode: {
    type: String as () => ResumeMode,
    default: 'plain',
  },
})

const renderer = computed(() => renderers[props.mode] ?? PlainSection)
</script>

<template>
  <component :is="renderer" :section="section" />
</template>
