<script setup lang="ts">
import { VExpansionPanel, VExpansionPanelText, VExpansionPanelTitle, VExpansionPanels } from 'vuetify/components'
import ReRomanIndex from './ReRomanIndex.vue'

withDefaults(defineProps<{
  index?: number
  title?: string
  open?: boolean
}>(), {
  index: 1,
  title: 'Frequently asked question',
  open: false,
})
</script>

<template>
  <VExpansionPanels class="re-panel-group" :model-value="open ? 0 : undefined">
    <VExpansionPanel class="re-panel" elevation="0">
      <VExpansionPanelTitle class="re-panel__title" hide-actions>
        <ReRomanIndex :value="index" />
        <span>{{ title }}</span>
        <span class="re-panel__action" aria-hidden="true" />
      </VExpansionPanelTitle>
      <VExpansionPanelText class="re-panel__content"><slot>Answer to the frequently asked question.</slot></VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
