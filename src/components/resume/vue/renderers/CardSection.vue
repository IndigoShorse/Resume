<script setup lang="ts">
// Режим «Карточки»: каждый блок секции — UiCard из библиотеки.
import type { ResumeSectionData } from '@/data/resume'
import UiCard from '@/components/ui/med/UiCard.vue'
import ResumeBlockView from '../ResumeBlockView.vue'

defineProps({
  section: {
    type: Object as () => ResumeSectionData,
    required: true,
  },
})
</script>

<template>
  <section class="card-section">
    <h3 class="card-section__title">{{ section.title }}</h3>
    <div class="card-section__grid">
      <UiCard
          v-for="(block, idx) in section.blocks"
          :key="idx"
          variant="form"
          width="100%"
          :title="block.heading ?? undefined"
      >
        <ResumeBlockView :block="block" hide-heading />
      </UiCard>
    </div>
  </section>
</template>
