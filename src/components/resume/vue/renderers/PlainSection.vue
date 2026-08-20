<script setup lang="ts">
// Режим «Типографика»: секции как в бумажном резюме — заголовок,
// блоки и UiDivider между ними.
import type { ResumeSectionData } from '@/data/resume'
import UiDivider from '@/components/ui/med/UiDivider.vue'
import ResumeBlockView from '../ResumeBlockView.vue'

defineProps({
  section: {
    type: Object as () => ResumeSectionData,
    required: true,
  },
})
</script>

<template>
  <section class="plain-section">
    <h3 class="plain-section__title">{{ section.title }}</h3>
    <UiDivider width="100%" :margin-bottom="18" />
    <template v-for="(block, idx) in section.blocks" :key="idx">
      <ResumeBlockView :block="block" />
      <UiDivider
          v-if="idx < section.blocks.length - 1"
          width="60%"
          :margin-bottom="0"
      />
    </template>
  </section>
</template>
