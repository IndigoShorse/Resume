<script setup lang="ts">
// Универсальное «тело» информационного блока: одна и та же текстовка
// рендерится внутри любой обёртки (типографика / UiCard / UiStepper).
import type { ResumeBlock } from '@/data/resume'
import UiButton from '@/components/ui/med/UiButton.vue'

defineProps({
  block: {
    type: Object as () => ResumeBlock,
    required: true,
  },
  // Обёртка (например, UiCard) уже показала заголовок сама
  hideHeading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="resume-block">
    <header
        v-if="!hideHeading && (block.heading || block.meta)"
        class="resume-block__header"
    >
      <h4 v-if="block.heading" class="resume-block__heading">{{ block.heading }}</h4>
      <span v-if="block.meta" class="resume-block__meta">{{ block.meta }}</span>
    </header>
    <span
        v-else-if="hideHeading && block.meta"
        class="resume-block__meta"
    >{{ block.meta }}</span>

    <p v-if="block.subheading" class="resume-block__subheading">{{ block.subheading }}</p>

    <p v-if="block.text" class="resume-block__text">{{ block.text }}</p>

    <ul v-if="block.items?.length" class="resume-block__items">
      <li v-for="(item, idx) in block.items" :key="idx">{{ item }}</li>
    </ul>

    <div v-if="block.tags?.length" class="resume-block__tags">
      <span v-for="tag in block.tags" :key="tag" class="resume-block__tag">{{ tag }}</span>
    </div>

    <div v-if="block.level" class="resume-block__level" :aria-label="`Уровень ${block.level} из 5`">
      <span
          v-for="dot in 5"
          :key="dot"
          class="resume-block__dot"
          :class="{ 'resume-block__dot--active': dot <= (block.level ?? 0) }"
      />
    </div>

    <div v-if="block.links?.length" class="resume-block__links">
      <UiButton
          v-for="link in block.links"
          :key="link.href"
          as="a"
          color="plain"
          :to="link.href"
          :label="link.label"
      />
    </div>
  </div>
</template>
