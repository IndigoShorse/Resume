<script setup lang="ts">
import { computed, ref } from 'vue'
import { VCarousel, VCarouselItem, VSheet } from 'vuetify/components'

const props = withDefaults(defineProps<{
  items?: string[]
  perSlide?: number
  color?: string
}>(), {
  items: () => ['Продажа', 'Аренда', 'Флиппинг', 'Срочный выкуп'],
  perSlide: 2,
  color: 'transparent',
})

const currentIndex = ref(0)
const pages = computed(() => {
  const result: string[][] = []
  for (let index = 0; index < props.items.length; index += props.perSlide) {
    result.push(props.items.slice(index, index + props.perSlide))
  }
  return result
})
</script>

<template>
  <VCarousel v-model="currentIndex" class="re-carousel" :show-arrows="false" hide-delimiter-background>
    <VCarouselItem v-for="(page, pageIndex) in pages" :key="pageIndex">
      <VSheet class="re-carousel__slide" :color="color" height="100%">
        <article v-for="item in page" :key="item" class="re-carousel__item">{{ item }}</article>
      </VSheet>
    </VCarouselItem>
  </VCarousel>
</template>
