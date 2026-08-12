<script setup lang="ts">
// Локальная замена <Icon> из @nuxt/icon: нужные иконки инлайнены,
// чтобы не тянуть их из iconify API в рантайме.
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '1em',
  },
})

const sizePx = computed(() =>
  typeof props.size === 'number' || /^\d+$/.test(String(props.size))
    ? `${props.size}px`
    : String(props.size)
)
</script>

<template>
  <svg
    v-if="name === 'line-md:loading-twotone-loop'"
    class="icon icon--spin"
    :style="{ width: sizePx, height: sizePx }"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
  </svg>

  <svg
    v-else-if="name === 'material-symbols:chevron-left'"
    class="icon"
    :style="{ width: sizePx, height: sizePx }"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.7 17.3 9.4 12l5.3-5.3 1.4 1.4-3.9 3.9 3.9 3.9z" />
  </svg>

  <svg
    v-else
    class="icon"
    :style="{ width: sizePx, height: sizePx }"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
.icon--spin {
  animation: icon-spin 1s linear infinite;
}
@keyframes icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
