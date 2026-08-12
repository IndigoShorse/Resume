<script setup lang="ts">
import Icon from './support/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a :href="to" class="ui-back">
    <Icon name="material-symbols:chevron-left" size="24" class="ui-back__icon" />
    <span class="ui-back__label">{{ label }}</span>
  </a>
</template>

<style scoped>
</style>
