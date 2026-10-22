import type { Component } from 'vue'

import ReBlock from '@/components/ui/real-estate/ReBlock.vue'
import ReButton from '@/components/ui/real-estate/ReButton.vue'
import ReCard from '@/components/ui/real-estate/ReCard.vue'
import ReCarousel from '@/components/ui/real-estate/ReCarousel.vue'
import RePanel from '@/components/ui/real-estate/RePanel.vue'
import ReRomanIndex from '@/components/ui/real-estate/ReRomanIndex.vue'
import ReTextCard from '@/components/ui/real-estate/ReTextCard.vue'

import ReBlockRaw from '@/components/ui/real-estate/ReBlock.vue?raw'
import ReButtonRaw from '@/components/ui/real-estate/ReButton.vue?raw'
import ReCardRaw from '@/components/ui/real-estate/ReCard.vue?raw'
import ReCarouselRaw from '@/components/ui/real-estate/ReCarousel.vue?raw'
import RePanelRaw from '@/components/ui/real-estate/RePanel.vue?raw'
import ReRomanIndexRaw from '@/components/ui/real-estate/ReRomanIndex.vue?raw'
import ReTextCardRaw from '@/components/ui/real-estate/ReTextCard.vue?raw'
import type { UiComponentMeta, VueKitRegistry } from './index'
import { getDict, type Locale } from '@/i18n'

export function getRealEstateKit(locale: Locale): VueKitRegistry {
const kitDict = getDict(locale).kits.realEstate
const components: UiComponentMeta[] = [
  {
    slug: 'block', name: 'ReBlock',
    description: kitDict.components.block.description,
    props: [
      { name: 'title', type: 'string', default: kitDict.components.block.title },
      { name: 'headingTag', type: 'select', default: 'h2', options: ['h2', 'h3'] },
      { name: 'color', type: 'string', default: '#fff' },
      { name: 'background', type: 'string', default: '#1a1817' },
      { name: 'padding', type: 'string', default: '32px 24px' },
    ],
    slotText: kitDict.components.block.content,
  },
  {
    slug: 'button', name: 'ReButton',
    description: kitDict.components.button.description,
    props: [
      { name: 'label', type: 'string', default: kitDict.components.button.label },
      { name: 'color', type: 'select', default: 'primary', options: ['primary', 'secondary', 'plain'] },
      { name: 'as', type: 'select', default: 'button', options: ['button', 'a'] },
      { name: 'href', type: 'string', default: '#' },
      { name: 'fullWidth', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'pending', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'card', name: 'ReCard',
    description: kitDict.components.card.description,
    props: [
      { name: 'label', type: 'string', default: kitDict.components.card.label },
      { name: 'index', type: 'number', default: 1 },
      { name: 'width', type: 'string', default: '100%' },
      { name: 'background', type: 'string', default: '#1e1e1e' },
    ],
    slotText: kitDict.components.card.content,
  },
  {
    slug: 'text-card', name: 'ReTextCard',
    description: kitDict.components.textCard.description,
    props: [
      { name: 'label', type: 'string', default: kitDict.components.textCard.label },
      { name: 'index', type: 'number', default: 1 },
      { name: 'align', type: 'select', default: 'left', options: ['left', 'center', 'right'] },
    ],
    slotText: kitDict.components.textCard.content,
  },
  {
    slug: 'roman-index', name: 'ReRomanIndex',
    description: kitDict.components.romanIndex.description,
    props: [
      { name: 'value', type: 'number', default: 4 },
      { name: 'size', type: 'select', default: 'large', options: ['default', 'large', 'xl'] },
    ],
  },
  {
    slug: 'panel', name: 'RePanel',
    description: kitDict.components.panel.description,
    props: [
      { name: 'title', type: 'string', default: kitDict.components.panel.title },
      { name: 'index', type: 'number', default: 1 },
      { name: 'open', type: 'boolean', default: false },
    ],
    slotText: kitDict.components.panel.content,
  },
  {
    slug: 'carousel', name: 'ReCarousel',
    description: kitDict.components.carousel.description,
    props: [
      { name: 'items', type: 'json', default: kitDict.components.carousel.items },
      { name: 'perSlide', type: 'number', default: 2 },
      { name: 'color', type: 'string', default: 'transparent' },
    ],
  },
]

const componentMap: Record<string, Component> = {
  block: ReBlock,
  button: ReButton,
  card: ReCard,
  'text-card': ReTextCard,
  'roman-index': ReRomanIndex,
  panel: RePanel,
  carousel: ReCarousel,
}

const sourceMap: Record<string, string> = {
  block: ReBlockRaw,
  button: ReButtonRaw,
  card: ReCardRaw,
  'text-card': ReTextCardRaw,
  'roman-index': ReRomanIndexRaw,
  panel: RePanelRaw,
  carousel: ReCarouselRaw,
}

return {
  key: 'real-estate',
  framework: 'vue',
  title: kitDict.title,
  description: kitDict.description,
  components,
  componentMap,
  sourceMap,
}
}

export const realEstateKit = getRealEstateKit('en')
