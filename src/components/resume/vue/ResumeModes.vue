<script setup lang="ts">
// Интерактивная часть визитки: переключатель стиля отображения + секции.
// Текстовка одна (src/data/resume.ts), стили-обёртки — компоненты UI-библиотеки.
import { ref, watch, onMounted } from 'vue'
import { sections } from '@/data/resume'
import { modes, type ResumeMode } from '@/data/modes'
import ResumeSection from './ResumeSection.vue'
import UiButton from '@/components/ui/med/UiButton.vue'
import UiDivider from '@/components/ui/med/UiDivider.vue'

const STORAGE_KEY = 'resume-mode'
const mode = ref<ResumeMode>('plain')

onMounted(() => {
  // ?mode=cards|stepper|plain — шарабельная ссылка на стиль, приоритетнее сохранённого
  const fromUrl = new URLSearchParams(location.search).get('mode')
  const saved = fromUrl ?? localStorage.getItem(STORAGE_KEY)
  if (modes.some((m) => m.value === saved)) {
    mode.value = saved as ResumeMode
  }
})

watch(mode, (value) => localStorage.setItem(STORAGE_KEY, value))
</script>

<template>
  <div class="resume__modes">
    <div class="resume__switcher" role="group" aria-label="Стиль отображения">
      <span class="resume__switcher-label">Стиль отображения:</span>
      <UiButton
          v-for="m in modes"
          :key="m.value"
          :label="m.label"
          :color="mode === m.value ? 'primary' : 'secondary'"
          @click="mode = m.value"
      />
    </div>

    <UiDivider width="100%" :margin-bottom="0" />

    <div class="resume__sections">
      <ResumeSection
          v-for="section in sections"
          :key="section.id"
          :section="section"
          :mode="mode"
      />
    </div>
  </div>
</template>
