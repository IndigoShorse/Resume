<script setup lang="ts">
// Режим «Карусель»: блоки секции листаются как шаги UiCarousel;
// секция из одного блока рендерится в UiContainer--inset.
import type { ResumeSectionData } from '@/data/resume'
import type { Step } from '@/types/default'
import { computed } from 'vue'
import UiCarousel from '@/components/ui/med/UiCarousel.vue'
import UiContainer from '@/components/ui/med/UiContainer.vue'
import ResumeBlockView from '../ResumeBlockView.vue'

const props = defineProps({
  section: {
    type: Object as () => ResumeSectionData,
    required: true,
  },
})

const steps = computed<Step[]>(() =>
  props.section.blocks.map((block, idx) => ({
    label: block.label ?? block.heading ?? `Шаг ${idx + 1}`,
  })),
)

const heights: Record<string, number> = {
  experience: 400,
  projects: 240,
  languages: 160,
}

const contentHeight = computed(() => heights[props.section.id] ?? 300)
</script>

<template>
  <section class="carousel-section">
    <h3 class="carousel-section__title">{{ section.title }}</h3>

    <UiCarousel
        v-if="section.blocks.length > 1"
        :steps="steps"
        header-clickable
        :content-height="contentHeight"
    >
      <template
          v-for="(block, idx) in section.blocks"
          :key="idx"
          #[`step-${idx}`]
      >
        <div class="carousel-section__slide">
          <ResumeBlockView :block="block" />
        </div>
      </template>
    </UiCarousel>

    <UiContainer v-else variant="inset">
      <div class="carousel-section__slide">
        <ResumeBlockView :block="section.blocks[0]" />
      </div>
    </UiContainer>
  </section>
</template>
