<script setup lang="ts">
import Icon from '../shared/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: Number,
    default: 24,
  },
})
</script>

<template>
  <a :href="to" class="ui-back">
    <Icon v-if="!hideIcon" name="material-symbols:chevron-left" :size="iconSize" class="ui-back__icon" />
    <span class="ui-back__label">{{ label }}</span>
  </a>
</template>
