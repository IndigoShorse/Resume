<script setup lang="ts">
import type { Breadcrumb } from '@/types/default'
import UiIcon from './UiIcon.vue'

defineProps({
  items: {
    type: Array as () => Breadcrumb[],
    required: true,
  },
})
</script>

<template>
  <nav class="ui-breadcrumbs" aria-label="Навигация">
    <template v-for="(item, idx) in items" :key="idx">
      <a
          v-if="item.to"
          :href="item.to"
          class="ui-breadcrumbs__link"
      >
        {{ item.label }}
      </a>
      <span
          v-else
          class="ui-breadcrumbs__current"
      >
        {{ item.label }}
      </span>
      <span
          v-if="idx < items.length - 1"
          class="ui-breadcrumbs__separator"
      >
        <UiIcon
          :icon="'arrow-right'"
          :height="8"
      />
      </span>
    </template>
  </nav>
</template>
