<script setup lang="ts">
// Главная-визитка: шапка резюме + переключатель режима отображения.
// Текстовка одна (src/data/resume.ts), обёртки — компоненты UI-библиотеки.
import { ref, watch, onMounted } from 'vue'
import { person, sections } from '@/data/resume'
import { modes, type ResumeMode } from '@/data/modes'
import ResumeSection from './ResumeSection.vue'
import UiButton from '@/components/ui/med/UiButton.vue'
import UiAlert from '@/components/ui/med/UiAlert.vue'
import UiDivider from '@/components/ui/med/UiDivider.vue'

const STORAGE_KEY = 'resume-mode'
const mode = ref<ResumeMode>('plain')

onMounted(() => {
  // ?mode=cards|stepper|plain — шарабельная ссылка на режим, приоритетнее сохранённого
  const fromUrl = new URLSearchParams(location.search).get('mode')
  const saved = fromUrl ?? localStorage.getItem(STORAGE_KEY)
  if (modes.some((m) => m.value === saved)) {
    mode.value = saved as ResumeMode
  }
})

watch(mode, (value) => localStorage.setItem(STORAGE_KEY, value))
</script>

<template>
  <div class="resume">
    <header class="resume__hero">
      <h1 class="resume__name">{{ person.name }}</h1>
      <p class="resume__tagline">{{ person.tagline }} · {{ person.location }}</p>

      <div class="resume__contacts">
        <UiButton
            v-for="contact in person.contacts"
            :key="contact.href"
            as="a"
            color="secondary"
            :to="contact.href"
            :label="contact.label"
        />
        <UiButton
            as="a"
            color="primary"
            to="/resume.pdf"
            label="Скачать PDF"
            append-icon="arrow-up-right"
        />
      </div>

      <UiAlert
          text="Страница свёрстана из компонентов моей UI-библиотеки — переключайте режим отображения и загляните в раздел «UI-библиотека», чтобы познакомиться с каждым из компонентов."
      />
    </header>

    <div class="resume__switcher" role="group" aria-label="Режим отображения">
      <span class="resume__switcher-label">Режим отображения:</span>
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
