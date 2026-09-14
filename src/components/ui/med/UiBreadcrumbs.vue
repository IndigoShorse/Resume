<script setup lang="ts">
import type { Breadcrumb } from '@/types/default'
import UiIcon from './UiIcon.vue'

defineProps({
  items: {
    type: Array as () => Breadcrumb[],
    required: true,
  },
  separator: {
    type: String,
    default: 'arrow-right',
  },
  separatorSize: {
    type: Number,
    default: 8,
  },
  boldCurrent: {
    type: Boolean,
    default: true,
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
          :class="{ 'ui-breadcrumbs__current--plain': !boldCurrent }"
      >
        {{ item.label }}
      </span>
      <span
          v-if="idx < items.length - 1"
          class="ui-breadcrumbs__separator"
          :style="{ height: `${separatorSize}px` }"
      >
        <UiIcon
          :icon="separator"
          :height="separatorSize"
      />
      </span>
    </template>
  </nav>
</template>
