<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { PortfolioImage } from '@/data/portfolio'

const props = defineProps<{ images: PortfolioImage[]; title: string }>()
const current = ref(0)
const dialog = ref<HTMLDialogElement | null>(null)

function move(direction: number) {
  current.value = (current.value + direction + props.images.length) % props.images.length
}

function open() {
  dialog.value?.showModal()
  document.body.style.overflow = 'hidden'
}

function close() {
  dialog.value?.close()
}

function onClose() {
  document.body.style.overflow = ''
}

function onBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

function onKeydown(event: KeyboardEvent) {
  if (!dialog.value?.open) return
  if (event.key === 'ArrowLeft') move(-1)
  if (event.key === 'ArrowRight') move(1)
}

onBeforeUnmount(onClose)
</script>

<template>
  <div class="portfolio-gallery" @keydown="onKeydown">
    <div class="portfolio-gallery__stage">
      <button class="portfolio-gallery__image" type="button" :aria-label="`Увеличить изображение: ${images[current].alt}`" @click="open">
        <img :src="images[current].src" :alt="images[current].alt" />
        <span class="portfolio-gallery__zoom">Увеличить ↗</span>
      </button>
      <div v-if="images.length > 1" class="portfolio-gallery__arrows">
        <button type="button" :aria-label="`Предыдущее изображение проекта ${title}`" @click="move(-1)">←</button>
        <button type="button" :aria-label="`Следующее изображение проекта ${title}`" @click="move(1)">→</button>
      </div>
    </div>
    <div class="portfolio-gallery__caption"><span>Иллюстрация интерфейса</span><span>{{ current + 1 }} / {{ images.length }}</span></div>
    <div v-if="images.length > 1" class="portfolio-gallery__dots" role="group" :aria-label="`Изображения проекта ${title}`">
      <button v-for="(image, index) in images" :key="index" type="button" :class="{ 'is-active': index === current }" :aria-label="`Показать изображение ${index + 1}: ${image.alt}`" :aria-pressed="index === current" @click="current = index" />
    </div>

    <dialog ref="dialog" class="portfolio-lightbox" :aria-label="`Изображения проекта ${title}`" @close="onClose" @click="onBackdrop">
      <div class="portfolio-lightbox__inner" @keydown="onKeydown">
        <button class="portfolio-lightbox__close" type="button" aria-label="Закрыть изображение" @click="close">×</button>
        <img :src="images[current].src" :alt="images[current].alt" />
        <div class="portfolio-lightbox__footer">
          <span>{{ current + 1 }} / {{ images.length }}</span>
          <div v-if="images.length > 1">
            <button type="button" aria-label="Предыдущее изображение" @click="move(-1)">←</button>
            <button type="button" aria-label="Следующее изображение" @click="move(1)">→</button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
