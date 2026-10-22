<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { PortfolioImage } from '@/data/portfolio'
import { format, getDict, type Locale } from '@/i18n'

const props = defineProps<{ images: PortfolioImage[]; title: string; locale?: Locale }>()
const current = ref(0)
const slideDirection = ref<1 | -1>(1)
const dialog = ref<HTMLDialogElement | null>(null)
const dict = getDict(props.locale).gallery

function move(direction: number) {
  slideDirection.value = direction > 0 ? 1 : -1
  current.value = (current.value + direction + props.images.length) % props.images.length
}

function select(index: number) {
  if (index === current.value) return
  slideDirection.value = index > current.value ? 1 : -1
  current.value = index
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
  const target = event.target
  if (target instanceof Element && !target.closest('.portfolio-lightbox__image, .portfolio-lightbox__arrows button')) close()
}

function onKeydown(event: KeyboardEvent) {
  if (!dialog.value?.open) return
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
}

onBeforeUnmount(onClose)
</script>

<template>
  <div class="portfolio-gallery" @keydown="onKeydown">
    <div class="portfolio-gallery__stage">
      <button class="portfolio-gallery__image" type="button" :aria-label="format(dict.zoomAria, { alt: images[current].alt })" @click="open">
        <Transition :name="slideDirection > 0 ? 'portfolio-slide-next' : 'portfolio-slide-prev'">
          <img :key="current" :src="images[current].src" :alt="images[current].alt" loading="lazy" decoding="async" />
        </Transition>
        <span class="portfolio-gallery__zoom">{{ dict.zoom }}</span>
      </button>
      <div v-if="images.length > 1" class="portfolio-gallery__arrows">
        <button type="button" :aria-label="format(dict.previousProject, { title })" @click="move(-1)">←</button>
        <button type="button" :aria-label="format(dict.nextProject, { title })" @click="move(1)">→</button>
      </div>
    </div>
    <div class="portfolio-gallery__caption"><span>{{ images[current].caption ?? dict.fallbackCaption }}</span><span>{{ current + 1 }} / {{ images.length }}</span></div>
    <div v-if="images.length > 1" class="portfolio-gallery__dots" role="group" :aria-label="format(dict.groupAria, { title })">
      <button v-for="(image, index) in images" :key="index" type="button" :class="{ 'is-active': index === current }" :aria-label="format(dict.showImage, { index: index + 1, alt: image.alt })" :aria-pressed="index === current" @click="select(index)" />
    </div>

    <dialog ref="dialog" class="portfolio-lightbox" :aria-label="format(dict.groupAria, { title })" @close="onClose" @click="onBackdrop">
      <div class="portfolio-lightbox__inner">
        <img class="portfolio-lightbox__image" :src="images[current].src" :alt="images[current].alt" />
        <div v-if="images.length > 1" class="portfolio-lightbox__arrows">
          <button type="button" :aria-label="dict.previous" @click="move(-1)">←</button>
          <button type="button" :aria-label="dict.next" @click="move(1)">→</button>
        </div>
      </div>
    </dialog>
  </div>
</template>
