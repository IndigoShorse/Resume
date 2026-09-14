<script setup lang="ts">
import TriangleAlert from '@/assets/icons/triangle-alert.svg?component'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'warning',
    validator(variant: string) {
      return [
        'warning',
        'error',
        'info',
        'success',
      ].includes(variant)
    }
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: 'auto',
  },
})
</script>

<template>
  <div
      class="ui-alert"
      :class="`ui-alert--${variant}`"
      :style="{ width }"
  >
    <TriangleAlert v-if="!hideIcon" />
    <p class="ui-alert__text"> {{ text }} </p>
  </div>
</template>
