<script setup lang="ts">
// Режим «Степпер»: блоки секции листаются как шаги UiStepper;
// секция из одного блока рендерится в UiContainer--inset.
import type { ResumeSectionData } from '@/data/resume'
import type { Step } from '@/types/default'
import { computed } from 'vue'
import UiStepper from '@/components/ui/med/UiStepper.vue'
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
  <section class="stepper-section">
    <h3 class="stepper-section__title">{{ section.title }}</h3>

    <UiStepper
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
        <div class="stepper-section__slide">
          <ResumeBlockView :block="block" />
        </div>
      </template>
    </UiStepper>

    <UiContainer v-else variant="inset">
      <div class="stepper-section__slide">
        <ResumeBlockView :block="section.blocks[0]" />
      </div>
    </UiContainer>
  </section>
</template>
